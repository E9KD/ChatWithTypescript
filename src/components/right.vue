<template>
  <div class="chart_colright">
    <div class="right_box">
      <h2 class="user_title">客户资料</h2>
      <!-- <div class="usertip">
        <p class="usertip_p">标签</p>
      </div>-->
      <Card style="border:none;padding:0" dis-hover>
        <p slot="title" class="card_title">基本信息</p>
        <div class="div_img">
          <img :src="userInfoList.avatarUrl" class="div_img_img">
        </div>
        <div class="div">
          <p class="card_options">姓名</p>
          <p class="card_options card_option">{{ userInfoList.name }}</p>
        </div>
        <div class="div">
          <p class="card_options">电话</p>
          <p class="card_options card_option">{{ userInfoList.phone }}</p>
        </div>
        <div class="div">
          <p class="card_options">性别</p>
          <p class="card_options card_option">{{ userInfoList.sex }}</p>
        </div>
        <div class="div">
          <p class="card_options">年龄</p>
          <p class="card_options card_option">{{ userInfoList.age }}</p>
        </div>
        <div class="div">
          <p class="card_options">微信号</p>
          <p class="card_options card_option">{{ userInfoList.wxaccount }}</p>
        </div>
      </Card>
    </div>
  </div>
</template>


<script lang='ts'>
import { Vue, Component } from "vue-property-decorator";
import { user_info_list } from "@/mock/logininfo";
@Component
export default class Right extends Vue {
  private isShowright: number = 0;
  private userInfoList: config.userinfoTypes = {};

  created() {
    this.userInfoList = user_info_list;
  }
}
</script>

<style scoped lang='less'>
.chart_colright {
  position: relative;
  height: 100%;
  width: 30%;
  background-color: white;
  display: inline-block;

  .right_box {
    width: 90%;
    height: 100px;
    margin: 0 auto;
    .user_title {
      padding: 10px 0px;
    }
    .usertip_p {
      font-size: 14px;
      padding: 14px 16px;
      border-bottom: 1px solid #dedede;
    }
    .card_title {
      font-size: 15px;
      font-weight: normal;
    }
    .div_img {
      display: flex;
      flex-flow: row nowrap;
      justify-content: center;
      align-items: center;
      margin-top: 5%;
      .div_img_img {
        width: 4rem;
        height: 4rem;
        border-radius: 100%;
      }
    }

    .div {
      display: flex;
      flex-flow: row nowrap;
      justify-content: left;
      align-items: center;
      padding: 20px 0px;
      border-bottom: 1px solid #dedede;
      font-size: 12px;
      margin-top: 2%;
      .card_option {
        margin-left: 10px;
      }
      // .card_options {
      //   // width: 30%;
      // }
    }
    .card_div {
      padding: 20px 0px;
      font-size: 12px;
    }
  }
}
</style>
