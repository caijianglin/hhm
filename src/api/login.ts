import request from "@/utils/request";

// 登录
export function userLogin(data: FormData) {
  return request({
    url: "com.primeton.portal.commonBiz.login.biz.ext",
    method: "post",
    data
  });
}
// 刷新token
export function refreshToken() {
  return request({
    url: "/refreshToken",
    method: "post"
  });
}
// 获取当前登录用户详细信息
export function getUserInfo(empId: string = "") {
  return request({
    url: "com.primeton.portal.commonBiz.queryEmpInfoById.biz.ext",
    method: "post"
  });
}
// 注销
export function logout() {
  return request({
    url: "/user/logout",
    method: "post"
  });
}
