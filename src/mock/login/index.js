
// 引入mockjs模块
import Mock from 'mockjs'
import admin from './admin.json'
import user1 from './user1.json'

Mock.mock('/mock/login?name=admin&password=123456', {
  code: 200,
  data: admin
})
Mock.mock('/mock/login?name=user1&password=123456', {
  code: 200,
  data: user1
})