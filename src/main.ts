/*
 * @Company: YunMian
 * @Author: Song
 * @Date: 2019-01-05 14:34:31
 * @LastEditTime: 2019-01-11 17:25:14
 */

import Vue from "vue";
import App from "@/App.vue";
import router from "@/router";
import store from "@/store/store";
import iView from "iview";
import "iview/dist/styles/iview.css";
Vue.use(iView);
Vue.config.productionTip = false;

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount("#app");
