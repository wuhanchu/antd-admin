import React from 'react'
import PropTypes from 'prop-types'
import { Form, Input, Modal, Tabs, Select, DatePicker, InputNumber, TreeSelect } from 'antd'

const TabPane = Tabs.TabPane
const { TextArea } = Input
import moment from 'moment'

const { MonthPicker } = DatePicker
const TreeNode = TreeSelect.TreeNode
const FormItem = Form.Item

const formItemLayout = {
  labelCol: {
    span: 6,
  },
  wrapperCol: {
    span: 14,
  },
}

const modal = ({
  item = {},
  onOk,
  dicts,
  devices,
  form: {
    getFieldDecorator,
    validateFields,
    getFieldsValue,
  },
  ...modalProps
}) => {
  const handleOk = () => {
    validateFields((errors) => {
      if (errors) {
        return
      }
      const data = {
        ...getFieldsValue(),
        key: item.key,
      }

      // judge type and set other null
      if (data.type === '本期销售') {
        delete data.in_date
        delete data.in_real_date
        delete data.in_amount
        delete data.in_unit_fee
        delete data.in_fee
        delete data.in_auth_date
        delete data.in_provider
        delete data.in_tax_fee
        delete data.in_tax_amount
        delete data.in_price_tax
        delete data.in_tax_date
        delete data.in_tax_no
        delete data.in_client
        delete data.in_remark
      } else if (data.type === '本期购进') {
        delete data.sale_date
        delete data.sale_real_date
        delete data.sale_amount
        delete data.sale_unit_fee
        delete data.sale_fee
        delete data.sale_people
        delete data.sale_client
        delete data.sale_tax_fee
        delete data.sale_tax_amount
        delete data.sale_price_tax
        delete data.sale_tax_no
        delete data.sale_remark
      }


      ['in_date', 'in_auth_date', 'sale_date', 'real_date', 'in_real_date', 'in_tax_date', 'sale_real_date', 'balance_date', 'balance_buy_date'].forEach((item) => {
        if (data[item]) data[item] = data[item].format('YYYY-MM-DD')
      })

      onOk(data)
    })
  }

  // 设置初始化数据
  const modalOpts = {
    ...modalProps,
    width: 600,
    onOk: handleOk,
  }
  const tabOpts = {
    tabPosition: 'left',
  }
  const monthFormat = 'YYYY年MM月'
  const dateFormat = 'YYYY年MM月DD日'

  if (item.in_date) {
    item.in_date = moment(item.in_date)
  }

  if (item.in_auth_date) {
    item.in_auth_date = moment(item.in_auth_date)
  }

  if (item.sale_date) {
    item.sale_date = moment(item.sale_date)
  }

  // 创建词典下拉框
  let dictOptions = {
    供应商名称: [],
    客户名称: [],
  }
  dicts.forEach((data) => {
    dictOptions[data.type].push(<Select.Option value={data.value}>{data.value}</Select.Option>)
  })

  // 排序树节点
  devices = devices.sort((a, b) => a.code > b.code)

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
    return (<TreeNode value={node.code}
      title={`${node.accountant_name}(${node.code})`}
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

  // 创建设备信息
  const formData = getFieldsValue()
  if (formData.code || formData.type) {
    Object.assign(item, formData)
    Object.assign(item, devicesMap[formData.code])
  }

  return (
    <Modal {...modalOpts}>
      <Form layout="horizontal">
        <Tabs
          {...tabOpts}
        >
          <TabPane tab="信息" key="1">
            <FormItem label="类型" hasFeedback {...formItemLayout}>
              {getFieldDecorator('type', {
                initialValue: item.type,
                rules: [
                  {
                    required: true,
                  },
                ],
              })(<Select >
                <Select.Option value={'本期销售'}>{'本期销售'}</Select.Option>
                <Select.Option value={'本期购进'}>{'本期购进'}</Select.Option>
              </Select>)}
            </FormItem>
            <FormItem label="编码" hasFeedback {...formItemLayout}>
              {getFieldDecorator('code', {
                initialValue: item.code,
                rules: [
                  {
                    required: true,
                  }],
              })(<TreeSelect
                showSearch
                dropdownStyle={{ maxHeight: 400, overflow: 'auto' }}
                placeholder=""
                allowClear
                treeDefaultExpandAll
              >{treeNodes}</TreeSelect>
              )
              }
            </FormItem>
            <FormItem label="价格区间" hasFeedback {...formItemLayout}>
              {getFieldDecorator('accountant_name', {
                initialValue: item.accountant_name,
                rules: [
                  {},
                ],
              })(<Input />)}
            </FormItem>
            <FormItem label="发票产品名称" hasFeedback {...formItemLayout}>
              {getFieldDecorator('bill_name', {
                initialValue: item.bill_name,
                rules: [
                  {},
                ],
              })(<Input />)}
            </FormItem>
            <FormItem label="规格型号" hasFeedback {...formItemLayout}>
              {getFieldDecorator('description', {
                initialValue: item.description,
                rules: [
                  {},
                ],
              })(
                <Input />
              )}
            </FormItem>
            <FormItem label="单位" hasFeedback {...formItemLayout}>
              {getFieldDecorator('unit', {
                initialValue: item.unit,
                rules: [
                  {},
                ],
              })(<Input />)}
            </FormItem>
            <FormItem label="摘要" hasFeedback {...formItemLayout}>
              {getFieldDecorator('remark', {
                initialValue: item.remark,
                rules: [
                  {},
                ],
              })(<TextArea />)}
            </FormItem>
          </TabPane>
          {item.type === '本期购进' ?
            <TabPane tab="购进" key="2">
              <FormItem label="购进时间" hasFeedback {...formItemLayout} >
                {getFieldDecorator('in_date', {
                  initialValue: item.in_date ? moment(item.in_date) : null,
                  rules: [
                    {
                      type: 'object',
                      required: true,

                    },
                  ],
                })(<DatePicker format={dateFormat} style={{ width: '100%' }} />
                )}
              </FormItem>
              <FormItem label="入库时间" hasFeedback {...formItemLayout} >
                {getFieldDecorator('in_real_date', {
                  initialValue: item.in_real_date ? moment(item.in_real_date) : null,
                  rules: [
                    {
                      type: 'object',
                    },
                  ],
                })(<DatePicker format={dateFormat} style={{ width: '100%' }} />
                )}
              </FormItem>
              <FormItem label="数量" hasFeedback {...formItemLayout}>
                {getFieldDecorator('in_amount', {
                  initialValue: item.in_amount,
                  rules: [
                    {
                      type: 'integer',
                      required: true,
                    },
                  ],
                })(
                  <InputNumber style={{ width: '100%' }} />
                )}
              </FormItem>
              <FormItem label="单价" hasFeedback {...formItemLayout}>
                {getFieldDecorator('in_unit_fee', {
                  initialValue: item.in_unit_fee,
                  rules: [
                    {
                      required: true,
                    },
                  ],
                })(<Input />)}
              </FormItem>
              <FormItem label="金额" hasFeedback {...formItemLayout}>
                {getFieldDecorator('in_fee', {
                  initialValue: item.in_fee,
                  rules: [
                    {
                      required: true,
                    },
                  ],
                })(
                  <Input />
                )}
              </FormItem>
              <FormItem label="税率" hasFeedback {...formItemLayout}>
                {getFieldDecorator('in_tax_fee', {
                  initialValue: item.in_tax_fee,
                  rules: [
                    {},
                  ],
                })(
                  <Input />
                )}
              </FormItem>
              <FormItem label="税额" hasFeedback {...formItemLayout}>
                {getFieldDecorator('in_tax_amount', {
                  initialValue: item.in_tax_amount,
                  rules: [
                    {},
                  ],
                })(
                  <Input />
                )}
              </FormItem>
              <FormItem label="价税合计" hasFeedback {...formItemLayout}>
                {getFieldDecorator('in_price_tax', {
                  initialValue: item.in_price_tax,
                  rules: [
                    {},
                  ],
                })(
                  <Input />
                )}
              </FormItem>
              <FormItem label="发票日期" hasFeedback {...formItemLayout} >
                {getFieldDecorator('in_tax_date', {
                  initialValue: item.in_tax_date ? moment(item.in_tax_date) : null,
                  rules: [
                    {
                      type: 'object',
                    },
                  ],
                })(<DatePicker format={dateFormat} style={{ width: '100%' }} />
                )}
              </FormItem>
              <FormItem label="发票号码" hasFeedback {...formItemLayout}>
                {getFieldDecorator('in_tax_no', {
                  initialValue: item.in_tax_no,
                  rules: [
                    {},
                  ],
                })(
                  <Input />
                )}
              </FormItem>
              <FormItem label="认证日期" hasFeedback {...formItemLayout}>
                {getFieldDecorator('in_auth_date', {
                  initialValue: item.in_auth_date,
                  rules: [
                    {
                      type: 'object',
                    },
                  ],
                })(<MonthPicker format={monthFormat} style={{ width: '100%' }} />)}
              </FormItem>
              <FormItem label="客户名称" hasFeedback {...formItemLayout}>
                {getFieldDecorator('in_client', {
                  initialValue: item.in_client,
                  rules: [
                    {},
                  ],
                })(<Select style={{ width: '100%' }}>
                  {dictOptions['客户名称']}
                </Select>)}
              </FormItem>
              <FormItem label="供应商名称" hasFeedback {...formItemLayout}>
                {getFieldDecorator('in_provider', {
                  initialValue: item.in_provider,
                  rules: [
                    {},
                  ],
                })(<Select >
                  {dictOptions['供应商名称']}
                </Select>)}
              </FormItem>
              <FormItem label="购进备注" hasFeedback {...formItemLayout}>
                {getFieldDecorator('in_remark', {
                  initialValue: item.in_remark,
                  rules: [
                    {},
                  ],
                })(<TextArea />)}
              </FormItem>
            </TabPane> : ''}
          {item.type === '本期销售' ?
            <TabPane tab="销售" key="3">
              <FormItem label="销售日期" hasFeedback {...formItemLayout}>
                {getFieldDecorator('sale_date', {
                  initialValue: item.sale_date ? moment(item.sale_date) : null,
                  rules: [
                    {
                      type: 'object',
                      required: true,
                    },
                  ],
                })(<DatePicker format={dateFormat} style={{ width: '100%' }} />
                )}
              </FormItem>
              <FormItem label="出库时间" hasFeedback {...formItemLayout} >
                {getFieldDecorator('sale_real_date', {
                  initialValue: item.sale_real_date ? moment(item.sale_real_date) : null,
                  rules: [
                    {
                      type: 'object',
                    },
                  ],
                })(<DatePicker format={dateFormat} style={{ width: '100%' }} />
                )}
              </FormItem>
              <FormItem label="数量" hasFeedback {...formItemLayout}>
                {getFieldDecorator('sale_amount', {
                  initialValue: item.sale_amount,
                  rules: [
                    {
                      type: 'integer',
                      required: true,

                    },
                  ],
                })(
                  <InputNumber style={{ width: '100%' }} />
                )}
              </FormItem>
              <FormItem label="税率" hasFeedback {...formItemLayout}>
                {getFieldDecorator('sale_tax_fee', {
                  initialValue: item.sale_tax_fee,
                  rules: [
                    {},
                  ],
                })(
                  <Input />
                )}
              </FormItem>
              <FormItem label="税额" hasFeedback {...formItemLayout}>
                {getFieldDecorator('sale_tax_amount', {
                  initialValue: item.sale_tax_amount,
                  rules: [
                    {},
                  ],
                })(
                  <Input />
                )}
              </FormItem>
              <FormItem label="价税合计" hasFeedback {...formItemLayout}>
                {getFieldDecorator('sale_price_tax', {
                  initialValue: item.sale_price_tax,
                  rules: [
                    {},
                  ],
                })(
                  <Input />
                )}
              </FormItem>
              <FormItem label="发票号码" hasFeedback {...formItemLayout}>
                {getFieldDecorator('sale_tax_no', {
                  initialValue: item.sale_tax_no,
                  rules: [
                    {},
                  ],
                })(
                  <Input />
                )}
              </FormItem>
              <FormItem label="出库人" hasFeedback {...formItemLayout}>
                {getFieldDecorator('sale_people', {
                  initialValue: item.sale_people,
                  rules: [
                    {},
                  ],
                })(<Input />)}
              </FormItem>
              <FormItem label="客户名称" hasFeedback {...formItemLayout}>
                {getFieldDecorator('sale_client', {
                  initialValue: item.sale_client,
                  rules: [
                    {},
                  ],
                })(<Select style={{ width: '100%' }}>
                  {dictOptions['客户名称']}
                </Select>)}
              </FormItem>
              <FormItem label="销售备注" hasFeedback {...formItemLayout}>
                {getFieldDecorator('sale_remark', {
                  initialValue: item.sale_remark,
                  rules: [
                    {},
                  ],
                })(<TextArea />)}
              </FormItem>
            </TabPane> : ''}
        </Tabs>
      </Form>
    </Modal>
  )
}

modal.propTypes = {
  form: PropTypes.object.isRequired,
  type: PropTypes.string,
  item: PropTypes.object,
  onOk: PropTypes.func,
  dicts: PropTypes.array,
  devices: PropTypes.array,
}

export default Form.create()(modal)
