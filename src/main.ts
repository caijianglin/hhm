import Vue from "vue";
import App from "./App.vue";
import router from "./router/index";
import store from "./store/index";
import "./permission"; // permission control

import "./utils/style";
import "./utils/btnLoading/index";
// import * as Utils from './utils'
import "./icons"; // icon
import "animate.css";
import "normalize.css/normalize.css";
import "@/styles/index.scss"; // global css
// Vue.prototype.utils = Utils
import {
Message,
Dropdown,
DropdownMenu,
DropdownItem
} from "element-ui";
Vue.use(Dropdown);
Vue.use(DropdownMenu);
Vue.use(DropdownItem);
Vue.prototype.$message = Message;
import i18n from "./lang"; // Internationalization
// Vue.use({ i18n: (key: any, value: any) => i18n.t(key, value) })
Vue.config.productionTip = false;

new Vue({
router,
store,
i18n,
render: h => h(App)
}).$mount("#app");