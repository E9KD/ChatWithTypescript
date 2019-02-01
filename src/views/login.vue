<template>
  <div class="login">
    <div class="login_box">
      <p class="login_title">登陆</p>
      <div class="box_userinfo">
        <p class="userinfo_text">用户名</p>
        <Input placeholder="请输入用户名" v-model="username" class="userinfo_input"/>
        <p class="userinfo_p">&nbsp;</p>
      </div>
      <div class="box_userinfo">
        <p class="userinfo_text">密码</p>
        <Input type="password" placeholder="请输入密码" v-model="userpassword" class="userinfo_input"/>
        <p class="userinfo_p">&nbsp;</p>
      </div>

      <div class="box_loginbtn">
        <Button type="success" long style="background-color:#00adb5;" @click="Login">登陆</Button>
      </div>
      <Divider class="divider">更多方式登陆</Divider>
      <div class="iconBox">
        <img
          :src="wximg"
          alt
          @mouseenter="MouserEnter"
          @mouseleave="MouserLeave"
          class="wximg"
          @click="LoginWithWeChat"
        >
      </div>
      <div class="box_loginbtn">
        <Button type="success" long>注册</Button>
      </div>
    </div>
    <Modal v-model="loginDefeated" width="360">
      <p slot="header" style="color:#f60;text-align:center">
        <Icon type="ios-information-circle"></Icon>
        <span>登陆失败</span>
      </p>
      <div style="text-align:center">
        <p>登陆失败，请点击下面按钮重新登陆！</p>
      </div>
      <div slot="footer">
        <Button type="success" size="large" long @click="ReLogin">重新登陆</Button>
      </div>
    </Modal>
  </div>
</template>

<script lang='ts'>
import { Vue, Component } from "vue-property-decorator";
import { test } from "@/utils/test";
import ajax from "@/utils/ajax";
import api from "@/utils/api";
import { Mutation, State } from "vuex-class";

@Component({})
export default class Lastchat extends Vue {
  @State("userParam")
  userParam!: config.userparamTypes;
  // 获取用户参数
  @Mutation("GetUserParam")
  GetUserParam!: Function;

  private username: string = "";
  private userpassword: string = "";
  private wximg: string = require("@/assets/wxnormal.png");
  private loginDefeated: boolean = false;

  GoRegsiterPage() {
    this.$router.push("/register");
  }

  Login() {
    if (!this.username || !this.userpassword) {
      this.$Message.warning("请输入用户名和密码");
      return;
    } else {
      const ctest = new test();
      let loginusername = ctest.npTest(this.username);
      let loginuserpassword = ctest.npTest(this.userpassword);
      if (loginusername && loginuserpassword) {
        let gi: boolean = true;
        if (gi) {
          this.$Message.success("登陆成功");
          //修改cookie
          setTimeout(() => {
            document.cookie = `userinfo={"username":"${
              this.username
            }","logintime":"${new Date().getTime()}"}`;
            this.$store.commit("loginStateActive");
            this.$router.push({
              path: "/main"
            });
          }, 800);
        } else {
          this.$Message.error("用户名和密码不正确");
        }
      } else {
        if (!loginusername && !loginuserpassword) {
          this.$Message.warning(
            "用户名和密码请输入6到12位，字母数字，不能有符号"
          );
        } else {
          if (!loginusername) {
            this.$Message.warning("用户名请输入6到12位，字母数字，不能有符号");
          }
          if (!loginuserpassword) {
            this.$Message.warning("密码请输入6到12位，字母数字，不能有符号");
          }
        }
      }
    }
  }

  // 重新登录
  ReLogin() {
    window.location.href = api.LoginUrl;
  }

  MouserEnter() {
    this.wximg = require("@/assets/wxactive.png");
  }

