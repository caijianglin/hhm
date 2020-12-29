<!--党群门户-->
<template>
  <div class="others">
    <p class="coming-soon">敬请期待...</p>
  </div>
</template>

<script lang="ts">
import { Component, Prop, Vue } from "vue-property-decorator";
@Component
export default class Others extends Vue {}
</script>
<style lang="scss" scoped>
.others {
  width: 100%;
  .coming-soon {
    font-size: 16px;
    color: #999;
    text-align: center;
    line-height: 78vh;
  }
}
</style>
