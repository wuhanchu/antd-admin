import { request, config,  } from '../utils'

const { api,oauthClient } = config
const { user, users, userLogout } = api


export async function login (params) {
  return oauthClient.owner.getToken(params.username, params.password).catch((e)=>{return e})
}

export async function logout (params) {
  return request({
    url: userLogout,
    method: 'get',
    data: params,
  })
}

export async function query (params) {
  return request({
    url: `${users}/me`,
    method: 'get',
    data: params,
  })
}
