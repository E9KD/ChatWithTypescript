<template>
  <div>
    <p>{{count}}</p>
    <button @click="click">click</button>
  </div>
</template>
<script type="text/javascript">
export default {
  data() {
    return {
      count: 1,
    };
  },
  computed:{
    change(){
      console.log('触发')
      return this.count
    }
  },
  methods: {
    click(){
      this.count=222
    }
  }
};
</script>