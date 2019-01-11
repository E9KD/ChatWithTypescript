<template>
  <div class="set">
    <!-- <h2 class="set_title">设置</h2> -->
    <div class="set_box">
      <div class="set_box_list">
        <p class="set_box_list_p">绑定手机号</p>
        <img :src="isinputtrue?s:e" alt class="set_box_list_img" v-show="isinputtext">
        <input
          on-change
          class="set_box_list_input"
          type="text"
          v-model="phonenum"
          placeholder="请输入手机号"
        >
      </div>
    </div>
    <div class="set_btn" @click="closeSet">完成</div>
  </div>
</template>


<script lang='ts'>
import { Vue, Component, Watch } from "vue-property-decorator";
@Component
export default class Set extends Vue {
  private phonenum: string = "";
  private isinputtrue: boolean = false;
  private isinputtext: boolean = false;
  private s: string = require("@/assets/success.png");
  private e: string = require("@/assets/error.png");
  init() {}
  closeSet() {
    //  进行请求，成功绑定成功，失败出现提示
    let ii = true;
    if (ii) {
      this.$Message.success("修改成功");
    } else {
      this.$Message.error(`修改失败`);
    }
    setTimeout(() => this.$router.push("/main/chat"), 1000);
  }
  @Watch("phonenum")
  ChangePhonenum(x: any[]) {
    let InputisText = x.length;
    if (InputisText == 0) {
      this.isinputtext = false;
    } else {
      this.isinputtext = true;
      if (InputisText == 11) {
        this.isinputtrue = true;
      } else {
        this.isinputtrue = false;
      }
    }
  }
}
</script>

<style lang="less" scoped>
.set {
  background-color: #393e46;
  position: relative;
  overflow: hidden;
  height: 92vh;
  color: #00adb5;
  .set_title {
    font-size: 20px;
    display: block;
    text-align: center;
  }
  .set_box {
    width: 70%;
    margin: 0 auto;
    margin-top: 8%;
    .set_box_list {
      .set_box_list_p {
        font-size: 13px;
        float: left;
      }
      .set_box_list_input {
        float: right;
        width: 140px;
        padding-left: 5px;
        color: #999;
      }
      .set_box_list_img {
        float: right;
        width: 20px;
        height: 20px;
        margin-left: 10px;
      }
    }
  }
  .set_btn {
    width: 70px;
    height: 30px;
    position: absolute;
    bottom: 4%;
    left: 50%;
    transform: translate(-50%, -50%);
    font-size: 15px;
    color: white;
    background-color: #00adb5;
    line-height: 30px;
    text-align: center;
    border-radius: 15px;
    &:hover {
      background-color: #0a8f96;
    }
  }
}
</style>
