import React from 'react'
import { Table } from 'antd'


const List = ({ ...tableProps }) => {

  const columns = [
    {
      title: '会计产品编码',
      dataIndex: 'code',
      key: 'code',
    }, {
      title: '会计产品名称',
      dataIndex: 'accountant_name',
      key: 'accountant_name',
    }, {
      title: '月份',
      dataIndex: 'month',
      key: 'month',
    }, {
      title: '月初金额',
      children: [{
        title: '数量',
        dataIndex: 'last_balance_amount',
        key: 'last_balance_amount',
      }, {
        title: '单价',
        dataIndex: 'last_balance_unit_fee',
        key: 'last_balance_unit_fee',
      }, {
        title: '金额',
        dataIndex: 'last_balance_fee',
        key: 'last_balance_fee',
      }],
    }, {
      title: '本月购进',
      children: [{
        title: '数量',
        dataIndex: 'in_amount',
        key: 'in_amount',
      }, {
        title: '单价',
        dataIndex: 'in_unit_fee',
        key: 'in_unit_fee',
      }, {
        title: '金额',
        dataIndex: 'in_fee',
        key: 'in_fee',
      }],
    }, {
      title: '本月销售',
      children: [{
        title: '数量',
        dataIndex: 'sale_amount',
        key: 'sale_amount',
      }, {
        title: '单价',
        dataIndex: 'sale_unit_fee',
        key: 'sale_unit_fee',
      }, {
        title: '金额',
        dataIndex: 'sale_fee',
        key: 'sale_fee',
      }],
    }, {
      title: '月末金额',
      children: [{
        title: '数量',
        dataIndex: 'balance_amount',
        key: 'balance_amount',
      }, {
        title: '单价',
        dataIndex: 'balance_unit_fee',
        key: 'balance_unit_fee',
      }, {
        title: '金额',
        dataIndex: 'balance_fee',
        key: 'balance_fee',
      }],
    },
  ]


  return (
    <div>
      <Table
        {...tableProps}
        columns={columns}
        bordered
        size="middle"
      />
    </div>
  )
}


export default List
