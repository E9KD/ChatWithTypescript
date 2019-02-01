import Vue from "vue";
import Router from "vue-router";
import store from "@/store/store";
import iView from "iview";

Vue.use(Router);
const MainRouter = [
  {
    path: "chat",
    name: "chat",
    component: () => import("@/views/chat.vue")
  },
  {
    path: "set",
    name: "set",
    component: () => import("@/views/set.vue")
  },
  {
    path: "lastchat",
    name: "lastchat",
    component: () => import("@/views/lastchat.vue")
  },
  {
    path: "/",
    redirect: "chat"
  }
];

const router = new Router({
  routes: [
    {
      path: "/main",
      name: "main",
      component: () => import("@/views/main.vue"),
      children: MainRouter
    },
    {
      path: "/login",
      name: "login",
      component: () => import("@/views/login.vue")
    },
    {
      path: "/register",
      name: "register",
      component: () => import("@/views/register.vue")
    },
    {
      path: "/test",
      name: "test",
      component: () => import("@/views/test.vue")
    },
    {
      path: "/",
      redirect: "/login"
    }
  ]
});
router.beforeEach((to, from, next) => {
  Vue.prototype.$Loading.start();
  next();
});

router.afterEach(route => {
  Vue.prototype.$Loading.finish();
});
export default router;
