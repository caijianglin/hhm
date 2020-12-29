<template>
  <div class="tools clearfix" id="tools">
    <img src="@assets/penguin.png" alt="" class="penguin" />
    <div class="tools-item" @click="refresh()">
      <svg-icon class="icon" icon-class="help"></svg-icon>
      <p>帮助</p>
    </div>
    <div class="tools-item" @click="scrollToTop()" v-if="returnTop">
      <svg-icon class="icon" icon-class="gotop"></svg-icon>
      <p>回顶部</p>
    </div>
  </div>
</template>

<script lang="ts">
import { Component, Prop, Vue, Watch } from "vue-property-decorator";
import { Getter } from "vuex-class";

@Component
export default class Tools extends Vue {
  private returnTop: boolean = false;

  refresh() {
    // this.$router.go(0);
    window.open("/portal/help/helper.pdf","_blank");
  }
  scrollToTop() {
    document.body.scrollIntoView({ behavior: "smooth" });
  }

  toolsLoad() {
    const tools: any = document.getElementById("tools");
    const bodyHeight: any = document.body.offsetHeight;
    const windowHeight = document.documentElement.clientHeight;
    const scrollTop =
      window.pageYOffset ||
      document.documentElement.scrollTop ||
      document.body.scrollTop;

    // 滚动超出1.5倍页面，调整显示状态
    if (scrollTop > windowHeight * 0.5) {
      this.returnTop = true;
    } else {
      this.returnTop = false;
    }
  }
  mounted() {
    this.toolsLoad();
    window.addEventListener("scroll", () => {
      this.toolsLoad();
    });
  }
}
</script>

<style lang="scss" scoped>
.tools {
  // display: none;
  position: fixed;
  // right: 60px;
  right: calc(50vw - 700px - 80px);
  bottom: 100px;
  width: 60px;
  z-index: 999;
  transition: all 0.75s ease-in-out;

  .penguin {
    display: block;
    width: 50px;
    margin-top: -100px;
    margin-left: 7.5px;
  }

  .tools-item {
    position: relative;
    float: right;
    width: 100%;
    height: 65px;

    border: {
      left: 1px solid #dddeda;
      right: 1px solid #dddeda;
    }

    padding: 5px 0;
    overflow: hidden;
    background: #fff;
    cursor: pointer;
    transition: all 0.3s;

    p {
      width: 100%;
      font-size: 12px;
      color: #333;
      text-align: center;
    }

    &::after {
      content: "";
      position: absolute;
      left: 30%;
      bottom: 0;
      height: 1px;
      width: 24px;
      background-color: #dddeda;
      transition: all 0.3s;
    }

    &:nth-of-type(1) {
      border-top: 1px solid #dddeda;
    }

    &:nth-last-of-type(1) {
      border-bottom: 1px solid #dddeda;

      &::after {
        content: "";
        position: absolute;
        left: 0;
        bottom: 0;
        height: 0;
        width: 0;
        background-color: transparent;
      }
    }

    .icon {
      width: 30px;
      height: 30px;
      margin: 0 15px;
      color: #a1a1a1;
      transition: all 0.3s;
    }

    &:hover {
      background-color: #fafafa;

      .icon,
      p {
        color: #5ca0e7 !important;
        //   display: inline-block;
        //   width: 40px;
        //   height: 40px;
        //   margin-right: 5px;
      }

      &::after {
        content: "";
        position: absolute;
        left: 25%;
        bottom: 0;
        height: 1px;
        width: 30px;
        background-color: #dddeda;
      }

      &:nth-last-of-type(1) {
        &::after {
          content: "";
          position: absolute;
          left: 0;
          bottom: 0;
          height: 0;
          width: 0;
          background-color: transparent;
        }
      }
    }
  }
}
@media screen and (max-width: 1580px) {
  .tools {
    right: calc(50vw - 645px - 80px);
  }
}
@media screen and (max-width: 1380px) {
  .tools {
    right: calc(50vw - 595px - 80px);
  }
}
</style>
