/**
 * Created by jiachenpan on 19/2/23.
 */
// 登录名验证
export function isvalidUsername(str: string) {
  // const valid_map = ['admin', 'editor']
  // return valid_map.indexOf(str.trim()) >= 0
  // const urlregex = /^[a-zA-Z0-9_-]{5,16}$/
  // const urlregex = /^[a-zA-Z0-9@\._-]{5,18}$/

  // eslint-disable-next-line no-useless-escape
  const urlregex = /^[a-zA-Z0-9@\._-]*$/; // 暂时不限制长度，因为支持邮箱登录，各种邮箱长度不确定
  return urlregex.test(str);
}

// 密码强度正则，最少6位，包括至少1个大写字母，1个小写字母，1个数字，1个特殊字符
export function isvalidPwd(str: string) {
  const urlregex = /^.*(?=.{6,})(?=.*\d)(?=.*[A-Z])(?=.*[a-z])(?=.*[!@#$%^&*? ]).*$/;
  return urlregex.test(str);
}
