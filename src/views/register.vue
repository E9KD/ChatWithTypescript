<template>
  <div class="login">
    <div class="login_box">
      <p class="login_title">注册</p>
      <div class="box_userinfo">
        <p class="userinfo_text">用户名</p>
        <input type="text" class="userinfo_input" placeholder="请输入用户名" v-model="registerusername">
        <p class="userinfo_p">请输入6到12位，字母数字，不能有符号</p>
      </div>
      <div class="box_userinfo">
        <p class="userinfo_text">密码</p>
        <input
          type="password"
          class="userinfo_input"
          placeholder="请输入密码"
          v-model="registeruserpassword"
        >
        <p class="userinfo_p">请输入6到12位，字母数字，不能有符号</p>
      </div>
      <div class="box_register">
        <p class="register_btn" @click="registerClick">提交</p>
      </div>
    </div>
  </div>
</template>

<script lang='ts'>
import { Vue, Component } from "vue-property-decorator";
import { Mutation } from "vuex-class";
import { test } from "@/utils/test";
@Component
export default class Register extends Vue {
  private registerusername: string = "";
  private registeruserpassword: string = "";
  @Mutation loginStateActive: any;
  registerClick() {
    let ctest = new test();
    let nametestresult = ctest.npTest(this.registerusername);
    let passwordtestresult = ctest.npTest(this.registeruserpassword);
    if (nametestresult == true && passwordtestresult == true) {
      // 符合注册规则，进行请求，看是否重复
      let ii = true;
      if (ii) {
        // ajax通过
        let time = new Date().getTime();
        let cookie_template = `userinfo={"username":"${
          this.registerusername
        }","logintime":"${time}"}`;
        document.cookie = cookie_template;
        this.loginStateActive();
        this.$router.replace("/main");
      } else {
        // ajax 没通过
        this.$Message.error("用户已经被注册");
      }
    } else {
      // 不符合注册规则
      if (nametestresult != true) {
        this.$Message.error("用户名不符合！");
      } else if (passwordtestresult != true) {
        this.$Message.error("密码不符合！");
      }
    }
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
      .userinfo_p {
        margin: 10px 10px;
        font-size: 12px;
        color: #999;
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
    }
    .box_register {
      width: 100%;
      margin-top: 15%;
      .register_btn {
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
