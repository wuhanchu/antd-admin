import React from 'react'
import PropTypes from 'prop-types'
import { Form, Input, Modal, Select } from 'antd'

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
      onOk(data)
    })
  }

  const modalOpts = {
    ...modalProps,
    onOk: handleOk,
  }

  return (
    <Modal {...modalOpts}>
      <Form layout="horizontal">
        <FormItem label="类型" hasFeedback {...formItemLayout}>
          {getFieldDecorator('type', {
            initialValue: item.type,
            rules: [
              {
                required: true,
              },
            ],
          })(<Select >
            <Select.Option value="供应商名称">供应商名称</Select.Option>
            <Select.Option value="客户名称">客户名称</Select.Option>
          </Select>)}
        </FormItem>
        <FormItem label="值" hasFeedback {...formItemLayout}>
          {getFieldDecorator('value', {
            initialValue: item.value,
            rules: [
              {
                required: true,
              },
            ],
          })(<Input />)}
        </FormItem>

      </Form>
    </Modal>
  )
}

modal.propTypes = {
  form: PropTypes.object.isRequired,
  type: PropTypes.string,
  item: PropTypes.object,
  onOk: PropTypes.func,
}

export default Form.create()(modal)
