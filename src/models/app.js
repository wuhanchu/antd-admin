import {query, logout} from '../services/app'
import {routerRedux} from 'dva/router'
import {parse} from 'qs'
import {config} from '../utils'
import {getUrlAnchor, queryURL} from '../utils/index'

const { prefix } = config

export default {
  namespace: 'app',
  state: {
    user: {},
    menuPopoverVisible: false,
    siderFold: localStorage.getItem(`${prefix}siderFold`) === 'true',
    darkTheme: localStorage.getItem(`${prefix}darkTheme`) === null || localStorage.getItem(`${prefix}darkTheme`) === 'true',
    isNavbar: document.body.clientWidth < 769,
    navOpenKeys: JSON.parse(localStorage.getItem(`${prefix}navOpenKeys`)) || [],
  },
  subscriptions: {

    setup ({ dispatch }) {
      dispatch({ type: 'query' })
      let tid
      window.onresize = () => {
        clearTimeout(tid)
        tid = setTimeout(() => {
          dispatch({ type: 'changeNavbar' })
        }, 300)
      }
    },

  },
  effects: {

    * query ({
      payload,
    }, { call, put }) {
      const data = yield call(query, parse(payload))
      if (data.success) {
        yield put({
          type: 'querySuccess',
          payload: data,
        })

        let from = queryURL('from')

        if (!from) {
          from = '/dashboard'
        }
        yield put(routerRedux.push(from))

      } else if (config.openPages && config.openPages.indexOf(location.pathname) < 0) {
        let from = getUrlAnchor(location.href)
        from = (from != '/login' && from != 'login' ? `?from=${from}` : '')
        window.location.href = `${location.origin}${location.pathname}#/login${from}`
      }
    },

    * logout ({
      payload,
    }, { call, put }) {
      // const data = yield call(logout, parse(payload))
      sessionStorage.removeItem('token')
      let from = getUrlAnchor(location.href)
      window.location.href = `${location.origin}#login?from=${from}`
    },

    * changeNavbar ({
      payload,
    }, { put, select }) {
      const { app } = yield (select(_ => _))
      const isNavbar = document.body.clientWidth < 769
      if (isNavbar !== app.isNavbar) {
        yield put({ type: 'handleNavbar', payload: isNavbar })
      }
    },

  },
  reducers: {
    querySuccess (state, { payload: user }) {
      return {
        ...state,
        user,
      }
    },

    switchSider (state) {
      localStorage.setItem(`${prefix}siderFold`, !state.siderFold)
      return {
        ...state,
        siderFold: !state.siderFold,
      }
    },

    switchTheme (state) {
      localStorage.setItem(`${prefix}darkTheme`, !state.darkTheme)
      return {
        ...state,
        darkTheme: !state.darkTheme,
      }
    },

    switchMenuPopver (state) {
      return {
        ...state,
        menuPopoverVisible: !state.menuPopoverVisible,
      }
    },

    handleNavbar (state, { payload }) {
      return {
        ...state,
        isNavbar: payload,
      }
    },

    handleNavOpenKeys (state, { payload: navOpenKeys }) {
      return {
        ...state,
        ...navOpenKeys,
      }
    },
  },
}
