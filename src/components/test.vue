<template>
  <div class="test">
    <button @click="click">这个是子组件</button>
    <p>{{snum}}</p>
  </div>
</template>

<script>
import { login } from "@/utils/api.js";
import {input} from '@/utils/test.js'
export default {
  data() {
    return {
      asd: "儿子的纸",
      p: ""
    };
  },
  props: ["snum"],
  methods: {
    click() {
      this.$emit("tofu", this.asd);
    }
  },
  created() {


  }
};
</script>

<style lang="less" scoped>
</style>
