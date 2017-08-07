import { request, config } from '../utils'
const { api } = config
const { dicts } = api

export async function query (params) {
  // 设置分页属性
  let searchParam = {}
  Object.assign(searchParam, params)

  if (searchParam.pageSize) {
    searchParam.limit = searchParam.pageSize
    delete searchParam.pageSize
  }

  if (searchParam.page) {
    searchParam.offset = (searchParam.page - 1) * searchParam.limit
    delete searchParam.page
  }

  return request({
    url: dicts,
    method: 'get',
    data: params,
  })
}

export async function create (params) {
  return request({
    url: dicts,
    method: 'post',
    data: params,
  })
}

export async function remove (id) {
  return request({
    url: dicts + id,
    method: 'delete',
  })
}

export async function update (params) {
  return request({
    url: dicts + params.id,
    method: 'patch',
    data: params,
  })
}
