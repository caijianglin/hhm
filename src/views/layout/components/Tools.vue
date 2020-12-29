<template>
  <div class="tools clearfix" id="tools">
    <!-- <div class="tools-item">
      <svg-icon class="icon" icon-class="tel"></svg-icon>
      <a class="tel-number" :href="`tel://${1111111111111}`">{{
        111111111111111111
      }}</a>
    </div>
    <div class="tools-item" @click="toMap()">
      <svg-icon class="icon" icon-class="location"></svg-icon>
    </div>
    <div class="tools-item" @click="toIns()">
      <svg-icon class="icon" icon-class="instagram"></svg-icon>
    </div>
    <div class="tools-item" @click="scrollToTop()" v-if="returnTop">
      <svg-icon class="icon" icon-class="gotop"></svg-icon>
    </div> -->
  </div>
</template>

<script lang="ts">
import { Component, Prop, Vue, Watch } from "vue-property-decorator";
import { Getter } from "vuex-class";

@Component
export default class Tools extends Vue {
  // private toolsVisible: boolean = false;
  // private returnTop: boolean = false;
  // @Getter storeInfo!: object;
  // @Getter resizeFooterTime!: any;
  // @Watch("$route")
  // routeChange(newVal: any) {
  //   this.toolsLoad("init"); // 监听路由变化，刷新工具条浮动状态
  // }
  // @Watch("resizeFooterTime")
  // getResizeFooterTime(newVal: any) {
  //   this.toolsLoad("init"); // 监听store属性变化，刷新工具条浮动状态
  // }
  // toMap() {
  //   this.$router.push("store");
  // }
  // toIns() {
  //   window.open(
  //     "https://www.instagram.com/the_artist_hanbok/?hl=zh-cn",
  //     "_blank"
  //   );
  // }
  // scrollToTop() {
  //   document.body.scrollIntoView({ behavior: "smooth" });
  // }
  // // element：dom元素
  // // to：滚动到哪个位置
  // // duration: 动画时长
  // // scrollToTop(element, to, duration) {
  // //   if (duration <= 0) return;
  // //   const diff = to - element.scrollTop;
  // //   const perTick = (diff / duration) * 10;
  // //   this.timer = setTimeout(() => {
  // //     element.scrollTop += perTick;
  // //     if (element.scrollTop === to) return;
  // //     this.scrollToTop(element, to, duration - 10);
  // //   }, 10);
  // // }
  // toolsLoad(state: any) {
  //   const tools: any = document.getElementById("tools");
  //   const foot: any = document.getElementById("footer");
  //   let bodyHeight: number;
  //   const windowHeight = document.documentElement.clientHeight;
  //   const scrollTop =
  //     window.pageYOffset ||
  //     document.documentElement.scrollTop ||
  //     document.body.scrollTop;
  //   // 计算body真实高度，fixed下把未包含的footer高度加上
  //   if (foot.style.position === "fixed")
  //     bodyHeight = document.body.offsetHeight + foot.offsetHeight;
  //   else bodyHeight = document.body.offsetHeight;
  //   // 滚动超出1.5倍页面，调整显示状态
  //   if (state === "init") {
  //     // 初始化
  //     if (bodyHeight > windowHeight * 1.5) {
  //       tools.classList.remove("float-tools");
  //       tools.classList.remove("fixed-tools");
  //       this.returnTop = true;
  //     } else {
  //       tools.classList.add("fixed-tools");
  //       tools.classList.remove("float-tools");
  //       this.returnTop = false;
  //     }
  //   } else {
  //     // 滚动事件监听执行判断
  //     if (bodyHeight > windowHeight * 1.5) {
  //       if (scrollTop > windowHeight * 0.5) {
  //         tools.classList.add("float-tools");
  //         tools.classList.remove("fixed-tools");
  //       } else {
  //         tools.classList.remove("float-tools");
  //       }
  //       this.returnTop = true;
  //     } else {
  //       tools.classList.add("fixed-tools");
  //       tools.classList.remove("float-tools");
  //       this.returnTop = false;
  //     }
  //   }
  // }
  // mounted() {
  //   this.toolsLoad("init");
  //   window.addEventListener("scroll", () => {
  //     this.toolsLoad(null);
  //   });
  // }
}
</script>

<style lang="scss"></style>
