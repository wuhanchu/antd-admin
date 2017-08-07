import React from 'react'
import PropTypes from 'prop-types'
import { Table, Modal } from 'antd'
import { DropOption } from '../../components'

const confirm = Modal.confirm

const List = ({ onDeleteItem, onEditItem, isMotion, location, ...tableProps }) => {
  const handleMenuClick = (record, e) => {
    if (e.key === '1') {
      onEditItem(record)
    } else if (e.key === '2') {
      confirm({
        title: '确定要删除这个设备类型?',
        onOk () {
          onDeleteItem(record.id)
        },
      })
    }
  }

  const columns = [
    {
      title: '会计产品编码',
      dataIndex: 'code',
      key: 'code',
    },
    {
      title: '会计产品名称',
      dataIndex: 'accountant_name',
      key: 'accountant_name',
    }, {
      title: '发票产品名称',
      dataIndex: 'bill_name',
      key: 'bill_name',
    }, {
      title: '规格型号',
      dataIndex: 'description',
      key: 'description',
    }, {
      title: '单位',
      dataIndex: 'unit',
      key: 'unit',
    }, {
      title: '操作',
      key: 'operation',
      width: 100,
      render: (text, record) => {
        return <DropOption onMenuClick={e => handleMenuClick(record, e)} menuOptions={[{ key: '1', name: '编辑' }, { key: '2', name: '删除' }]} />
      },
    },
  ]


  return (
    <div>
      <Table
        {...tableProps}
        bordered
        columns={columns}
        simple
      />
    </div>
  )
}

List.propTypes = {
  onDeleteItem: PropTypes.func,
  onEditItem: PropTypes.func,
  isMotion: PropTypes.bool,
  location: PropTypes.object,
}

export default List
