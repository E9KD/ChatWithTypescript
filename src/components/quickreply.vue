<template>
  <div class="quickreply">
    <Button type="success" @click="AddQuickReply">
      <Icon type="md-add"/>添加短语
    </Button>
    <div class="quickreply_for" v-for="(item,index) in quickReplylist" :key="index">
      <p class="for_content" @click="WirteQuickReply(item.content)">{{item.content}}</p>
      <Button @click="ChangeQuickReply(item.id)" type="primary" class="for_btn">修改</Button>
      <Button @click="DeleteQuickReply(item.id)" type="error" class="for_btn">删除</Button>
    </div>
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

<script lang="ts">
import { Vue, Component } from "vue-property-decorator";
import { State, Mutation } from "vuex-class";

@Component({})
export default class QuickReply extends Vue {
  @Mutation("ChooseQuickReply") ChooseQuickReply!: Function;

  private changeOraddReply: string = ""; // 添加或者修改的短语
  private changeReplyid: number = 0; // 修改短语的id
  private modalTitle: string = "";
  private changeAndaddReply: boolean = false;
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

  // 选择短语
  WirteQuickReply(x: string) {
    this.ChooseQuickReply(x);
  }

  // 短语修改取消
  CancelWithChangeQuickReply() {
    this.$Message.warning("取消修改！");
    this.changeOraddReply = "";
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
}
</script>

<style lang='less' scoped>
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
      box-shadow: 0 0 10rpx black;
      cursor: pointer;
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

