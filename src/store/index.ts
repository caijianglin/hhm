import Vue from "vue";
import Vuex from "vuex";

import app from "./modules/app";
import user from "./modules/user";
import dictionary from "./modules/dictionary";
import getters from "./getters";

Vue.use(Vuex);

export default new Vuex.Store({
  modules: {
    app,
    dictionary,
    user
  },
  getters
});
