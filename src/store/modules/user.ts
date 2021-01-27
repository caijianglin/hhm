import Cookies from "js-cookie";
import { userLogin, logout, getUserInfo, refreshToken } from "@/api/login";
import { getToken, setToken, removeToken } from "@/utils/auth";
// let timer: any = null;
const user = {
  state: {
    user_info: {},
    status: "",
    code: "",
    token: getToken(),
    user_id: getToken(),
    isChecked: Cookies.get("isChecked_hdhPortal") || "0"
  },

  mutations: {
    SET_CODE: (state: { code: string }, code: string) => {
      state.code = code;
    },
    SET_TOKEN: (state: { token: string }, token: string) => {
      state.token = token;
    },
    SET_SETTING: (state: { setting: string }, setting: string) => {
      state.setting = setting;
    },
    SET_STATUS: (state: { status: string }, status: string) => {
      state.status = status;
    },
    SET_USER_ID: (state: { user_id: string }, id: string) => {
      console.log("id", id);
      setToken(id);
      state.user_id = id;
    },
    SET_USER_INFO: (state: any, data: any) => {
      localStorage.setItem("user_info", JSON.stringify(data));
      state.user_info = data;
    },
    SET_ISCHECKED: (state: { isChecked: any }, status: string) => {
      Cookies.set("isChecked_hdhPortal", status);
      state.isChecked = status;
    }
  },

  actions: {
    // 用户名登录
    UserLogin({ commit }: any, userInfo: FormData) {
      return new Promise((resolve, reject) => {
        // 验证码验证
        // if (codes != '') {
        // if (codes.toLowerCase() == identifyCode.toLowerCase()) {
        // 验证码没毛病 ==> 调登录接口

        userLogin(userInfo)
          .then((response: any) => {
            resolve(response);
            // const data = response.data;
            // console.log("UserLogin -> data", data);
            // commit("SET_TOKEN", data);
            // setToken(data);
            // timer = setInterval(() => {
            //   refreshToken().then((res: { data: string }) => {
            //     commit("SET_TOKEN", res.data);
            //     setToken(res.data);
            //   });
            // }, 1000 * 60 * 10);
          })
          .catch((response: any) => {
            // if (!response) {
            //   reject();
            // } else if (Number(response.flag) === 0) {
            //   reject("认证失败");
            // } else if (Number(response.flag) === -1) {
            //   reject("用户不存在");
            // } else if (Number(response.flag) === -2) {
            //   reject("用户已锁定");
            // } else if (Number(response.flag) === -3) {
            //   reject("数据库异常");
            // } else {
            //   reject("密码过期");
            // }

            if (Number(response.flag) === 0) {
              reject("密码错误！");
            } else if (Number(response.flag) === -1) {
              reject("用户不存在！");
            } else if (Number(response.flag) === -2) {
              reject("用户无权限登录，请联系系统管理员！");
            } else if (Number(response.flag) === -3) {
              reject("查询用户信息失败，请联系系统管理员检查数据库连接！");
            } else if (Number(response.flag) === 3) {
              reject("用户已过期！");
            } else if (Number(response.flag) === 4) {
              reject("用户未到开始使用时间！");
            } else if (Number(response.flag) === 5) {
              reject("密码已过期！");
            } else {
              reject("error");
            }
          });

        // } else {
        //   reject('验证码错误')
        // }

        // } else {
        //   reject('请输入验证码')
        // }
      });
    },

    // 获取用户信息
    GetUserInfo({ commit, state }: any) {
      return new Promise((resolve, reject) => {
        getUserInfo()
          .then((response: any) => {
            commit("SET_USER_INFO", {
              user_id: response.result.empId,
              empName: response.result.empName,
              empCode: response.result.empCode,
              orgName: response.result.orgName,
              degree: response.result.degree,
              otel: response.result.otel,
              pemail: response.result.pemail,
              oemail: response.result.oemail,
              sign: response.result.sign,
              company: response.result.company
            });
            commit("SET_USER_ID", response.result.empId);

            resolve(response);
          })
          .catch((error: any) => {
            reject(error);
          });
      });
    },

    // 第三方验证登录
    // LoginByThirdparty({ commit, state }, code) {
    //   return new Promise((resolve, reject) => {
    //     commit('SET_CODE', code)
    //     loginByThirdparty(state.status, state.email, state.code).then(response => {
    //       commit('SET_TOKEN', response.data.token)
    //       setToken(response.data.token)
    //       resolve()
    //     }).catch(error => {
    //       reject(error)
    //     })
    //   })
    // },

    // 登出
    LogOut({ commit, state }: any) {
      return new Promise((resolve, reject) => {
        // logout(state.token).then(() => {
        // clearInterval(timer);
        commit("SET_TOKEN", "");

        removeToken();
        resolve();
        // }).catch(error => {
        //   reject(error)
        // })
      });
    },

    // 前端 登出
    FedLogOut({ commit }: any) {
      return new Promise(resolve => {
        commit("SET_TOKEN", "");
        commit("SET_USER_ID", "");
        removeToken();
        resolve();
      });
    },
    setIsChecked({ commit }: any, status: number | string) {
      commit("SET_ISCHECKED", status.toString());
    }
  }
};

export default user;
