<template>
  <div class="chart_colleft">
    <div class="list_box">
      <div class="list_hover" id="hover"></div>
      <div
        class="colleft_list"
        :class="[ischoose==item.personname?a:b]"
        @mouseenter="mousein(index)"
        @mouseleave="mouseout(index)"
        @click="this.ischoose=item.personname"
        v-for="(item,index) in talkhistorylist"
        :key="index"
      >
        <img :src="item.img" class="colleft_img">
        <p class="colleft_p">{{item.personname}}</p>
      </div>
    </div>
  </div>
</template>

<script lang='ts'>
import { Vue, Component } from "vue-property-decorator";
@Component
export default class Lastchat extends Vue {
  private ischoose: boolean = false;
  private cur: number = 999;
  private s: string = "enter";
  private h: string = "leave";
  private a: string = "ischoose";
  private b: string = "nochoose";
  private hover: any = document.getElementById("hover");
  // 这个就是请求过来的
  private talkhistorylist: any = [
    {
      img: require("@/assets/active.png"),
      personname: "asdasd"
    },
    {
      img: require("@/assets/all.png"),
      personname: "123123"
    },
    {
      img: require("@/assets/all.png"),
      personname: "呜呜呜呜呜"
    },
    {
      img: require("@/assets/all.png"),
      personname: "亲亲亲亲亲"
    }
  ];
  mousein(x: number) {
    this.cur = x;

    this.hover.style.height = 12 + "vh";
    this.hover.style.top = 12 * x + "vh";
  }
  mouseout(x: number) {
    this.cur = 999;
    this.hover.style.height = 0 + "vh";
  }

  created() {}
}
</script>

<style scoped lang='less'>
.chart_colleft {
  height: 92vh;
  overflow: auto;
  width: 17%;
  border-right: 1px solid #393e46;
  background-color: #eeeeee;
  display: inline-block;
}

.colleft_list {
  width: 100%;
  height: 12vh;
  position: relative;
  &:hover {
    color: #eeeeee;
  }
}

.colleft_p {
  margin-left: 30px;
  vertical-align: middle;
  position: absolute;
  top: 50%;
  left: 40%;
  transform: translate(-50%, -50%);
}

.list_box {
  position: relative;
}

.colleft_img {
  width: 6vh;
  height: 6vh;
  position: absolute;
  top: 50%;
  left: 20%;
  transform: translate(-50%, -50%);
}

.colleft_close {
  height: 30px;
  position: absolute;
  top: 50%;
  right: 10px;
  transform: translate(0px, -50%);
  padding: 5px 15px;
  border-radius: 8px;
  line-height: 20px;
  color: black;
  background-color: white;
  &:hover {
    color: white;
    background-color: #00adb5;
    cursor: pointer;
  }
}

.enter {
  background-color: #393e46;
  color: #eeeeee;
  box-shadow: 0 0 20px #222831;
}

.leave {
  background-color: #eeeeee;
}

.ischoose {
  color: #eeeeee;
  background-color: #393e46;
  box-shadow: 0 0 20px #222831;
}

.list_hover {
  position: absolute;
  top: 0px;
  left: 0px;
  width: 100%;
  height: 0px;
  background: url('/src/assets/bg.png') center center no-repeat;
  transition: top 0.3s, height 0.3s;
}
</style>

