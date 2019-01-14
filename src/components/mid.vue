<template>
  <div class="chart_colmid">
    <div class="colmid_box" v-show="talkListstate" :style="{width:(!isShowRight)?`100%`:`70%`}">
      <div class="colmid_top">
        <div class="colmid_head">
          <div class="top_title">{{talkingUsername}}</div>
          <div class="top_function">
            <p class="function_end" @click="KillTalk" v-show="isExitend">X&nbsp;&nbsp;结束接待</p>
          </div>
        </div>
        <div class="top_talk" ref="a">
          <div
            :class="item.code==1?'talk_you':'talk_mine'"
            v-for="(item,index) in talklist"
            :key="index"
            class="animated fadeIn"
          >
            <img
              :src="item.img"
              alt
              v-if="item.isimg"
              class="talklist_img"
              @dblclick="GoBig(item.img)"
            >
            <div class="talk_textbox" v-else>
              <div class="textbox_top">
                <p class="textbox_top_name">{{item.name}}</p>
                <p class="textbox_top_day">{{item.day}}</p>
                <p class="textbox_top_time">{{item.time}}</p>
              </div>
              <p :class="item.code==1?'you_p':'mine_p'">{{item.p}}</p>
            </div>
            <img :class="item.code==1?'you_img':'mine_img'" :src="item.code==1?yimg:mimg">
          </div>
        </div>·
      </div>
      <div class="colmid_mid">
        <div class="mid_up_span"></div>
        <Tooltip content="上传图片" placement="top" class="mid_up" theme="light">
          <input
            @change="handleFileChange"
            type="file"
            ref="inputer"
            class="mid_filebtn"
            accept="image/*"
          >
        </Tooltip>
        <img src="@/assets/pic.png" alt class="upfilebox">
        <Tooltip
          content="聊天记录"
          placement="top"
          class="mid_up"
          style="margin-left:20px;"
          theme="light"
        >
          <img
            src="@/assets/charthistory.png"
            class="charthistory"
            @click="GetTalkHistory"
            type="primary"
            placement="top"
          >
        </Tooltip>
        <Tooltip
          content="快捷回复"
          placement="top"
          class="mid_up"
          style="margin-left:20px;"
          theme="light"
        >
          <img
            src="@/assets/kuai.png"
            class="charthistory"
            type="primary"
            placement="top"
            @click="GetQuickReply"
          >
        </Tooltip>
      </div>
      <div class="colmid_bom">
        <textarea class="bom_textarea" v-model="text" @keyup.enter="send"></textarea>
        <button class="comit" @click="send">发送</button>
      </div>
      <div class="colmid_other">
        <div class="other_bigimg" v-if="isbigimg" id="bigimg">
          <div class="bigimg_close" @click="isbigimg = false">X</div>
          <div class="bigimg_mark" id="bigimgmark"></div>
          <img :src="bigimg" class="bigimg_img" id="bigimgImg">
        </div>
      </div>
      <div class="toggle" @click="IsShowRight">{{toggle}}</div>
    </div>
    <!-- 聊天记录抽屉 -->
    <Drawer :title="talkingUsername" :closable="false" v-model="value1" class="drawer" width="40">
      <div class="talkhistory">
        <div class="top_talk">
          <div
            :class="item.code==1?'talk_you':'talk_mine'"
            v-for="(item,index) in talklisthistory"
            :key="index"
            class="animated fadeIn"
          >
            <img
              :src="item.img"
              alt
              v-if="item.isimg"
              class="talklist_img"
              @dblclick="GoBig(item.img)"
            >
            <div class="talk_textbox" v-else>
              <div class="textbox_top">
                <p class="textbox_top_name">{{item.name}}</p>
                <p class="textbox_top_day">{{item.day}}</p>
                <p class="textbox_top_time">{{item.time}}</p>
              </div>
              <p :class="item.code==1?'you_p':'mine_p'">{{item.p}}</p>
            </div>
            <img :class="item.code==1?'you_img':'mine_img'" :src="item.code==1?yimg:mimg">
          </div>
        </div>·
      </div>
    </Drawer>
    <!-- 短语抽屉 -->
    <Drawer title="快捷短语" :closable="false" v-model="quickreplybox" class="drawer" width="40">
      <Button type="success" @click="AddQuickReply">
        <Icon type="md-add"/>添加短语
      </Button>
      <div class="quickreply_for" v-for="(item,index) in quickReplylist" :key="index">
        <p class="for_content" @click="WirteQuickReply(item.content)">{{item.content}}</p>
        <Button @click="ChangeQuickReply(item.id)" type="primary" class="for_btn">修改</Button>
        <Button @click="DeleteQuickReply(item.id)" type="error" class="for_btn">删除</Button>
      </div>
    </Drawer>
    <Right v-show="isShowRight"></Right>
    <div class="quickreply"></div>
    <!-- 修改/添加短语弹窗 -->
    <Modal
      v-model="changeAndaddReply"
      :title="modalTitle"
      @on-ok="CompleteWithChangeQuickReply"
      @on-cancel="CancelWithChangeQuickReply"
    >
      <input
        type="text"
        placeholder="随便你吧..."
        class="change_reply_input"
        v-model="changeOraddReply"
      >
    </Modal>
  </div>
