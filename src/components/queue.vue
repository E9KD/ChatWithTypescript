<template>
  <div class="queue">
    <!-- <div class="userinfo">
        <img :src="userimg" >
        <p>{{username}}</p>
    </div>-->
    <h3 class="queue_title">目前队列还剩：{{waitperson}}</h3>
    <div class="queue_nextperson" @click="addNextperson">接待下一位</div>
    <div class="queue_persongnumber">接待中{{talklistnumber}}人</div>
    <Select v-model="talktopnum" class="queue_setqueuenum" placeholder="选择接待上限">
      <Option value="5" label="上限5人">
        <span>上限5人</span>
      </Option>
      <Option value="10" label="上限10人">
        <span>上限10人</span>
      </Option>
      <Option value="20" label="上限20人">
        <span>上限20人</span>
      </Option>
    </Select>
  </div>
</template> 

<script lang='ts'>
import { Vue, Component, Watch } from "vue-property-decorator";
import { State, Mutation } from "vuex-class";
@Component({})
export default class Queue extends Vue {
  @State("talklistnumber") talklistnumber!: number;
  @Mutation("setTalkNumberTop") setTalkNumberTop!: Function;
  @Mutation("addNextPerson") addNextPerson!: Function;
  private talktopnum: number = 5;
  private waitperson: number = 0;
  private userimg: string = require("@/assets/success.png");
  addNextperson() {
    // console.log(this.talklistnumber);
    // let newperson = {
    //   img: require("@/assets/active.png"),
    //   personname: "新人",
    //   messagecount: 1
    // };
    // this.addNextPerson(newperson);
  }
  @Watch("talktopnum")
  Changetalktopnum(x: number) {
    this.setTalkNumberTop(x);
  }
}
</script>

<style lang="less" scoped>
.queue {
  width: 100%;
  // height: 100px;
  border-bottom: 1px solid #393e46;
  .queue_title {
    font-size: 15px;
    text-align: center;
    padding: 5% 0px;
  }
  .queue_nextperson {
    font-size: 15px;
    border-bottom: 1px solid #393e46;
    border-top: 1px solid #393e46;
    width: 100%;
    text-align: center;
    padding: 5% 0px;
  }
  .queue_persongnumber {
    width: 50%;
    display: inline-block;
    font-size: 15px;
    padding-left: 10px;
    padding-top: 5px;
  }
  .queue_setqueuenum {
    width: 50%;

    display: inline-block;
    font-size: 12px;
    cursor: pointer;
    font-size: 12px;
    vertical-align: top;
  }
}
</style>
