import React from 'react'
import PropTypes from 'prop-types'
import { routerRedux } from 'dva/router'
import { connect } from 'dva'
import List from './List'
import Filter from './Filter'

const Statistics = ({ location, dispatch, statistics, loading }) => {
  const { list, pagination, devices } = statistics
  console.log('devices', devices)
  const { pageSize } = pagination

  const listProps = {
    dataSource: list,
    devices,
    loading: loading.effects['statistics/query'],
  }

  const filterProps = {
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
  }


  return (
    <div className="content-inner">
      <Filter {...filterProps} />
      <List {...listProps} />
    </div>
  )
}

Statistics.propTypes = {
  statistics: PropTypes.object,
  location: PropTypes.object,
  dispatch: PropTypes.func,
  loading: PropTypes.object,
}

export default connect(({ statistics, loading }) => ({ statistics, loading }))(Statistics)