</template>

<script scoped lang='ts'>
// import lrz from "lrz";
import { State, Mutation } from "vuex-class";
import { test } from "@/utils/test";
import socketMixins from "@/utils/mixins";
let Base64 = require("js-base64").Base64;
import { Vue, Component, Mixins, Watch, Prop } from "vue-property-decorator";
import Right from "@/components/right.vue";
@Component({
  components: {
    Right
  }
})
export default class Mid extends Mixins(socketMixins) {
  @Prop(String)
  pageState!: string;

  @State("talkListstate")
  talkListstate!: boolean;

  @State("talkingUsername")
  talkingUsername!: string;

  @State("newpersonMessage")
  newpersonMessage: any;

  @State("talkingUserId")
  talkingUserId!: number;

  @State("stateMessage")
  stateMessage: any;

  private modalTitle: string = "";
  private isExitend: boolean = false;
  private quickreplybox: boolean = false;
  private toggle: string = "<";
  private isShowRight: boolean = false;
  private value1: boolean = false;
  private text: string = "";
  private yimg: string = require("@/assets/all.png");
  private mimg: string = require("@/assets/active.png");
  private talklist: config.talklistTypes[] = [];
  private bigimg: string = require("@/assets/active.png");
  private isbigimg: boolean = false;
  private talklisthistory: any[] = [];
  private changeAndaddReply: boolean = false;
  private changeOraddReply: string = ""; // 添加或者修改的短语
  private changeReplyid: number = 0; // 修改短语的id
  private quickReplylist: config.quickreplyTypes[] = [
    // 短语列表
    {
      content:
        "as撒打算打算打算打算打算打算打算打算打算打算打算的as撒打算打算打算打算打算打算打算打算打算打算打算的as撒打算打算打算打算打算打算打算打算打算打算打算的",
      id: 1
    },
    {
      content: "11111",
      id: 2
    },
    {
      content: "22222",
      id: 3
    },
    {
      content: "333333",
      id: 4
    }
  ];

  // 添加短语
  AddQuickReply() {
    this.modalTitle = "添加短语";
    this.changeAndaddReply = true;
  }

  // 修改短语
  ChangeQuickReply(x: number) {
    this.modalTitle = "修改短语";
    this.changeReplyid = x;
    this.changeAndaddReply = true;
  }

  // 删除短语
  DeleteQuickReply(id: number) {
    for (let i in this.quickReplylist) {
      let i2Number: number = Number(i);
      if (this.quickReplylist[i2Number].id == id) {
        this.quickReplylist.splice(i2Number, 1);
      }
    }
  }

