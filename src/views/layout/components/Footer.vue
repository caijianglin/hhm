<template>
  <div id="footer" class="footer">
    我是footer
  </div>
</template>

<script lang="ts">
import { Component, Prop, Vue, Watch } from "vue-property-decorator";
import { Getter } from "vuex-class";

@Component
export default class Footer extends Vue {
  private foot: any;
  private windowHeight: any;
  private bodyHeight: any;
  private scrollTrueStatus: boolean = false;

  @Getter themeColor!: string;
  @Getter resizeFooterTime!: any;

  @Watch("$route")
  routeChange(newVal: any) {
    this.resizeFooter(); // 监听路由变化，刷新footer浮动状态
  }
  @Watch("resizeFooterTime")
  getResizeFooterTime(newVal: any) {
    this.resizeFooter(); // 监听store属性变化，刷新footer浮动状态
  }
  get currentYear() {
    const date = new Date();
    const year = date.getFullYear();
    return year;
  }
  mounted() {
    // 让footer一直固定在页面底部
    this.foot = document.getElementById("footer");
    this.resizeFooter();
    window.onresize = () => {
      this.resizeFooter();
    };
    // window.addEventListener("scroll", () => {
    //   const tokaEle: any = document.getElementById("toka-tip");
    //   const scrollTop =
    //     window.pageYOffset ||
    //     document.documentElement.scrollTop ||
    //     document.body.scrollTop;
    //   // 当节点元素出现在屏幕内时触发
    //   if (scrollTop + this.windowHeight > this.getElementTop(tokaEle)) {
    //     this.scrollTrueStatus = true;
    //   } else {
    //     this.scrollTrueStatus = false;
    //   }
    // });
  }
  // 计算某元素顶部到body顶部的距离，通用方法
  getElementTop(el: any) {
    let actualTop: any = el.offsetTop;
    let current: any = el.offsetParent;
    while (current !== null) {
      actualTop += current.offsetTop;

      current = current.offsetParent;
    }
    return actualTop;
  }

  resizeFooter() {
    this.$nextTick(() => {
      this.windowHeight = document.documentElement.clientHeight;
      // 计算body真实高度，fixed下把未包含的footer高度加上
      if (this.foot.style.position === "fixed")
        this.bodyHeight = document.body.offsetHeight + this.foot.offsetHeight;
      else this.bodyHeight = document.body.offsetHeight;
      this.bodyHeight < this.windowHeight
        ? ((this.foot.style.position = "fixed"), (this.foot.style.bottom = "0"))
        : (this.foot.style.position = "relative");

      if (this.bodyHeight <= this.windowHeight) {
        this.scrollTrueStatus = true;
      }
    });
  }
}
</script>
<style lang="scss" scoped></style>
<!-- Add 'scoped' attribute to limit CSS to this component only -->
