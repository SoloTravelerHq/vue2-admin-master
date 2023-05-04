/*
 * @Author: remy
 * @Date: 2021-12-22 15:58:28
 * @LastEditTime: 2022-01-18 22:48:31
 * @Description: 登录账号token相关
 * @Version: 0.0.1
 */

const storage = sessionStorage;
const tokenPrefix = ''; // token前缀
// const accessTokenExpireTimestamp = Infinity; // Infinity时表示永不过期

// 设置/更新当前账号token信息
export function setTokenInfo(data) {
  storage.accessTokenExpireTimestamp = data.accessTokenExpireTimestamp;
  storage.accessToken = data.accessToken;
  storage.refreshToken = data.refreshToken;
}

// 获取当前账号token信息
export function getTokenInfo() {
  return {
    accessTokenExpireTimestamp: storage.accessTokenExpireTimestamp,
    accessToken: tokenPrefix + (storage.accessToken || ''),
    refreshToken: tokenPrefix + (storage.refreshToken || '')
  };
}

// 清空当前账号token信息
export function clearTokenInfo() {
  storage.removeItem('accessTokenExpireTimestamp');
  storage.removeItem('accessToken');
  storage.removeItem('refreshToken');
}
