/*
 * @Company: YunMian
 * @Author: Song
 * @Date: 2019-01-05 15:32:33
 * @LastEditTime: 2019-01-11 09:50:35
 */

import Vue from "vue";
import VueRouter from "vue-router";
import { Route } from "vue-router";
declare module "vue/types/vue" {
  interface Vue {
    $router: VueRouter;
    $route: Route;
  }
}