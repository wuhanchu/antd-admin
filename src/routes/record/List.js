import React from 'react'
import PropTypes from 'prop-types'
import { Table, Modal } from 'antd'
import { DropOption } from '../../components'
const confirm = Modal.confirm
import styles from './List.less'

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
      className: styles.th,
      dataIndex: 'code',
      key: 'code',
    }, {
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
      title: '期间',
      dataIndex: 'month',
      key: 'month',
    }, {
      title: '摘要',
      dataIndex: 'remark',
      key: 'remark',
    }, {
      title: '购进',
      children: [{
        title: '购进时间',
        dataIndex: 'in_date',
        key: 'in_date',
      },{
        title: '入库时间',
        dataIndex: 'in_real_date',
        key: 'in_real_date',
      }, {
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
      }, {
        title: '税率',
        dataIndex: 'in_tax_fee',
        key: 'in_tax_fee',
      }, {
        title: '税额',
        dataIndex: 'in_tax_amount',
        key: 'in_tax_amount',
      }, {
        title: '价税合计',
        dataIndex: 'in_price_tax',
        key: 'in_price_tax',
      }, {
        title: '发票日期',
        dataIndex: 'in_tax_date',
        key: 'in_tax_date',
      }, {
        title: '发票号码',
        dataIndex: 'in_tax_no',
        key: 'in_tax_no',
      }, {
        title: '认证日期',
        dataIndex: 'in_auth_date',
        key: 'in_auth_date',
      }, {
        title: '客户名称',
        dataIndex: 'in_client',
        key: 'in_client',
      }, {
        title: '供应商名称',
        dataIndex: 'in_provider',
        key: 'in_provider',
      }, {
        title: '购进备注',
        dataIndex: 'in_remark',
        key: 'in_remark',
      }],
    }, {
      title: '销售',
      children: [{
        title: '销售日期',
        dataIndex: 'sale_date',
        key: 'sale_date',
      },{
        title: '出库时间',
        dataIndex: 'sale_real_date',
        key: 'sale_real_date',
      }, {
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
      }, {
        title: '税率',
        dataIndex: 'sale_tax_fee',
        key: 'sale_tax_fee',
      }, {
        title: '税额',
        dataIndex: 'sale_tax_amount',
        key: 'sale_tax_amount',
      }, {
        title: '价税合计',
        dataIndex: 'sale_price_tax',
        key: 'sale_price_tax',
      }, {
        title: '发票日期',
        dataIndex: 'sale_tax_date',
        key: 'sale_tax_date',
      }, {
        title: '发票号码',
        dataIndex: 'sale_tax_no',
        key: 'sale_tax_no',
      }, {
        title: '出库人',
        dataIndex: 'sale_people',
        key: 'sale_people',
      }, {
        title: '客户名称',
        dataIndex: 'sale_client',
        key: 'sale_client',
      }, {
        title: '销售备注',
        dataIndex: 'sale_remark',
        key: 'sale_remark',
      }],
    }, {
      title: '结存',
      children: [{
        title: '结存日期',
        dataIndex: 'balance_date',
        key: 'balance_date',
      }, {
        title: '数量',
        dataIndex: 'balance_amount',
        key: 'balance_amount',
      }],
    }, {
      title: '操作',
      key: 'operation',
      width: 100,
      render: (text, record) => {
        return (<DropOption onMenuClick={e => handleMenuClick(record, e)}
          menuOptions={[{ key: '1', name: '编辑' }, { key: '2', name: '删除' }]}
        />)
      },
    },
  ]


  return (
    <div>
      <Table
        className={styles.table}
        {...tableProps}
        bordered = {true}
        scroll={{ x: '200%' }}
        size="middle"
        columns={columns}
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
