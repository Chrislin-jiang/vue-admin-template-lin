const Mock = require('mockjs')

const data = Mock.mock({
  'items|40': [{
    id: '@id',
    indicators: 'index',
    description: '@sentence(10, 20)'
  }]
})

module.exports = [{
  url: '/vue-admin-template/evaluation-index/list',
  type: 'get',
  response: config => {
    const items = data.items
    return {
      code: 20000,
      data: {
        total: items.length,
        items: items
      }
    }
  }
}]
