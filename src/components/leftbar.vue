<template>
  <div class="leftbar">
    <Tooltip content="接待中" placement="right" class="leftbar_chartnow" theme="light">
      <img :src="ishover==0?b:a" @click="goCharting" srcset class="leftbar_set">
    </Tooltip>
    <Tooltip content="已接待" placement="right" class="leftbar_chartlast" theme="light">
      <img :src="ishover==1?d:c" @click="goCharted" srcset class="leftbar_set">
    </Tooltip>
    <!-- <Tooltip content="设置" placement="right" class="leftbar_setbox" theme="light">
      <img
        :src="ishover==2?y:n"
        @click="goSet"
        @mouseover="mousein(2)"
        @mouseout="mouseout"
        alt
        srcset
        class="leftbar_set"
      >
    </Tooltip>-->
  </div>
</template>

<script lang='ts'>
import { Vue, Component, Watch } from "vue-property-decorator";
import { Mutation } from "vuex-class";

@Component({})
export default class Leftbar extends Vue {
  private ishover: number = 0;
  private isset: boolean = false;
  private y: string = require("@/assets/setactive.png");
  private n: string = require("@/assets/setnormal.png");
  private a: string = require("@/assets/chartingactive.png");
  private b: string = require("@/assets/chartingnormal.png");
  private c: string = require("@/assets/charthistoryactive.png");
  private d: string = require("@/assets/charthistorynormal.png");

  goCharting() {
    this.$router.push("/main/chat");
  }

  goCharted() {
    this.$router.push("/main/lastchat");
  }

  goSet() {
    this.$router.push("/main/set");
  }

  get routeName() {
    return this.$route.name;
  }

  created() {
    if (this.routeName == "chat") {
      this.ishover = 0;
      return;
    }
    this.ishover = 1;
  }

  @Watch("routeName")
  ChangeRouteName(x: string) {
    if (x == "chat") {
      this.ishover = 0;
    } else if (x == "lastchat") {
      this.ishover = 1;
    }
  }
}
</script>

<style lang="less" scoped>
.leftbar {
  height: 100vh;
  width: 3vw;
  display: inline-block;
  background-color: #31323d;
  position: relative;
  top: 0px;
  left: 0px;
  z-index: 99;
  .leftbar_setbox {
    position: absolute;
    bottom: 30px;
    left: 50%;
    transform: translate(-50%, 0px);
    .leftbar_set {
      width: 25px;
      height: 25px;
    }
  }
  .leftbar_chartnow {
    position: absolute;
    top: 10%;
    left: 50%;
    transform: translate(-50%, 0px);
    z-index: 99999;
    .leftbar_set {
      width: 25px;
      height: 25px;
    }
  }
  .leftbar_chartlast {
    position: absolute;
    top: 20%;
    left: 50%;
    transform: translate(-50%, 0px);
    color: black;
    z-index: 99999;
    .leftbar_set {
      width: 25px;
      height: 25px;
    }
  }
}
</style>

