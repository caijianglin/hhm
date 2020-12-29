import { Component, Vue } from "vue-property-decorator";
import store from "@/store";

@Component
export default class ResizeHandler extends Vue {
  public WIDTH: number = 1024;
  public RATIO: number = 3;
  beforeMount() {
    window.addEventListener("resize", this.resizeHandler);
  }
  mounted() {
    const isMobile = this.isMobile();
    if (isMobile) {
      store.dispatch("setUserAgent", "mobile");
      // store.dispatch('closeSideBar', { withoutAnimation: true })
    }
  }
  isMobile() {
    const rect = document.body.getBoundingClientRect();
    return rect.width - this.RATIO < this.WIDTH;
  }
  resizeHandler() {
    if (!document.hidden) {
      const isMobile = this.isMobile();
      store.dispatch("setUserAgent", isMobile ? "mobile" : "pc");
    }
  }
}