  // 短语修改/添加完成
  CompleteWithChangeQuickReply() {
    // 判断是添加还是修改
    if (this.modalTitle == "修改短语") {
      // 发送请求修改短语
      this.$Message.success("修改成功！");
      this.changeOraddReply = "";
    } else if (this.modalTitle == "添加短语") {
      // 添加短语
      this.$Message.success("添加成功！");
      this.changeOraddReply = "";
    }
  }

  // 短语修改取消
  CancelWithChangeQuickReply() {
    this.$Message.warning("取消修改！");
    this.changeOraddReply = "";
  }

  // 显示Right组件
  IsShowRight() {
    if (this.toggle == "<") {
      this.toggle = ">";
      this.isShowRight = true;
    } else {
      this.isShowRight = false;
      this.toggle = "<";
    }
  }

  // 结束接待
  KillTalk() {}

  // 上传图片，成功之后就发送
  handleFileChange() {}

  // handleFileChange() {
  //   let getfile:any = this.$refs.inputer.files[0];
  //   let reader = new FileReader();
  //   reader.readAsArrayBuffer(getfile);
  //   let img = new Image();
  //   reader.onload = (e:any) => {
  //     console.log(123123);
  //     let imgFile = e.target.result;
  //     lrz(getfile).then(res => {
  //       if (res.base64.length >= 2048 * 1024) {
  //         this.$Message.warning("图片太大");
  //       } else {
  //         if (imgFile.length != 0) {
  //           this.talklist.push({
  //             code: 0,
  //             isimg: true,
  //             img: res.base64
  //           });
  //           let type = `{"type":"say","to_client_id":"qwe","content":"${
  //             res.base64
  //           }","stype":"3","from_id":"199","kid":"20","to_client_name":"asd123"}`;
  //           this.ServerSendMessage(type);
  //         }
  //       }
  //     });
  //   };
  // }

  //发送，点击和回车键
  send() {
    let Test = new test();
    let text = Test.DeleteEnter(this.text);
    let testResult = Test.inputTest(text);
    if (testResult) {
      let sendText = Base64.encode(text);
      // 输入的字符发送请求,发送成功在进行展示
      let minetext = {
        p: text,
        code: 1,
        day: `${new Date().getMonth() + 1}/${new Date().getDate()}`,
        time: `${new Date().getHours()}:${new Date().getMinutes()}`,
        name: "我"
      };
      let type = `{"from_client_name":"NewPc","type":"say","to_client_id":"qwe","content":"${text}","stype":"1","from_id":"199","kid":"${
        this.talkingUserId
      }","to_client_name":"${this.talkingUsername}","room_id":"5"}`;
      this.ServerSendMessage(type);
      this.talklist.push(minetext);
      this.keepBom();
      this.text = "";
    } else {
      this.$Message.warning("请输入正确的字符");
    }
  }

  // 选择短语
  WirteQuickReply(x: string) {
    this.text = x;
    this.quickreplybox = false;
  }

  // 保持对话最后
  keepBom() {
    setTimeout(() => {
      let b: any = this.$refs.a;
      b.scrollTop = b.scrollHeight;
    }, 10);
  }

  // 选择快捷回复
  GetQuickReply() {
    this.quickreplybox = true;
  }

  // 放大图片
  GoBig(x: string) {
    this.isbigimg = true;
    this.bigimg = x;
  }

  // 关闭图片
  ClickBodyCloseImg() {
    let body: any = document.querySelector("body");
    body.addEventListener("click", (e: any) => {
      if (e.target.id == "bigimgmark" || e.target.id == "bigimgImg") {
        return;
      } else {
        this.isbigimg = false;
      }
    });
  }

