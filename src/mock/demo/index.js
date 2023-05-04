// 引入mockjs模块
import Mock from 'mockjs'
import demo from './demo.json'
import map from './mapPoint.json'

Mock.mock('/mock/demo?token=tdxszxc', {
  code: 200,
  data: demo,
})

Mock.mock('/mock/map?token=tdxszxc', {
  code: 200,
  data: map,
})