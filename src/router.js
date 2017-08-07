import React from 'react'
import PropTypes from 'prop-types'
import { Router } from 'dva/router'
import App from './routes/app'

const registerModel = (app, model) => {
  if (!(app._models.filter(m => m.namespace === model.namespace).length === 1)) {
    app.model(model)
  }
}

const Routers = function ({ history, app }) {
  const routes = [
    {
      path: '/',
      component: App,
      getIndexRoute (nextState, cb) {
        require.ensure([], require => {
          registerModel(app, require('./models/dashboard'))
          cb(null, { component: require('./routes/dashboard/') })
        }, 'dashboard')
      }, childRoutes: [
        {
          path: 'dashboard',
          getComponent (nextState, cb) {
            require.ensure([], require => {
              registerModel(app, require('./models/dashboard'))
              cb(null, require('./routes/dashboard/'))
            }, 'dashboard')
          },
        }, {
          path: 'login',
          getComponent (nextState, cb) {
            require.ensure([], require => {
              registerModel(app, require('./models/login'))
              cb(null, require('./routes/login/'))
            }, 'login')
          },
        }, {
          path: 'device',
          getComponent (nextState, cb) {
            require.ensure([], require => {
              registerModel(app, require('./models/device'))
              cb(null, require('./routes/device/'))
            }, 'device')
          },
        }, {
          path: 'dict',
          getComponent (nextState, cb) {
            require.ensure([], require => {
              registerModel(app, require('./models/dict'))
              cb(null, require('./routes/dict/'))
            }, 'dict')
          },
        }, {
          path: 'record',
          getComponent (nextState, cb) {
            require.ensure([], require => {
              registerModel(app, require('./models/record'))
              cb(null, require('./routes/record/'))
            }, 'record')
          },
        }, {
          path: 'statistics',
          getComponent (nextState, cb) {
            require.ensure([], require => {
              registerModel(app, require('./models/statistics'))
              cb(null, require('./routes/statistics/'))
            }, 'statistics')
          },
        }, {
          path: '*',
          getComponent (nextState, cb) {
            require.ensure([], require => {
              cb(null, require('./routes/error/'))
            }, 'error')
          },
        },
      ],
    },
  ]

  return <Router history={history} routes={routes} />
}

Routers.propTypes = {
  history: PropTypes.object,
  app: PropTypes.object,
}

export default Routers