  //聊天记录
  GetTalkHistory() {
    this.value1 = true;
    //看是否本地有记录，有级放上去
    let session: string | null = sessionStorage.getItem(this.talkingUsername);
    if (!session) {
      return;
    } else {
      this.talklisthistory = JSON.parse(session);
    }
  }

  // 获取信息
  get GetMessage() {
    return this.stateMessage;
  }

  // 结束接待不同页面实现
  ShowEnd() {
    this.pageState == "chat"
      ? (this.isExitend = true)
      : (this.isExitend = false);
  }

  created() {
    this.ClickBodyCloseImg();
    this.ShowEnd()
  }

  beforeDestory() {
    this.LoginOut();
  }

  // 添加聊天
  @Watch("GetMessage")
  ChangeGetMessage() {
    let template = {
      p: this.GetMessage.content,
      code: 1,
      day: `${new Date().getMonth() + 1}/${new Date().getDate()}`,
      time: `${new Date().getHours()}:${new Date().getMinutes()}`
    };
    this.talklist.push(template);
    this.keepBom();
  }

  // 监听对话列表
  @Watch("talklist")
  ChangeTalklist(x: any) {
    // 每次该改变就是进行了对话，保存在session中。
    if (x.length > 0) {
      let talklistSession: string = JSON.stringify(x);
      let id2String: string = this.talkingUserId.toString();
      sessionStorage.setItem(id2String, talklistSession);
    }
  }

  // 监听切换的对话框
  @Watch("talkingUserId")
  ChangeTalkingUserId(x: any) {
    // 判断是否有聊天记录，修改聊天列表
    let session_item: string | null = sessionStorage.getItem(x);
    if (session_item) {
      this.talklist = JSON.parse(session_item);
    } else {
      this.talklist = [];
    }
    this.keepBom();
  }
}
</script>

<style scoped lang="less">
.chart_colmid {
  overflow: hidden;
  height: 100%;
  width: 80%;
  display: inline-block;
  position: relative;
  background-color: #f7f7f7;
}

.colmid_box {
  width: 70%;
  height: 100%;
  overflow: hidden;
  background-color: #f5f5f5;
  box-shadow: 0 0 20px #999;
  position: relative;
  float: left;
}
.toggle {
  position: absolute;
  top: 50%;
  right: 0;
  transform: translate(0, -50%);
  font-size: 15px;
  padding: 5px 3px;
  background-color: #999;
  color: white;
}
.colmid_top {
  height: 70%;
  overflow: hidden;
}

.colmid_mid {
  height: 10%;
  position: relative;
  border-top: 1px solid #e6e6e6;
  padding-top: 10px;
}

.colmid_bom {
  height: 20%;
  position: relative;
}

.top_talk {
  height: 90%;
  overflow: auto;
}

.top_title {
  padding: 10px 30px;
  font-size: 15px;
  float: left;
  font-weight: bold;
}
.colmid_head {
  width: 100%;
  overflow: hidden;
  border-bottom: 1px solid #e6e6e6;
  background-color: #f7f7f7;
}
.top_function {
  padding: 10px 30px;
  float: right;
}
.function_end {
  &:hover {
    color: #00adb5;
    cursor: pointer;
  }
}
.talk_mine {
  float: right;
  margin: 10px 10px;
  clear: both;
}

.talk_you {
  float: left;
  margin: 10px 10px;
  clear: both;
}

.mine_img {
  float: right;
  width: 40px;
  height: 40px;
  vertical-align: middle;
  margin: 10px;
}

.mine_p {
  display: inline-block;
  vertical-align: middle;
  margin: 5px;
  background-color: #dbe2ef;
  padding: 10px 20px;
  border-radius: 5px;
}

.you_img {
  float: left;
  width: 40px;
  height: 40px;
  vertical-align: middle;
  margin: 10px;
}

.you_p {
  display: inline-block;
  vertical-align: middle;
  margin: 5px;
  background-color: #dbe2ef;
  padding: 10px 20px;
  border-radius: 5px;
}

