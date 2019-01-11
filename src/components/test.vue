<template>
  <div class="test">
    <button @click="click">这个是子组件</button>
    <p>{{snum}}</p>
  </div>
</template>

<script lang='ts'>
import { Vue, Component } from "vue-property-decorator";
@Component({})
export default class Test extends Vue {}
</script>

<style lang="less" scoped>
</style>
