<template>
  <div class="login">
    <div class="login_box">
      <p class="login_title">登陆</p>
      <div class="box_userinfo">
        <p class="userinfo_text">用户名</p>
        <input type="text" class="userinfo_input" placeholder="请输入用户名" v-model="username">
        <p class="userinfo_p">&nbsp;</p>
      </div>
      <div class="box_userinfo">
        <p class="userinfo_text">密码</p>
        <input type="password" class="userinfo_input" placeholder="请输入密码" v-model="userpassword">
        <p class="userinfo_p">&nbsp;</p>
      </div>
      <div class="box_register">
        <p class="register_btn" @click="goRegsiterPage()">立刻注册</p>
      </div>
      <div class="box_loginbtn">
        <p class="loginbtn_btn" @click="login">登陆</p>
      </div>
    </div>
  </div>
</template>

<script lang='ts'>
import { Vue, Component } from "vue-property-decorator";
import { test } from "@/utils/test.ts";
@Component
export default class Lastchat extends Vue {
  private gi: boolean = true;
  private username: string = "";
  private userpassword: string = "";
  private name: string = `song`;
  private lastName: string = `zhen`;
  private index: number = 0;
  private a: number = 123;
  private node: any = {
    a: 1,
    xia: function() {
      console.log(this.a + 1);
    }
  };
  goRegsiterPage() {
    this.$router.push("/register");
  }
  login() {
    if (!this.username || !this.userpassword) {
      this.$Message.warning("请输入用户名和密码");
      return;
    } else {
      const ctest = new test();
      let loginusername = ctest.npTest(this.username);
      let loginuserpassword = ctest.npTest(this.userpassword);
      if (loginusername && loginuserpassword) {
        if (this.gi) {
          this.$Message.success("登陆成功");
          //修改cookie
          setTimeout(() => {
            document.cookie = `userinfo={"username":"${
              this.username
            }","logintime":"${new Date().getTime()}"}`;
            this.$store.commit("loginStateActive");
            this.$router.push("/main");
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
  // 默认检测
  init() {
    if (!document.cookie) {
      this.SetCookie();
    } else {
      let is_cookie: any = document.cookie
        .split(";")
        .map(x => x.split("="))
        .filter(x => x[0].replace(/\s+/g, "") == "userinfo");
      is_cookie.length > 0 ? this.ChangeUserName(is_cookie) : this.SetCookie();
    }
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
  test() {}
  created() {
    this.init();
    this.test();
  }
}
</script>

<style lang="less" scoped>
.login {
  width: 100%;
  height: 92vh;
  position: relative;
  background-color: #393e46;
  .login_box {
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    width: 30%;
    height: 80%;
    max-width: 400px;
    max-height: 500px;
    background-color: #eeeeee;
    border-radius: 30px;
    .login_title {
      margin-top: 10%;
      font-size: 30px;
      color: #00adb5;
      text-align: center;
    }
    .box_userinfo {
      margin-top: 10%;
      margin-left: 15%;
      .userinfo_text {
        color: #00adb5;
      }
      input {
        margin-top: 3%;
        padding-left: 10px;
        width: 80%;
        height: 4vh;
        line-height: 4vh;
        background-color: #e7e0e0;
        border: none;
        border-radius: 10px;
      }
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
      width: 100%;
      margin-top: 10%;
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
