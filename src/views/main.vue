<template>
  <div class="main" id="main" @click="AnyClick">
    <!-- <Leftbar></Leftbar> -->
    <router-view></router-view>
  </div>
</template>

<script lang='ts'>
import Leftbar from "@/components/leftbar.vue";
import { Vue, Component } from "vue-property-decorator";
@Component({
  components: {
    Leftbar
  }
})
export default class Main extends Vue {
  AnyClick() {
    if (!this.$store.state.Loginstate) {
      this.$Message.warning("登陆状态过期，请重新登陆");
      setTimeout(() => {
        this.$router.replace("/login");
      }, 800);
    }
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
        this.$store.commit("loginStateDelete");
      }
    }, 10000);
  }
  created() {
    this.loginStateTest();
  }
}
</script>

<style>
.main {
  width: 100%;
  height: 92vh;
}
</style>
