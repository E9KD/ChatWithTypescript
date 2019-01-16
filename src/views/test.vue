<template>
  <div>
    <p ref="myWidth" v-if="showMe">{{ message }}</p>
    <button @click="getMyWidth">获取p元素宽度</button>
  </div>
</template>
<script type="text/javascript">
export default {
  data(){
    return{
      message:1,
      showMe:false
    }
  },
  methods: {
    getMyWidth() {
      this.showMe = true;
      //this.message = this.$refs.myWidth.offsetWidth;
      //报错 TypeError: this.$refs.myWidth is undefined
      this.$nextTick(() => {
        //dom元素更新后执行，此时能拿到p元素的属性
        this.message = this.$refs.myWidth.offsetWidth;
      });
    }
  }
};
</script>