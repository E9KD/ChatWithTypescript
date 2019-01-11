<template>
  <div class="top">
    <div class="top_box">
      <img class="box_img gray" src="../assets/logo.jpeg" alt>
      <p class="box_p">比尔高</p>
      <!-- <p class="box_loginout" v-if="Loginstate" @click="loginOut">登出</p>
      <p class="box_login" @click="goLogin('/login')" v-if="!Loginstate">登陆</p>
      <p class="box_register" @click="goLogin('/register')" v-if="!Loginstate">注册</p>-->
    </div>
  </div>
</template>

<script lang='ts'>
import { Vue, Component } from "vue-property-decorator";
import { State, Mutation } from "vuex-class";
@Component({})
export default class Top extends Vue {
  @State("Loginstate") Loginstate: any;
  @Mutation("loginStateDelete") loginStateDelete: any;
  private theme1: string = "light";
  loginOut() {
    this.loginStateDelete();
    this.$router.push("/login");
  }
  goLogin(x: string) {
    this.$router.push(x);
  }
  goRegister(x: string) {
    this.$router.push(x);
  }
}
</script>

<style scoped lang='less'>
.top {
  height: 8vh;
  width: 100vw;
  background-color: #e1e1e6;
  position: absolute;
  top: 0px;
  left: 0px;
  z-index: 20;
}
.top_box {
  width: 90%;
  margin: 0 auto;
  position: relative;
}
.box_img {
  width: 40px;
  height: 40px;
  display: inline-block;
  vertical-align: middle;
  line-height: 8vh;
  border-radius: 30px;
}
.box_p {
  display: inline-block;
  font-size: 15px;
  vertical-align: middle;
  margin-left: 30px;
  line-height: 8vh;
}
.box_login {
  position: absolute;
  top: 50%;
  right: 7%;
  transform: translate(-50%, -50%);
  line-height: 30px;
  vertical-align: middle;
  color: white;
  border-radius: 30px;
  background-color: #00adb5;
  height: 30px;
  width: 60px;
  text-align: center;
  border-radius: 20px;
  &:hover {
    background-color: #0a8f96;
    color: white;
    cursor: pointer;
  }
}
.box_register {
  position: absolute;
  top: 50%;
  right: 0px;
  transform: translate(-50%, -50%);
  line-height: 30px;
  vertical-align: middle;
  color: white;
  border-radius: 30px;
  background-color: #00adb5;
  height: 30px;
  width: 60px;
  text-align: center;
  border-radius: 20px;
  &:hover {
    background-color: #0a8f96;
    color: white;
    cursor: pointer;
  }
}
.box_loginout {
  position: absolute;
  top: 50%;
  right: 0px;
  transform: translate(-50%, -50%);
  line-height: 30px;
  vertical-align: middle;
  color: white;
  border-radius: 30px;
  background-color: #00adb5;
  height: 30px;
  width: 60px;
  text-align: center;
  border-radius: 20px;
  &:hover {
    background-color: #0a8f96;
    color: white;
    cursor: pointer;
  }
}
</style>
