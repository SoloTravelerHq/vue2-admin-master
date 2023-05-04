/*
 * 接口统一处理
 */
import axios from "axios";
import nprogress from 'nprogress'
import 'nprogress/nprogress.css'
import { getTokenInfo, clearTokenInfo } from "@/api/token";

// const requests = axios.create({
//   baseURL: "/api",
//   timeout: 20000,
// })
const requests = axios.create({
  params: {}
})

// 不需要验证token的接口集合
const noNeedTokenApis = ["/login", "/mock/login"];
// 请求拦截器
requests.interceptors.request.use((config) => {
  nprogress.start();
  // console.log(config)
  if (!noNeedTokenApis.includes(config.url)) config.params.token = getTokenInfo().accessToken;
  return config
})
// 响应拦截器
requests.interceptors.response.use((res) => {
  nprogress.done();
  // console.log(res, '响应拦截器');
  if (res.data && res.data.code !== 200) {
    throw new Error(res.data.message);
  } else if (res.data.message == "请登录" || res.data.message == "已过期，请重新登陆") {
    clearTokenInfo();
    location.reload();
    return Promise.reject('登录已过期请重新登陆');
  } else return res.data.data
}, (err) => {
  nprogress.done()
  // console.log(err, '响应拦截器');
  return Promise.reject(new Error(err))
})

export default requests
