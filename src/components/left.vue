<template>
  <div class="chart_colleft">
    <!-- <Queue></Queue> -->
    <div class="list_box">
      <div class="list_hover" id="hover"></div>
      <div
        class="colleft_list"
        :class="[ischoose==item.client_name?a:b]"
        @click="goChartList(item.client_name,item.uid,index)"
        @mouseenter="MouseIn(index)"
        @mouseleave="MouseOut(index)"
        v-for="(item,index) in talkingpersonlist"
        :key="index"
      >
        <div
          class="colleft_close"
          v-show="cur==index?t:f||ischoose==item.client_name?t:f"
          @click.stop="Closelist(index)"
        >结束</div>
        <div class="demo-avatar-badge colleft_img">
          <Badge :count="item.messagecount">
            <Avatar shape="square" :src="item.img"/>
          </Badge>
        </div>
        <!-- <img :src="item.img" class="colleft_img"> -->
        <p class="colleft_p">{{item.client_name}}</p>
        <p class="colleft_p1">{{item.content}}</p>
      </div>
    </div>
  </div>
</template>

<script lang='ts'>
import Queue from "@/components/queue.vue";
import { State, Mutation } from "vuex-class";
import { Vue, Component, Watch } from "vue-property-decorator";
import {LoginInfo} from '@/store/types'
@Component({
  components: {
    Queue
  }
})
export default class Left extends Vue {
  @State chartroom_logininfo!: LoginInfo[];
  @State nextpersonmeg: any;
  @State talklistnumber: any;
  @State talknumbertop: any;
  @State talkingUsername: any;
  @State talkingUserId: any;
  @State stateMessage: any;
  @Mutation changeTalkListNumber: any;
  @Mutation talkingUserStateClose: any;
  @Mutation talkingUserState: any;

  private cur: number = 999;
  private t: boolean = true;
  private f: boolean = false;
  private s: string = "enter";
  private h: string = "leave";
  private ischoose: string = "";
  private a: string = "ischoose";
  private b: string = "nochoose";
  private hover: any = document.getElementById("hover");
  private talkingpersonlist: any = [
    // {
    //   img: require("../../../../assets/active.png"),
    //   personname: "111",
    //   messagecount: 4
    // }
  ];
  init() {}
  // 切换对话框
  goChartList(x: string, id: number, index: number) {
    let a = {
      name: x,
      id: id
    };
    this.talkingUserState(a);
    this.ischoose = x;
    this.talkingpersonlist[index].messagecount = 0;
  }
  // 关闭列表
  Closelist(x: number) {
    this.talkingpersonlist.splice(x, 1);
    this.talkingUserStateClose();
  }
  MouseIn(x: number) {
    this.cur = x;
    // this.hover.style.height = 12 + "vh";
    // this.hover.style.top = 12 * x + "vh";
  }
  MouseOut() {
    this.cur = 999;
    // this.hover.style.height = 0 + "vh";
  }
  // 修改正在接待的人数
  changeTalklistnum() {
    let talklistlength = this.talkingpersonlist.length;
    this.changeTalkListNumber(talklistlength);
  }
  // 添加对话框
  ChangeTalkList() {
    interface LoginInfo{
      x:any
    }
    this.talkingpersonlist = [];
    if(!this.chartroom_logininfo){
      return
    }else{
      let list=[
        {
          img:1,messagecount:2
        }
      ]
      this.chartroom_logininfo.forEach(item => {
      item.img = require("@/assets/active.png");
      item.messagecount = 1;
      this.talkingpersonlist.push(item);
    });
    }
  }

  get changeMessage() {
    return this.stateMessage;
  }
  created() {
    this.changeTalklistnum();
  }
  // 监听房间内人数
  @Watch("chartroom_logininfo")
  ChangeChartroom_logininfo() {
    this.ChangeTalkList();
  }
  // 监听获取的消息
  @Watch("changeMessage")
  ChangeChangeMessage() {
    for (let i in this.talkingpersonlist) {
      if (this.talkingpersonlist[i].uid == this.changeMessage.from_id) {
        let list = JSON.parse(JSON.stringify(this.talkingpersonlist[i]));
        // 判断对话id和消息id是否相等
        if (this.talkingUserId != this.changeMessage.from_id) {
          // 不相等加1
          list.messagecount += 1;
        }
        list.content = this.changeMessage.content;
        this.talkingpersonlist.splice(i, 1, list);
        break;
      }
    }
  }
  @Watch("talkingpersonlist")
  ChangeTalkingpersonlist() {
    this.changeTalklistnum();
  }
  // 改变说明添加了下一个人
  @Watch("nextpersonmeg")
  ChangeNextpersonmeg(x: any) {
    if (this.talkingpersonlist.length >= this.talknumbertop) {
      this.$Message.warning(`最多接待${this.talknumbertop}位,勇士请继续加油！`);
    } else {
      this.talkingpersonlist.push(x);
    }
  }
}
</script>

<style scoped lang='less'>
.chart_colleft {
  height: 92vh;
  overflow: auto;
  width: 17%;
  float: left;
  border-right: 1px solid #393e46;
  background-color: #eeeeee;
  position: relative;
}

.list_box {
  position: relative;
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
  width: 100%;
  vertical-align: middle;
  text-align: center;
  position: absolute;
  top: 50%;
  left: 60%;
  transform: translate(-50%, -50%);
}
.colleft_p1 {
  position: absolute;
  bottom: 0px;
  left: 60%;
  transform: translate(-50%, -50%);
  text-align: center;
  font-size: 1rem;
  color: #00adb5;
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
  color: #eeeeee;
  box-shadow: 0 0 20px #222831;
}

.leave {
  color: black;
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
  background: url(`/src/assets/bg.png`) center center no-repeat;
  transition: top 0.3s, height 0.3s;
}
</style>
