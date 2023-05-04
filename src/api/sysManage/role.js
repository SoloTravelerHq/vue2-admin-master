import apiAxios from '@/libs/request';

// 新增
export const add = () => apiAxios();

// 修改
export const update = () => apiAxios();

// 修改密码
export const updatePwd = () => apiAxios();

// 删除
export const del = () => apiAxios();

// 详情
export const detail = () => apiAxios();

// 分页
export const getPage = () => apiAxios({
  method: 'GET',
  url: '/mock/role'
});

// 下拉列表
export const getList = () => apiAxios();