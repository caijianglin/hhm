import Vue from "vue";
import Router from "vue-router";

Vue.use(Router);
import Layout from "@/views/layout/index.vue";

export default new Router({
  mode: "hash",
  base: process.env.BASE_URL,
  routes: [
    {
      path: "/login",
      name: "login",
      component: () => import("@views/Login/index.vue")
    },
    {
      path: "",
      component: Layout,
      redirect: "/home",
      children: [
        {
          path: "/home",
          name: "home",
          component: () => import("@views/Home/index.vue")
        },
        {
          path: "/notice_info",
          name: "notice_info",
          component: () => import("@views/Home/components/NoticeInfo.vue")
        }
      ]
    },
    {
      path: "/more_list",
      name: "more_list",
      component: () => import("@views/MoreList/index.vue")
    },
    {
      path: "/files_list",
      name: "files_list",
      component: () => import("@views/FilesList/index.vue")
    },
    {
      path: "/show_pdf",
      name: "show_pdf",
      component: () => import("@views/FilesList/showPDF.vue")
    },
    {
      path: "/reset_pwd",
      name: "reset_pwd",
      component: () => import("@views/Login/resetPwd.vue")
    }
  ]
});
