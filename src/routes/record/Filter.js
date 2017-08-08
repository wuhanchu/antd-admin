import React from 'react'
import PropTypes from 'prop-types'
import moment from 'moment'
import { FilterItem } from '../../components'
import { Form, Button, Row, Col, DatePicker, TreeSelect } from 'antd'

const { RangePicker } = DatePicker
const TreeNode = TreeSelect.TreeNode


const ColProps = {
  span: 10,
  style: {
    marginBottom: 16,
  },
}

const TwoColProps = {
  ...ColProps,
  xl: 96,
}

const monthFormat = 'YYYY/MM';
const dayFormat = 'YYYY/MM/DD';


const Filter = ({
  onAdd,
  onFilterChange,
  devices,
  filter,
  form: {
    getFieldDecorator,
    getFieldsValue,
  },
}) => {
  const handleFields = (fields) => {
    const { business_date } = fields
    if (business_date.length) {
      fields.business_date_begin = business_date[0].format('YYYY-MM')
      fields.business_date_end = business_date[1].format('YYYY-MM')
    }
    delete fields.business_date
    return fields
  }

  const handleSubmit = () => {
    let fields = getFieldsValue()
    fields = handleFields(fields)
    onFilterChange(fields)
  }


  // set the value
  const { code } = filter
  let business_date = []
  if (filter.business_date && filter.business_date[0]) {
    business_date[0] = moment(filter.business_date[0])
  }
  if (filter.business_date && filter.business_date[1]) {
    business_date[1] = moment(filter.business_date[1])
  }

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
      <Col {...ColProps} span={8}>
        <FilterItem label="业务日期">
          {getFieldDecorator('business_date', { initialValue: business_date })(
            <RangePicker style={{ width: '100%' }} size="large" format={dayFormat} />
          )}
        </FilterItem>
      </Col>
      <Col {...TwoColProps} span={10}>
        <div style={{ display: 'flex', justifyContent: 'space-between' }}>
          <div >
            <Button type="primary" size="large" className="margin-right" onClick={handleSubmit}>搜索</Button>
          </div>
          <div>
            <Button size="large" type="ghost" onClick={onAdd}>新增</Button>
          </div>
        </div>
      </Col>
    </Row>
  )
}

Filter.propTypes = {
  onAdd: PropTypes.func,
  form: PropTypes.object,
  filter: PropTypes.object,
  onFilterChange: PropTypes.func,
  devices: PropTypes.array,

}

export default Form.create()(Filter)