.btn {
  margin-left: 30px;
  width: 60px;
  height: 30px;
}

.bom_textarea {
  width: 100%;
  height: 100%;
  outline: none;
  resize: none;
  padding: 10px 10px;
  background-color: #f5f5f5;
  border: none;
}

.comit {
  position: absolute;
  bottom: 10%;
  right: 5%;
  width: 6vw;
  height: 4vh;
  border-radius: 20px;
  line-height: 4vh;
  background-color: #00adb5;
  &:hover {
    background-color: #0a8f96;
  }
  color: white;
}

.talklist_img {
  width: 48px;
  height: 48px;
}

.mid_up {
  height: 30px;
  width: 30px;
  display: inline-block;
  cursor: pointer;
}

.mid_up2 {
  height: 25px;
  display: inline-block;
  margin-left: 30px;
  position: relative;
}

.mid_up_tip {
  position: absolute;
  top: 0px;
  left: 0px;
  width: 30px;
  height: 30px;
}

.charthistory {
  width: 30px;
  height: 30px;
  padding: 5px 5px;
  border-radius: 10px;
  background-color: #00adb5;
  &:hover {
    background-color: #0a8f96;
  }
  cursor: pointer;
}

.mid_imgbtn {
  position: absolute;
  left: 40%;
  top: 50%;
  transform: translate(-20%, -50%);
  width: 30px;
  height: 25px;
  opacity: 0;
  z-index: 99;
  overflow: hidden;
}

.upimgbox {
  z-index: 1;
  position: absolute;
  left: 40%;
  top: 50%;
  transform: translate(-20%, -50%);
  width: 30px;
  height: 30px;
  padding: 5px 5px;
  border-radius: 10px;
  background-color: #00adb5;
  &:hover {
    background-color: #0a8f96;
  }
}

.mid_filebtn {
  opacity: 0;
  width: 30px;
  height: 30px;
  overflow: hidden;
  padding: 10px;
  z-index: 99;
  position: relative;
  cursor: pointer;
}

.upfilebox {
  position: absolute;
  top: 10px;
  left: 50px;
  z-index: 1;
  width: 30px;
  height: 30px;
  padding: 5px 5px;
  border-radius: 10px;
  background-color: #00adb5;
  &:hover {
    background-color: #0a8f96;
  }
  cursor: pointer;
}

.mid_up_span {
  width: 50px;
  display: inline-block;
}

.other_bigimg {
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  width: 80%;
  height: 80%;
}

.bigimg_close {
  width: 30px;
  height: 30px;
  border-radius: 20px;
  color: white;
  position: absolute;
  top: 5%;
  right: 5%;
  z-index: 6;
  font-size: 20px;
  line-height: 30px;
  text-align: center;
}

.bigimg_close:hover {
  color: black;
  background-color: white;
}

.bigimg_mark {
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  z-index: 2;
  background-color: black;
  opacity: 0.6;
  height: 100%;
  width: 100%;
}

.bigimg_img {
  z-index: 5;
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  display: block;
  max-width: 100%;
  max-height: 100%;
}
.textbox_top_name {
  display: inline-block;
  color: #999;
}
.textbox_top_day {
  display: inline-block;
  color: #999;
  margin-left: 5px;
}

.textbox_top_time {
  display: inline-block;
  margin-left: 5px;
  color: #999;
}

.talk_textbox {
  display: inline-block;
}

.drawer {
  width: 40%;
}
.quickreply_for {
  overflow: hidden;
  padding: 20px 0px;
  border-bottom: 1px solid #e6e6e6;
  .for_content {
    float: left;
    width: 70%;
    padding: 10px;
    &:hover {
      background-color: #e6e6e6;
    }
  }
  .for_btn {
    float: right;
    margin-right: 10px;
  }
}
.change_reply_input {
  width: 100%;
  padding-left: 10px;
  height: 30px;
}
</style>
