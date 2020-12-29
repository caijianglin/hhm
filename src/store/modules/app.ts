const app = {
  namespace: true,
  state: {
    userAgent: "pc", // 用户代理
    isPC: true,
    themeColor: "#264547", // 主题颜色,
    lang: localStorage.getItem("language") || "zh_CN",
    resizeFooterTime: ""
  },
  mutations: {
    USER_AGENT: (state: any, data: string) => {
      state.userAgent = data;
      state.isPC = data === "pc";
    },
    THEMECOLOR: (state: any, data: string) => {
      state.themeColor = data;
    },
    LANG: (state: any, data: string) => {
      state.lang = data;
    },
    SETRESIZEFOOTER: (state: any, data: any) => {
      state.resizeFooterTime = data;
    }
  },
  actions: {
    setThemeColor({ commit }: any, themeColor: string) {
      commit("SET_LANGUAGE", themeColor);
    },
    setUserAgent({ commit }: any, userAgent: string) {
      commit("USER_AGENT", userAgent);
    },
    setLang({ commit }: any, lang: string) {
      localStorage.setItem("language", lang);
      commit("LANG", lang);
    },
    setResizeFooter({ commit }: any, time: any) {
      commit("SETRESIZEFOOTER", time);
    }
  }
};

export default app;
