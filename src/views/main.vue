<template>
  <div class="main" id="main" @click="AnyClick">
    <Top></Top>
    <Leftbar></Leftbar>
    <keep-alive>
      <router-view></router-view>
    </keep-alive>
  </div>
</template>

<script lang='ts'>
import { Vue, Component, Mixins } from "vue-property-decorator";
import { socket } from "@/utils/socket";
import socketMixins from "@/utils/mixins";
import { Mutation } from "vuex-class";
@Component({
  components: {
    'Leftbar':()=>import('@/components/leftbar.vue'),
    'Top':()=>import ('@/components/top.vue')
  }
})
export default class Main extends Mixins(socketMixins) {
  @Mutation("loginStateDelete") loginStateDelete!: Function;

  private loginData: string = "";

  InitSocket() {
    this.loginData = `{"type":"init","name":"NewPc","group":"1","uid":"199","kid":"KF2","avatar":"${this.$store.state.userParam}"}`;
    this.newsocket.SocketOpen(this.loginData);
    this.newsocket.ListenMessage();
  }

  AnyClick() {
    // if (!this.$store.state.Loginstate) {
    //   this.$Message.warning("登陆状态过期，请重新登陆");
    //   setTimeout(() => {
    //     this.$router.replace("/login");
    //   }, 800);
    // }
  }

  // 登陆状态测试
  loginStateTest() {
    setInterval(() => {
      let is_cookie = document.cookie
        .split(";")
        .map(x => x.split("="))
        .filter(x => x[0].replace(/\s+/g, "") == "userinfo");
      if (
        new Date().getTime() - JSON.parse(is_cookie[0][1]).logintime >=
        60 * 60 * 1000
      ) {
        this.loginStateDelete();
      }
    }, 10000);
  }
  created() {
    this.loginStateTest();
    this.InitSocket();
  }
}
</script>

<style>
.main {
  width: 100vw;
  height: 100vh;
  overflow: hidden;
}
</style>
