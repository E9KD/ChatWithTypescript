<template>
  <div class="lastchart">
    <Lastleft/>
    <!-- <Lastmid/> -->
    <Mid :pageState="midStatepage"/>
  </div>
</template>
<script lang='ts'>
// import Lastleft from "@/components/lastleft.vue";
// import Lastmid from "@/components/lastmid.vue";
// import Mid from "@/components/mid.vue";
import { Vue, Component } from "vue-property-decorator";

@Component({
  components: {
    'Lastleft':()=>import('@/components/lastleft.vue'),
    'Lastmid':()=>import('@/components/lastmid.vue'),
    'Mid':()=>import('@/components/mid.vue')
  }
})
export default class Lastchat extends Vue {
  private midStatepage: string = "lastchat";
}
</script>
<style lang="less" scoped>
.lastchart {
  height: 92vh;
  width: 97vw;
  display: inline-block;
}
</style>
