import axios from "axios";
import store from "@/store";
import router from "@/router";

// 创建axios实例
// 允许携带cookie
const service = axios.create({
  baseURL: process.env.BASE_API, // api 的 base_url
  timeout: 10000, // 请求超时时间
  withCredentials: true
});
// service.defaults.withCredentials = true;
// if (!localStorage.getItem("language")) {
//   localStorage.setItem("language", "zh_CN");
// }
// const currLang = localStorage.getItem("language");

// request拦截器
service.interceptors.request.use(
  (config: any) => {
    // config.withCredentials = true;
    // 此处拦截url增加版本号
    config.url = "/" + config.url;

    // if (store.getters.token) {
    //   config.headers.Authorization = "no-token"; // 让每个请求携带自定义token 请根据实际情况自行修改
    // }

    // config.headers.language = currLang; // 多语言
    return config;
  },
  error => {
    // Do something with request error
    Promise.reject(error);
  }
);

// response 拦截器
service.interceptors.response.use(
  response => {
    /**
     * code为非200是抛错 可结合自己业务进行修改
     */
    const res: any = response.data;
    if (Number(res.flag) !== 1) {
      if (res.exception && res.exception.code === "12101001") {
        store.dispatch("FedLogOut").then(() => {
          // location.reload(); // 为了重新实例化vue-router对象 避免bug
          router.push("login");
        });
        return Promise.reject(res.exception.message);
      }
      // setTimeout(() => {
      //   // 刷新footer样式
      //   store.dispatch("setResizeFooter", new Date());
      // }, 100);
      // alert("请求超时");
      // Message({
      //   message: res.errMessage ? res.errMessage : '请求超时',
      //   type: 'error',
      //   duration: 5 * 1000
      // });

      // 401:非法的token; 50012:其他客户端登录了;“|| res.code === 50012 ”  50014:Token 过期了;
      // if (res.code === 401 || res.code === 401) {
      //   alert("无权限");
      //   // MessageBox.confirm(
      //   //   '你已被登出，可以取消继续留在该页面，或者重新登录',
      //   //   '确定登出',
      //   //   {
      //   //     confirmButtonText: '重新登录',
      //   //     cancelButtonText: '取消',
      //   //     type: 'warning'
      //   //   }
      //   // ).then(() => {
      //   //   store.dispatch('FedLogOut').then(() => {
      //   //     location.reload(); // 为了重新实例化vue-router对象 避免bug
      //   //   });
      //   // });
      // }
      // // 400-->处理失败，500-->服务器内部错误
      // else if (res.code === 500 || res.code === 400) {
      //   alert("服务器错误");
      //   // Message({
      //   //   message: res.errMessage,
      //   //   type: 'error',
      //   //   duration: 5 * 1000
      //   // });
      // }
      return Promise.reject(response.data);
    } else {
      // setTimeout(() => {
      //   // 刷新footer样式
      //   store.dispatch("setResizeFooter", new Date());
      // }, 100);
      return response.data;
    }
  },
  error => {
    // Message({
    //   message: error,
    //   type: 'error',
    //   duration: 5 * 1000
    // });
    // alert(error);
    return Promise.reject(error);
  }
);

export default service;
