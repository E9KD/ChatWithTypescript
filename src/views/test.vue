<template>
  <div class="test">
    <form
      return="false"
      enctype="multipart/form-data"
      method="POST"
      action="http://www.a.com.10.1.1.59.xip.io/api/dakaup/updakaimg"
    >
      <input type="file" id="file" name="img">
      <button>asd</button>
    </form>
  </div>
</template>
<script lang='ts'>
import { Vue, Component } from "vue-property-decorator";
@Component
export default class Test extends Vue {
};
</script>