  MouserLeave() {
    this.wximg = require("@/assets/wxnormal.png");
  }
  // 默认检测
  init() {
    setTimeout(() => {
      let url: string = window.location.href;
      if (url.indexOf("code") == -1) return;
      let code = url
        .split("?")[1]
        .split("&")[0]
        .split("=")[1];
      let TrueHero = `${api.CodeUrl}?code=${code}`;
      ajax.Get(TrueHero).then(res => {
        if (res.hasOwnProperty("errcode")) {
          this.loginDefeated = true;
          return;
        }
        this.GetUserParam(res);
        if (this.userParam.hasOwnProperty("nickname")) {
          this.$router.push("/main");
        }
      });
    }, 500);

    // if (!document.cookie) {
    //   this.SetCookie();
    // } else {
    //   let is_cookie: any = document.cookie
    //     .split(";")
    //     .map(x => x.split("="))
    //     .filter(x => x[0].replace(/\s+/g, "") == "userinfo");
    //   is_cookie.length > 0 ? this.ChangeUserName(is_cookie) : this.SetCookie();
    // }
  }

  // 修改username
  ChangeUserName(x: any) {
    this.username = JSON.parse(x[0][1]).username;
  }

  // 创建cookie
  SetCookie() {
    let userinfo = `userinfo={"username":"","logintime":""}`;
    document.cookie = userinfo;
  }

  test() {

    function change(arr:any){
      let left=0
      let right=arr.length-1
      let tip=arr[0]
      // for(let i=0;)
      // 判断比基数小的
      if(arr[right]>tip){
        
      }
      // 判断比基数大的

    }
  }

  LoginWithWeChat() {
    window.location.href = api.LoginUrl;
  }

  created() {
    this.init();
    this.test();
  }
}
</script>

<style lang="less" scoped>
.login {
  width: 100%;
  height: 100vh;
  position: relative;
  background-color: #393e46;
  .login_box {
    position: absolute;
    top: 45%;
    left: 50%;
    transform: translate(-50%, -50%);
    width: 25%;
    height: 75%;
    max-width: 400px;
    max-height: 500px;
    background-color: #ffffff;
    border-radius: 10px;
    box-shadow: 0 5px 15px rgba(0, 0, 0, 0.5);
    .divider {
      margin-top: 5%;
      font-size: 12px;
    }
    .login_title {
      margin-top: 5%;
      font-size: 30px;
      color: #00adb5;
      text-align: center;
    }
    .iconBox {
      display: flex;
      flex-flow: row nowrap;
      justify-content: center;
      align-items: center;
      .wximg {
        width: 25px;
        height: 25px;
        cursor: pointer;
      }
    }
    .box_userinfo {
      width: 70%;
      margin: 0 auto;
      margin-top: 5%;
      .userinfo_input {
        margin-top: 10px;
      }
      .userinfo_text {
        color: #00adb5;
      }
      // input {
      //   margin-top: 3%;
      //   padding-left: 10px;
      //   width: 80%;
      //   height: 4vh;
      //   line-height: 4vh;
      //   background-color: #e7e0e0;
      //   border: none;
      //   border-radius: 10px;
      // }
      .userinfo_p {
        margin: 10px 10px;
        font-size: 12px;
        color: #999;
      }
    }
    .box_register {
      width: 100%;
      margin-top: 5%;
      .register_btn {
        cursor: pointer;
        margin: 0 auto;
        text-align: center;
        width: 20%;
        height: 4vh;
        line-height: 4vh;
        font-size: 12px;
        color: #00adb5;
      }
    }
    .box_loginbtn {
      width: 70%;
      margin: 0 auto;
      margin-top: 5%;
      .loginbtn_btn {
        cursor: pointer;
        margin: 0 auto;
        text-align: center;
        width: 20%;
        height: 4vh;
        line-height: 4vh;
        font-size: 15px;
        color: white;
        border-radius: 30px;
        background-color: #00adb5;
        &:hover {
          background-color: #0a8f96;
        }
      }
    }
  }
}
</style>
