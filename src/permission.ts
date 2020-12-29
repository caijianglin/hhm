import router from "@/router";
import store from "@/store";
import { getToken } from "@utils/auth"; // 验权
// import Cookies from "js-cookie";

router.beforeEach((to: any, from: any, next: any) => {
  if (!getToken()) {
    // 判断当前用户是否已拉取完user_info信息
    if (to.path === "/login") {
      next();
    } else {
      // console.log("Cookies.get('JSESSIONID')", Cookies.get("JSESSIONID"));
      store
        .dispatch("GetUserInfo")
        .then((res: any) => {
          // 拉取user_info
          next({ ...to, replace: true }); // hack方法 确保addRoutes已完成 ,set the replace: true so the navigation will not leave a history record
        })
        .catch((err: any) => {
          store.dispatch("FedLogOut").then(() => {
            next({ path: "/login" });
          });
        });
    }
  } else {
    next();
  }
  // } else {
  //   if(to.path === "/login") {
  //   next();
  // } else {
  //   // 重定向到登录页，去掉路由重定向到上次关闭页面的路径
  //   next("/login");
  // }
  // }
  // next();
});

// router.afterEach(() => {
// })
