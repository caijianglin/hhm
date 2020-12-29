import Cookies from "js-cookie";
import store from "@/store";
const TokenKey = "HuDongHeaVy-UserID";

export function getToken() {
  return Cookies.get(TokenKey);
}

export function setToken(token: string) {
  // 判断是否已勾选五天免登陆，已勾选token存五天，未勾选存一天
  if (store.getters.isChecked === "1") {
    return Cookies.set(TokenKey, token, {
      expires: 5
    });
  } else {
    return Cookies.set(TokenKey, token, {
      expires: 1
    });
    // return Cookies.set(TokenKey, token, { expires: 1/24 })    // 一个小时
  }
}

export function removeToken() {
  return Cookies.remove(TokenKey);
}
