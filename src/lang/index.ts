import Vue from "vue";
import VueI18n from "vue-i18n";
// import enLocale from "./en";
import zhLocale from "./zh_cn";
import hkLocale from "./zh_hk";

Vue.use(VueI18n);

const messages = {
  zh_HK: {
    ...hkLocale
  },
  zh_CN: {
    ...zhLocale
  }
};

const i18n = new VueI18n({
  // set locale
  // options: en | zh | hk
  locale: localStorage.getItem("language") || "zh_CN",
  // set locale messages
  messages
});

export default i18n;
