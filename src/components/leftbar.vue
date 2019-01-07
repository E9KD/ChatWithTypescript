<template>
  <div class="leftbar">
    <Tooltip content="接待中" placement="right" class="leftbar_chartnow" theme="light">
      <img
        :src="ishover==0?b:a"
        @click="goCharting"
        @mouseover="mousein(0)"
        @mouseout="mouseout"
        alt
        srcset
        class="leftbar_set"
      >
    </Tooltip>
    <Tooltip content="已接待" placement="right" class="leftbar_chartlast" theme="light">
      <img
        :src="ishover==1?d:c"
        @click="goCharted"
        @mouseover="mousein(1)"
        @mouseout="mouseout"
        alt
        srcset
        class="leftbar_set"
      >
    </Tooltip>
    <Tooltip content="设置" placement="right" class="leftbar_setbox" theme="light">
      <img
        :src="ishover==2?y:n"
        @click="goSet"
        @mouseover="mousein(2)"
        @mouseout="mouseout"
        alt
        srcset
        class="leftbar_set"
      >
    </Tooltip>
  </div>
</template>

<script lang='ts'>
import { Vue, Component } from "vue-property-decorator";
import { Mutation } from "vuex-class";

@Component
export default class Leftbar extends Vue {
  private ishover: number = 0;
  private isset: boolean = false;
  private y: string = require("@/assets/setactive.png");
  private n: string = require("@/assets/setnormal.png");
  private a: string = require("@/assets/chartingactive.png");
  private b: string = require("@/assets/chartingnormal.png");
  private c: string = require("@/assets/charthistoryactive.png");
  private d: string = require("@/assets/charthistorynormal.png");
  mousein(x: number) {
    this.ishover = x;
  }
  mouseout() {
    this.ishover = 0;
  }
  goCharting() {
    this.$router.push("/main/chart");
  }
  goCharted() {
    this.$router.push("/main/lastchart");
  }
  goSet() {
    this.$router.push("/main/set");
  }
}
</script>

<style lang="less" scoped>
.leftbar {
  height: 92vh;
  width: 3%;
  float: left;
  background-color: #393e46;
  position: relative;
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
    z-index: 99999;
    .leftbar_set {
      width: 25px;
      height: 25px;
    }
  }
}
</style>

