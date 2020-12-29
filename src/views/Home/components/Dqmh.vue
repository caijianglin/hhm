<!--党群门户-->
<template>
  <div class="dqmh">
    <iframe
      id="iframe"
      src="http://192.168.139.37:8081/dq.asp"
      frameborder="0"
    ></iframe>
  </div>
</template>

<script lang="ts">
import { Component, Prop, Vue } from "vue-property-decorator";
@Component
export default class Dqmh extends Vue {
  // mounted() {
  //   var _this = this;
  //   const iframe: any = document.querySelector("#iframe");
  //   // 处理兼容行问题
  //   if (iframe.attachEvent) {
  //     iframe.attachEvent("onload", function() {
  //       // iframe加载完毕以后执行操作
  //       console.log("iframe已加载完毕");
  //     });
  //   } else {
  //     iframe.onload = function() {
  //       // iframe加载完毕以后执行操作
  //       console.log("iframe已加载完毕");
  //     };
  //   }
  // }
}
</script>
<style lang="scss" scoped>
.dqmh {
  width: 1400px;
  margin: 0 auto;

  iframe {
    width: 100%;
    min-height: 1200px;

    body {
      width: 100%;
    }
  }
}
</style>
