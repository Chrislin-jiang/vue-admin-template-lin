import request from '@/utils/request'

export function getList(params) {
  return request({
    url: '/vue-admin-template/personnel-information/list',
    method: 'get',
    params
  })
}
