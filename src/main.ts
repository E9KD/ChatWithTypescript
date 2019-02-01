/*
 * @Company: YunMian
 * @Author: Song
 * @Date: 2019-01-05 14:34:31
 * @LastEditTime: 2019-01-24 09:48:56
 */

import Vue from "vue";
import App from "@/App.vue";
import router from "@/router";
import store from "@/store/store";
import iView from "iview";
import "iview/dist/styles/iview.css";
import vueLazyload from "vue-lazyload";
Vue.use(vueLazyload, {
  loading: "@/assets/loading.gif"
});
Vue.use(iView);
Vue.config.productionTip = false;
Vue.prototype.$Loading.config({
  color: "#00adb5",
  failedColor: "#DC143C",
  height: 3
});
new Vue({
  router,
  store,
  render: h => h(App)
}).$mount("#app");
