/*
 * @Author: remy
 * @Date: 2021-12-29 10:55:08
 * @LastEditTime: 2021-12-29 13:22:49
 * @Description: demo接口
 * @Version: 0.0.1
 */
import apiAxios from '@/libs/request'

// 分页
export const getPage = () => apiAxios({
  method: 'GET',
  url: '/mock/demo',
});

// 地图点位数据
export const mapPoint = () => apiAxios({
  method: 'GET',
  url: '/mock/map',
});
