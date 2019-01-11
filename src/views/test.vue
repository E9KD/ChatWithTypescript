<template>
  <div class="test">
    <div class="a">
      <div class="c"></div>
      <div class="d"></div>
    </div>
    <div class="b"></div>
  </div>
</template>
<script lang='ts'>
import { Vue, Component } from "vue-property-decorator";
@Component({})
export default class Test extends Vue {}
</script>
<style lang="less" scoped>
.test {
  width: 100vw;
  height: 100vh;
  display: flex;
  flex-flow: row nowrap;
  justify-content: center;
  align-items: center;
  .a {
    background-color: red;
    width: 300px;
    height: 200px;
    display: flex;
    flex-flow: column nowrap;
    justify-content: space-between;
    align-items: flex-end;
    .c {
      width: 50px;
      height: 50px;
      background-color: yellow;
    }
    .d {
      width: 50px;
      height: 50px;
      background-color: white;
    }
  }
  .b {
    width: 300px;
    height: 200px;
    background-color: black;
  }
}
</style>
