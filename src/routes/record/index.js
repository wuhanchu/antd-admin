import React from 'react'
import PropTypes from 'prop-types'
import { routerRedux } from 'dva/router'
import { connect } from 'dva'
import List from './List'
import Filter from './Filter'
import Modal from './Modal'

const User = ({ location, dispatch, record, loading }) => {
  const { list, pagination, currentItem, modalVisible, modalType, isMotion, dicts, devices } = record
  const { pageSize } = pagination


  const modalProps = {
    item: modalType === 'create' ? {} : currentItem,
    visible: modalVisible,
    maskClosable: false,
    confirmLoading: loading.effects['record/update'],
    title: `${modalType === 'create' ? '增加库存' : '修改库存'}`,
    wrapClassName: 'vertical-center-modal',
    dicts,
    devices,
    onOk (data) {
      dispatch({
        type: `record/${modalType}`,
        payload: data,
      })
    },
    onCancel () {
      dispatch({
        type: 'record/hideModal',
      })
    },
  }

  const listProps = {
    dataSource: list,
    dicts,
    devices,
    loading: loading.effects['record/query'],
    pagination,
    location,
    onChange (page) {
      const { query, pathname } = location
      dispatch(routerRedux.push({
        pathname,
        query: {
          ...query,
          page: page.current,
          pageSize: page.pageSize,
        },
      }))
    },
    onDeleteItem (id) {
      dispatch({
        type: 'record/delete',
        payload: id,
      })
    },
    onEditItem (item) {
      dispatch({
        type: 'record/showModal',
        payload: {
          modalType: 'update',
          currentItem: item,
        },
      })
    },
  }

  const filterProps = {
    isMotion,
    devices,
    filter: {
      ...location.query,
    },
    onFilterChange (value) {
      dispatch(routerRedux.push({
        pathname: location.pathname,
        query: {
          ...value,
          page: 1,
          pageSize,
        },
      }))
    },
    onSearch (fieldsValue) {
      fieldsValue.keyword.length ? dispatch(routerRedux.push({
        pathname: '/record',
        query: {
          field: fieldsValue.field,
          keyword: fieldsValue.keyword,
        },
      })) : dispatch(routerRedux.push({
        pathname: '/record',
      }))
    },
    onAdd () {
      dispatch({
        type: 'record/showModal',
        payload: {
          modalType: 'create',
        },
      })
    },
    switchIsMotion () {
      dispatch({ type: 'record/switchIsMotion' })
    },
  }


  return (
    <div className="content-inner">
      <Filter {...filterProps} />
      <List {...listProps} />
      {modalVisible && <Modal {...modalProps} />}
    </div>
  )
}

User.propTypes = {
  record: PropTypes.object,
  location: PropTypes.object,
  dispatch: PropTypes.func,
  loading: PropTypes.object,
}

export default connect(({ record, loading }) => ({ record, loading }))(User)
