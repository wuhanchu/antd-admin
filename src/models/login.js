import { login } from '../services/app'
import { routerRedux } from 'dva/router'
import { queryURL } from '../utils'

export default {
  namespace: 'login',
  state: {
    loginLoading: false,
  },

  effects: {
    *login ({
      payload,
    }, { put, call }) {
      yield put({ type: 'showLoginLoading' })
      const token = yield call(login, payload)
      yield put({ type: 'hideLoginLoading' })
      if (token.data) {
        sessionStorage.setItem('token', JSON.stringify(token.data))

        // 设置自动刷新
        token.expiresIn(60)
        console.log('token',token)
        token.refresh().then((newToken) => {
          sessionStorage.setItem('token', JSON.stringify(newToken))
        })

        const from = queryURL('from')
        yield put({ type: 'app/query' })
        if (from) {
          yield put(routerRedux.push(from))
        } else {
          yield put(routerRedux.push('/dashboard'))
        }
      } else {
        throw data
      }
    },
  },
  reducers: {
    showLoginLoading (state) {
      return {
        ...state,
        loginLoading: true,
      }
    },
    hideLoginLoading (state) {
      return {
        ...state,
        loginLoading: false,
      }
    },
  },
}
