const getters = {
  token: (state: any) => state.user.token,
  user_id: (state: any) => state.user.user_id,
  user_info: (state: any) => state.user.user_info,
  isChecked: (state: any) => state.app.isChecked, // 免登陆勾选状态
  userAgent: (state: any) => state.app.userAgent,
  isPC: (state: any) => state.app.isPC,
  themeColor: (state: any) => state.app.themeColor,
  lang: (state: any) => state.app.lang,
  resizeFooterTime: (state: any) => state.app.resizeFooterTime
};
export default getters;
