<template>
  <ul
    ref="contextmenu"
    v-show="visible"
    :style="{ left: left + 'px', top: top + 'px' }"
    class="contextmenu"
  >
    <slot name="menuItem"></slot>
  </ul>
</template>
<script lang="ts">
import { Component, Prop, Vue, Watch } from "vue-property-decorator";
@Component({})
export default class ContextMenu extends Vue {
  @Prop({
    default: () => {
      return {
        clientX: 0,
        clientY: 0
      };
    },
    type: Object
  })
  offset!: object;

  @Prop({ default: false }) editable!: boolean;

  private left: number = 0;
  private top: number = 0;
  private visible: boolean = false;

  get ViewPortWidth() {
    return document.documentElement.clientWidth || document.body.clientWidth;
  }
  get ViewPortHeight() {
    return document.documentElement.clientHeight || document.body.clientHeight;
  }
  // 动态调整位置
  offsetHandler() {
    const { clientX, clientY }: any = this.offset;
    const cMenu: any = this.$refs.contextmenu;
    this.$nextTick(() => {
      this.left = clientX + 15;
      this.top = clientY - 10;

      if (this.ViewPortWidth - cMenu.offsetWidth - 20 < clientX) {
        this.left = clientX - 15 - cMenu.offsetWidth;
      }
      if (clientY + cMenu.offsetHeight + 40 > this.ViewPortHeight) {
        this.top =
          clientY - (clientY + cMenu.offsetHeight + 40 - this.ViewPortHeight);
      }
    });
  }

  @Watch("offset", { deep: true })
  getOffset(val: any) {
    this.offsetHandler();
    this.visible = true;
  }

  @Watch("visible")
  getVisible(value: boolean) {
    if (value) {
      document.addEventListener("click", (e: any) => {
        // 弹窗内容可编辑的，默认点击弹窗外关闭弹窗
        if (this.editable) {
          e.stopPropagation(); // 阻止事件冒泡
          const vRefs: any = this.$refs.contextmenu;
          if (vRefs && !vRefs.contains(e.target)) {
            this.closeMenu();
          }
        } else {
          this.closeMenu();
        }
      });
    } else {
      document.removeEventListener("click", this.closeMenu);
    }
  }

  closeMenu() {
    this.visible = false;
  }
  mounted() {
    window.onscroll = () => {
      this.visible = false;
    };
  }
}
</script>
<style lang="scss" scoped>
.contextmenu {
  position: fixed;
  max-height: 500px;
  min-width: 80px;
  overflow: auto;
  margin: 0;
  padding: 5px 0;
  font-size: 12px;
  font-weight: 400;
  color: #333;
  border-radius: 4px;
  box-shadow: 2px 2px 3px 0 rgba(0, 0, 0, 0.3);
  border: 1px solid #f2f2f2;
  z-index: 99999;
  list-style-type: none;
  background: #e9e9e9;

  li {
    list-style-type: none;
    margin: 0;
    padding: 3px 10px;
    cursor: pointer;

    &:hover {
      background: #eee;
    }
  }
}
</style>
