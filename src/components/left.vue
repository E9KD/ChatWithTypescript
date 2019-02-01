<template>
  <div class="chart_colleft">
    <!-- <Queue></Queue> -->
    <div class="list_box">
      <div
        class="colleft_list"
        :class="ischoose==item.client_name?'ischoose':'nochoose'"
        @click="goChartList(item.client_name,item.uid,index)"
        @mouseenter="MouserEnter(index)"
        @mouseleave="MouserLeave"
        v-for="(item,index) in talkingpersonlist"
        :key="index"
      >
        <div
          class="colleft_close"
          :class="(cur==index||ischoose==item.client_name)?'nnn':'mmm'"
          @click.stop="Closelist(index)"
        >X</div>
        <div class="demo-avatar-badge colleft_img">
          <Poptip trigger="hover" placement="right" width="300">
            <div slot="content">
              <Avatar :src="item.avatarUrl"/>
              <Divider/>
              <div>
                <p class="person_tip_name person_tip_name_fade">姓名</p>
                <p class="person_tip_name">{{item.client_name}}</p>
              </div>
              <div>
                <p class="person_tip_name person_tip_name_fade">备注</p>
                <p class="person_tip_name">{{item.client_name}}</p>
              </div>
              <div>
                <p class="person_tip_name person_tip_name_fade">标签</p>
                <p class="person_tip_name">{{item.client_name}}</p>
              </div>
            </div>
            <Badge :count="item.messagecount">
              <Avatar shape="square" :src="item.avatarUrl" style="width:5vh;height:5vh;"/>
            </Badge>
          </Poptip>
        </div>
        <div class="name_content">
          <div class="colleft_p">{{item.client_name}}</div>
          <div class="colleft_p1">{{item.content}}</div>
        </div>
        <p class="colleft_time">{{item.time}}</p>
      </div>
    </div>
  </div>
</template>

<script lang='ts'>
import { State, Mutation } from "vuex-class";
import { Vue, Component, Watch } from "vue-property-decorator";
import { login_user_info } from "@/mock/logininfo";
@Component({})
export default class Left extends Vue {
  @State("chartroom_logininfo")
  chartroom_logininfo?: config.LoginInfo[];

  @State("nextpersonmeg")
  nextpersonmeg: any;

  @State("talklistnumber")
  talklistnumber!: number;

  @State("talknumbertop")
  talknumbertop!: number;

  @State("talkingUsername")
  talkingUsername?: string;

  @State("talkingUserId")
  talkingUserId!: number;

  @State("stateMessage")
  stateMessage?: any;

  @Mutation("changeTalkListNumber")
  changeTalkListNumber!: Function;

  @Mutation("talkingUserStateClose")
  talkingUserStateClose!: Function;

  @Mutation("talkingUserState")
  talkingUserState!: Function;

  private timer: any;
  private list: number[] = [];
  private isOnline: boolean = true;
  private ischoose: string = "";
  private cur: number = 999;
  private talkingpersonlist: config.LoginInfo[] = [];

  // 切换对话框
  goChartList(x: string, id: number, index: number) {
    let a = {
      name: x,
      id: id
    };
    console.log(x, id, index);
    this.talkingUserState(a);
    this.ischoose = x;
    this.talkingpersonlist[index].messagecount = 0;
  }
  // 鼠标进入
  MouserEnter(x: number) {
    this.cur = x;
  }
  // 鼠标推出
  MouserLeave() {
    this.cur = 999;
  }
  // 关闭列表
  Closelist(x: number) {
    this.talkingpersonlist.splice(x, 1);
    this.talkingUserStateClose();
  }

  // 修改正在接待的人数
  ChangeTalkListNumber() {
    let talklistlength: number = this.talkingpersonlist.length;
    this.changeTalkListNumber(talklistlength);
  }

  // 添加对话框
  ChangeTalkList() {
    this.talkingpersonlist = [];
    if (!this.chartroom_logininfo) {
      return;
    } else {
      this.chartroom_logininfo.forEach(item => {
        // 只是测试使用，正常情况已经获取到头像了
        item.avatarUrl = require("@/assets/active.png");
        item.messagecount = 1;
        this.talkingpersonlist.push(item);
      });
    }
  }

  get changeMessage() {
    return this.stateMessage;
  }

  created() {
    this.ChangeTalkListNumber();
    // this.talkingpersonlist = login_user_info;
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
        this.talkingpersonlist.splice(Number(i), 1, list);
        break;
      }
    }
  }

  // 监听正在聊天的人数
  @Watch("talkingpersonlist")
  ChangeTalkingpersonlist() {
    this.ChangeTalkListNumber();
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
  height: 100%;
  overflow: auto;
  width: 20%;
  float: left;
  background-color: #ebebeb;
}

.colleft_list {
  width: 100%;
  height: 12vh;
  background-color: #ebebeb;
  display: flex;
  flex-flow: row nowrap;
  justify-content: left;
  align-items: center;
  &:hover {
    background-color: #dbdbdb;
  }
}
.name_content {
  flex-grow: 2;
}
.colleft_p {
  color: black;
  display: block;
}
.colleft_p1 {
  display: block;
  font-size: 1rem;
  color: #00adb5;
}
.colleft_time {
  flex-grow: 1;
  font-size: 12px;
  color: #999;
}
.colleft_img {
  display: flex;
  flex-flow: row nowrap;
  align-items: center;
  width: 6vh;
  height: 6vh;
  flex-grow: 1;
  &:hover {
    cursor: pointer;
  }
}

.colleft_close {
  flex-grow: 1;
  width: 20px;
  height: 20px;
  line-height: 20px;
  text-align: center;
  border-radius: 100%;
  &:hover {
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
  background-color: #dbdbdb;
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
.nnn {
  color: black;
}
.mmm {
  color: #ebebeb;
}
</style>
