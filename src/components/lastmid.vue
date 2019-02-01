<template>
  <div class="lastmid">
    <div class="top_talk">
      <div
        :class="item.code==1?'talk_you':'talk_mine'"
        v-for="(item,index) in lasttalkhistory"
        :key="index"
        class="animated fadeIn"
      >
        <img :src="item.img" alt v-if="item.isimg" class="talklist_img" @dblclick="goBig(item.img)">
        <div class="talk_textbox" v-else>
          <div class="textbox_top">
            <p class="textbox_top_day">{{item.day}}</p>
            <p class="textbox_top_time">{{item.time}}</p>
          </div>
          <p :class="item.code==1?'you_p':'mine_p'">{{item.p}}</p>
        </div>
        <img :class="item.code==1?'you_img':'mine_img'" :src="item.code==1?yimg:mimg">
      </div>
    </div>
  </div>
</template>

<script lang='ts'>
import { Vue, Component } from "vue-property-decorator";
@Component({})
export default class Lastmid extends Vue {
  private value1: boolean = false;
  private text: string = "";
  private yimg: string = require("@/assets/all.png");
  private mimg: string = require("@/assets/active.png");
  private talklist: any = [];
  private bigimg: string = require("@/assets/active.png");
  private isbigimg: boolean = false;
  private lasttalkhistory: any = [
    {
      p: "asodjioajsildjajsd",
      code: 0,
      day: `${new Date().getMonth() + 1}/${new Date().getDate()}`,
      time: `${new Date().getHours()}:${new Date().getMinutes()}`,
      img: ""
    },
    {
      p: "asodjioajsildjajsd",
      code: 1,
      day: `${new Date().getMonth() + 1}/${new Date().getDate()}`,
      time: `${new Date().getHours()}:${new Date().getMinutes()}`,
      img: ""
    }
  ];
}
</script>

<style scoped lang="less">
.lastmid {
  width: 80%;
  height: 100%;
  display: inline-block;
  background-color: #f7f7f7;
}

.top_title {
  padding: 10px 30px;
  font-size: 13px;
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
  border-radius: 15px;
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
  border-radius: 15px;
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
  width: 30px;
  height: 30px;
  overflow: hidden;
  padding: 10px;
  z-index: 99;
  opacity: 0;
  cursor: pointer;
}

.upfilebox {
  position: absolute;
  top: 0px;
  left: 50px;
  z-index: -1;
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

.textbox_top_day {
  display: inline-block;
  color: #999;
}

.textbox_top_time {
  display: inline-block;
  margin-left: 10px;
  color: #999;
}

.talk_textbox {
  display: inline-block;
}

.drawer {
  width: 40%;
}
</style>
