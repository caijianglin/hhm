<template>
    <div class="user-info-dialog">
        <div ref="dialog-container" class="dialog-container">
            <div class="dialog-content">
                <slot />
            </div>
            <svg-icon
                    title="关闭弹窗"
                    class="icon-close"
                    icon-class="delete"
                    @click="close"
            ></svg-icon>
        </div>
    </div>
</template>

<script lang="ts">
  import { Component, Prop, Vue, Emit } from "vue-property-decorator";

  @Component
  export default class MoreDataDialog extends Vue {
    //   @Prop() private data!: object[];
    private isFullScreen: boolean = false;
    @Emit()
    close() {
      console.log("close");
    }
    isFullScreenSupported(ele: any) {
      return (
        ele.requestFullscreen ||
        ele.webkitRequestFullScreen ||
        ele.mozRequestFullScreen
      );
    }
    fullScreen() {
      const dialogEle: any = this.$refs["dialog-container"];
      if (this.isFullScreenSupported(dialogEle)) {
        const fullscreen: any =
          document.fullscreen ||
          (document as any).mozFullScreen ||
          (document as any).webkitIsFullScreen;
        if (!fullscreen) {
          if (dialogEle.requestFullscreen) {
            dialogEle.requestFullscreen();
            this.isFullScreen = true;
          } else if (dialogEle.webkitRequestFullScreen) {
            dialogEle.webkitRequestFullScreen(
              (Element as any).ALLOW_KEYBOARD_INPUT
            );
            this.isFullScreen = true;
          } else if (dialogEle.mozRequestFullScreen) {
            dialogEle.mozRequestFullScreen();
            this.isFullScreen = true;
          }
        } else {
          if (document.exitFullscreen) {
            document.exitFullscreen();
            this.isFullScreen = false;
          } else if ((document as any).mozCancelFullScreen) {
            (document as any).mozCancelFullScreen();
            this.isFullScreen = false;
          } else if ((document as any).webkitCancelFullScreen) {
            (document as any).webkitCancelFullScreen();
            this.isFullScreen = false;
          }
        }
      }
    }
  }
</script>

<style lang="scss">
    .user-info-dialog {
        position: fixed;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        background-color: rgba(0, 0, 0, 0.5);
        z-index: 9;

        .dialog-container {
            position: relative;
            width: 560px;
            height: 320px;
            padding: 30px;
            background: #fff;
            margin: 15vh auto;
            z-index: 5;
            border-radius: 12px;

            .dialog-content {
                width: 100%;
                height: 100%;
            }

            .icon-close {
                position: absolute;
                // top: -10px;
                // right: -10px;
                top: 5px;
                right: 5px;
                width: 25px;
                height: 25px;
                color: #999;
                cursor: pointer;

                &:hover {
                    color: darken(#999, 10%);
                }
            }
            .icon-full-screen,
            .icon-cancel-full-screen {
                position: absolute;
                top: 6px;
                right: 35px;
                width: 23px;
                height: 23px;
                color: #999;
                cursor: pointer;

                &:hover {
                    color: darken(#999, 10%);
                }
            }
        }
    }
</style>