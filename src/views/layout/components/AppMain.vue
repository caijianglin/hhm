<template>
  <section class="app-main">
    <!-- <transition name="fade-transform" mode="out-in"> -->
    <!---判断是否为微信内置浏览器，是的话有地图的页面不进行缓存 -->
    <keep-alive>
      <router-view :key="key()" />
    </keep-alive>
  </section>
</template>

<script lang="ts">
import { Component, Prop, Vue } from "vue-property-decorator";
import { Getter } from "vuex-class";

@Component({
  components: {}
})
export default class Footer extends Vue {
  key() {
    return this.$route.fullPath;
  }
}
</script>
<style scoped>
.app-main {
  /* background-color: rgb(244, 244, 244, 1); */
  width: 100%;
  height: 100%;
}
</style>
<!-- Add 'scoped' attribute to limit CSS to this component only -->
