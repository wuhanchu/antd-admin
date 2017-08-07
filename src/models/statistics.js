import modelExtend from 'dva-model-extend'
import { statistics } from '../services/records'
import { pageModel } from './common'
import * as devicesService from '../services/devices'

export default modelExtend(pageModel, {
  namespace: 'statistics',

  state: {
    currentItem: {},
    modalVisible: false,
    modalType: 'create',
    selectedRowKeys: [],
    devices: [],
  },

  subscriptions: {
    setup ({ dispatch, history }) {
      history.listen(location => {
        if (location.pathname === '/statistics') {
          dispatch({
            type: 'init',
            payload: location.query,
          })
        }
      })
    },
  },

  effects: {
    *init ({ payload = {} }, { call, put }) {
      //  初始化字典
      const devices = yield call(devicesService.query, {})
      yield put({
        type: 'updateState',
        payload:
        { devices: devices.data,
        },
      })
      yield put({ type: 'query', payload })
    },

    *query ({ payload = {} }, { call, put }) {
      const data = yield call(statistics, payload)
      if (data) {
        yield put({
          type: 'querySuccess',
          payload: {
            list: data.data,
            pagination: {
              current: Number(payload.page) || 1,
              pageSize: Number(payload.pageSize) || 10,
            },
          },
        })
      }
    },
  },

  reducers: {},
})
