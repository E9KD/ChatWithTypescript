<template>
  <!-- 
                                10.13
                                    添加设置接待人数上限功能
  -->
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

<script>
import { mapState } from "vuex";
export default {
  data() {
    return {
      talktopnum: "5",
      waitperson: 0,
      userimg: require("@/assets/success.png"),
      username: "asdasdasdasd"
    };
  },
  methods: {
    addNextperson() {
      let newperson = {
        img: require("@/assets/active.png"),
        personname: "新人",
        messagecount: 1
      };
      this.$store.commit("addNextPerson", newperson);
    }
  },
  computed: {
    ...mapState(["talklistnumber"])
  },
  watch: {
    talktopnum(x) {
      this.$store.commit("setTalkNumberTop", x);
    }
  }
};
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
