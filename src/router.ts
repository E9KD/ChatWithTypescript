import Vue from "vue";
import Router from "vue-router";
import Login from "@/views/login.vue";
import Main from "@/views/main.vue";
import Register from "@/views/register.vue";
import chat from "@/views/chat.vue";
import Set from "@/views/set.vue";
import Lastchat from "@/views/lastchat.vue";
import Test from "@/views/test.vue";

Vue.use(Router); 

const MainRouter = [
  {
    path: "chat",
    name: "chat",
    component: chat
  },
  {
    path: "set",
    name: "set",
    component: Set
  },
  {
    path: "lastchat",
    name: "lastchat",
    component: Lastchat
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
      component: Main,
      children: MainRouter
    },
    {
      path: "/login",
      name: "login",
      component: Login
    },
    {
      path: "/register",
      name: "register",
      component: Register
    },
    {
      path: "/",
      redirect: "login"
    },
    {
      path: "/test",
      name: "test",
      component: Test
    }
  ]
});
export default router;
