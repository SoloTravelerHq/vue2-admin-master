/*
 * @Author: remy
 * @Date: 2021-12-26 19:38:38
 * @LastEditTime: 2022-01-18 22:35:32
 * @Description: 登录相关
 * @Version: 0.0.1
 */
// 登录

import apiAxios from '@/libs/request';

export const login = (data) => apiAxios({
  method: 'POST',
  url: '/mock/login',
  params: data
});
