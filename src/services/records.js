import { request, config } from '../utils'
const { api } = config
const { records } = api

export async function query (params) {
  // 设置分页属性
  let searchParam = {}
  Object.assign(searchParam, params)



  return request({
    url: records,
    method: 'get',
    data: params,
  })
}

export async function create (params) {
  return request({
    url: records,
    method: 'post',
    data: params,
  })
}

export async function remove (id) {
  return request({
    url: records + id,
    method: 'delete',
  })
}

export async function update (params) {
  return request({
    url: records + params.id,
    method: 'patch',
    data: params,
  })
}

export async function statistics (params) {
  return request({
    url: `${records}statistics`,
    method: 'get',
    data: params,
  })
}
