<template>
  <div class="chart_colleft">
    <div class="list_box">
      <!-- <div class="list_hover" id="hover"></div> -->
      <div
        class="colleft_list"
        :class="[ischoose==item.client_name?'ischoose':'nochoose',item.isOnline?'':'gray']"
        @mouseenter="this.cur = index"
        @mouseleave="this.cur = 999"
        @click="ChangeTalkUser(item.client_name)"
        v-for="(item,index) in talkhistorylist"
        :key="index"
      >
        <img :src="item.avatarUrl" class="colleft_img gray">
        <p class="colleft_p">{{item.client_name}}</p>
        <p class="colleft_time">{{item.lastTalktime}}</p>
      </div>
    </div>
  </div>
</template>

<script lang='ts'>
import { Vue, Component } from "vue-property-decorator";
import { Mutation } from "vuex-class";

@Component({})
export default class Lastchat extends Vue {
  @Mutation("talkingUserState")
  talkingUserState!: Function;

  private ischoose: string = "";
  private cur: number = 999;
  private talkhistorylist: config.historytalklistTypes[] = [
    // 这个就是请求过来的
    {
      avatarUrl: require("@/assets/active.png"),
      client_name: "asdasd",
      lastTalktime: "09/10 20:01",
      isOnline: true
    },
    {
      avatarUrl: require("@/assets/all.png"),
      client_name: "123123",
      lastTalktime: "09/10 20:01",
      isOnline: true
    },
    {
      avatarUrl: require("@/assets/all.png"),
      client_name: "呜呜呜呜呜",
      lastTalktime: "09/10 20:01",
      isOnline: false
    },
    {
      avatarUrl: require("@/assets/all.png"),
      client_name: "亲亲亲亲亲",
      lastTalktime: "09/10 20:01",
      isOnline: false
    }
  ];

  // 点击修改对话对象
  ChangeTalkUser(x: string, y: number) {
    this.ischoose = x;
    let listTemp = {
      name: x,
      id: y
    };
    this.talkingUserState(listTemp);
  }
}
</script>

<style scoped lang='less'>
.chart_colleft {
  height: 100%;
  overflow: auto;
  width: 20%;
  border-right: 1px solid #393e46;
  background-color: #ebebeb;
  display: inline-block;
}

.colleft_list {
  width: 100%;
  height: 12vh;
  display: flex;
  flex-flow: row wrap;
  justify-content: space-between;
  align-items: center;
  &:hover {
    background-color: #dbdbdb;
  }
}

.colleft_time {
  margin-right: 10px;
  color: #999;
}
.list_box {
  display: flex;
  flex-flow: column nowrap;
}

.colleft_img {
  width: 6vh;
  height: 6vh;
  margin-left: 5px;
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
  background-color: #dbdbdb;
}

.list_hover {
  position: absolute;
  top: 0px;
  left: 0px;
  width: 100%;
  height: 0px;
  background: url("/src/assets/bg.png") center center no-repeat;
  transition: top 0.3s, height 0.3s;
}
</style>

