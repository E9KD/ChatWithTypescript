<template>
  <div class="lastchart">
    <Lastleft></Lastleft>
    <Lastmid></Lastmid>
  </div>
</template>
<script lang='ts'>
import Lastleft from "@/components/lastleft.vue";
import Lastmid from "@/components/lastmid.vue";
import { Vue, Component } from "vue-property-decorator";

@Component({
  components: {
    Lastleft,
    Lastmid
  }
})
export default class Lastchat extends Vue {}
</script>
<style lang="less" scoped>
.lastchart {
  height: 92vh;
}
</style>
