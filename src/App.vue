<template>
  <div id="app">
    <router-view></router-view>
    <!-- <Start></Start>-->
  </div>
</template>

<script lang="ts">
import { Vue, Component } from "vue-property-decorator";
import Start from "@/components/start.vue";
import { con } from "@/utils/test.ts";
import { State, Mutation } from "vuex-class";

@Component({
  components: {
    Start
  }
})
export default class App extends Vue {
  @Mutation("loginStateDelete")
  loginStateDelete: any;

  @Mutation("loginStateActive")
  loginStateActive: any;

  clearModule() {
    this.loginStateDelete();
    this.$router.push("/");
  }

  init() {
    // 查看存在userinfo
    if (document.cookie) {
      let is_cookie = document.cookie
        .split(";")
        .map(x => x.split("="))
        .filter(x => x[0].replace(/\s+/g, "") == "userinfo");
      // 超过登陆时间
      if (
        new Date().getTime() - JSON.parse(is_cookie[0][1]).logintime >=
        60 * 60 * 1000
      ) {
        this.clearModule();
      } else {
        //  没有超出时间
        console.log(`没有超出登陆时间`);
        this.loginStateActive();
      }
    } else {
      // 如果原来没有登陆过
      this.$router.push("/");
    }
  }

  Egg() {
    let m = new con();
    m.c();
  }

  created() {
    this.init();
    this.Egg();
  }
}
</script>

<style lang="less">
#app {
  font-family: "Avenir", Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  color: #2c3e50;
}
.gray {
  -webkit-filter: grayscale(100%);
  -moz-filter: grayscale(100%);
  -ms-filter: grayscale(100%);
  -o-filter: grayscale(100%);

  filter: grayscale(100%);

  filter: gray;
}
</style>
