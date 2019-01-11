<template>
  <div class="chart">
    <Left></Left>
    <Mid :pageState='chatStatepage' />
  </div>
</template>
<script lang='ts'>
import Left from "@/components/left.vue";
import Mid from "@/components/mid.vue";
// import Right from "@/components/right.vue";
// import { socket } from "@/utils/socket";
// import socketMixins from "@/utils/mixins";
import { Vue, Component, Mixins } from "vue-property-decorator";

@Component({
  components: {
    Left,
    Mid,
    // Right
  }
})
export default class Chat extends Vue {
  private chatStatepage:string='chat'
  // private loginData: string = "";
  // InitSocket() {
  //   this.loginData = `{"type":"login","client_name":"NewPc","room_id":"5","uid":"199","kid":"20"}`;
  //   this.newsocket.SocketOpen(this.loginData);
  //   this.newsocket.ListenMessage();
  // }
  created() {
    // this.InitSocket();
  }
}
</script>
<style lang="less" scoped>
.chart {
  height: 92vh;
  width: 97vw;
  display: inline-block;
}
</style>
