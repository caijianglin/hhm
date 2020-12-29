/* eslint-disable no-useless-escape */
import store from "../store";

const ua = window.navigator.userAgent;
const ipad = ua.match(/（iPad）。* OS \ s（[\ d _] +）/);
// Android终端
const isAndroid = ua.indexOf("Android") > -1 || ua.indexOf("Adr") > -1;
// iOS终端
const isiOS = !!ua.match(/\(i[^;]+;( U;)? CPU.+Mac OS X/);

if (isAndroid) {
  store.dispatch("setUserAgent", "android");
} else if (isiOS) {
  store.dispatch("setUserAgent", "ios");
} else {
  store.dispatch("setUserAgent", "pc");
}
