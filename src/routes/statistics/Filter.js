import React from 'react'
import PropTypes from 'prop-types'
import moment from 'moment'
import { Form, Button, Row, Col, DatePicker, Input, TreeSelect } from 'antd'

const { MonthPicker } = DatePicker
const TreeNode = TreeSelect.TreeNode

const ColProps = {
  span: 10,
  style: {
    marginBottom: 16,
  },
}
const dateFormat = 'YYYY/MM/DD'

const monthFormat = 'YYYY/MM'

const TwoColProps = {
  ...ColProps,
  xl: 96,
}

const Filter = ({
  devices,
  onFilterChange,
  filter,
  form: {
    getFieldDecorator,
    getFieldsValue,
    setFieldsValue,
  },
}) => {
  const handleFields = (fields) => {
    if (fields.business_date_begin) {
      fields.business_date_begin = fields.business_date_begin.set('date', 1).format(dateFormat)
    }
    if (fields.business_date_end) {
      fields.business_date_end = fields.business_date_end.endOf('month').format(dateFormat)
    }

    return fields
  }

  const handleSubmit = () => {
    let fields = getFieldsValue()
    fields = handleFields(fields)
    onFilterChange(fields)
  }


  // set the value
  const { code, business_date_begin, business_date_end } = filter

  // 转换成map
  let devicesMap = {}
  devices.forEach((device) => {
    if (device.code) {
      delete device.id
      devicesMap[device.code] = device
    }
  })

  // 组装成节点树
  const createTree = (node) => {
    let result = []

    devices.forEach((device) => {
      if (devicesMap[device.code].handle === true) {
        return
      }

      if (device.code && String(device.code).indexOf(String(node.code)) === 0 && device.code !== node.code) {
        devicesMap[device.code].handle = true
        result.push(createTree(device))
      }
    })

    devicesMap[node.code].handle = true
    return (<TreeNode value={node.code} title={`${node.accountant_name}(${node.code})`}
      key={`${node.accountant_name}(${node.code})`}
    >{result}</TreeNode>)
  }

  const treeNodes = []
  devices.forEach((device) => {
    if (devicesMap[device.code].handle !== true) {
      treeNodes.push(createTree(device))
    }
  })
  devices.forEach((device) => {
    devicesMap[device.code].handle = false
  })

  return (
    <Row gutter={24}>
      <Col {...ColProps} span={6}>
        {getFieldDecorator('code', {
          initialValue: code,
        })(<TreeSelect
          style={{ width: 200 }}
          showSearch
          dropdownStyle={{ maxHeight: 400, overflow: 'auto' }}
          placeholder="科目代码"
          allowClear
          treeDefaultExpandAll
        >{treeNodes}</TreeSelect>
        )
        }
      </Col>
      <Col {...ColProps} span={4}>
        {getFieldDecorator('business_date_begin', business_date_begin ? { initialValue: moment(business_date_begin, monthFormat) } : null)(
          <MonthPicker
            placeholder="开始月份"
            style={{ width: '100%' }} size="large"
          />
        )}
      </Col>
      <Col {...ColProps} span={4}>
        {getFieldDecorator('business_date_end', business_date_end ? { initialValue: moment(business_date_end, monthFormat) } : null)(
          <MonthPicker
            placeholder="结速月份"
            style={{ width: '100%' }} size="large"
          />
        )}
      </Col>
      <Col {...TwoColProps} span={10}>
        <div style={{ display: 'flex', justifyContent: 'space-between' }}>
          <div >
            <Button type="primary" size="large" className="margin-right" onClick={handleSubmit}>搜索</Button>
          </div>
          <div>
          </div>
        </div>
      </Col>
    </Row>
  )
}

Filter.propTypes = {
  onAdd: PropTypes.func,
  isMotion: PropTypes.bool,
  switchIsMotion: PropTypes.func,
  form: PropTypes.object,
  filter: PropTypes.object,
  onFilterChange: PropTypes.func,
  devices: PropTypes.array,
}

export default Form.create()(Filter)
