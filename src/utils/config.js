const APIV1 = '/api/v1'
const APIV2 = '/api/v2'

const ClientOAuth2 = require('client-oauth2')

module.exports = {
  name: 'AntD Admin',
  prefix: 'antdAdmin',
  footerText: 'Ant Design Admin  © 2017 zuiidea',
  logo: '/logo.png',
  iconFontCSS: '/iconfont.css',
  iconFontJS: '/iconfont.js',
  YQL: ['http://www.zuimeitianqi.com'],
  CORS: ['http://localhost:7000'],
  openPages: ['/login'],
  apiPrefix: '/api/v1',
  api: {
    oauth: 'auth/oauth2/token',
    userLogin: `${APIV1}/user/login`,
    userLogout: `${APIV1}/user/logout`,
    userInfo: `${APIV1}/userInfo`,
    users: `${APIV1}/users`,
    posts: `${APIV1}/posts`,
    devices: `${APIV1}/devices/`,
    records: `${APIV1}/devices/records/`,
    dicts: `${APIV1}/devices/dicts/`,

    user: `${APIV1}/user/:id`,
    dashboard: `${APIV1}/dashboard`,
    v1test: `${APIV1}/test`,
    v2test: `${APIV2}/test`,
  },
  oauthClient: new ClientOAuth2({
    clientId: 'documentation',
    accessTokenUri: 'auth/oauth2/token',
    authorizationUri: 'auth/oauth2/token?grant_type=refresh_token',

    // todo edit scope
    scopes: 'users:read users:write auth:read auth:write',
  }),
}

