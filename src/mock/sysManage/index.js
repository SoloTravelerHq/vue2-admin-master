// 先引入mockjs模块
import Mock from 'mockjs'
import user from './user.json'
import role from './role.json'


Mock.mock('/mock/user?token=tdxszxc', {
  code: 200,
  data: user,
})

Mock.mock('/mock/role?token=tdxszxc', {
  code: 200,
  data: role,
})