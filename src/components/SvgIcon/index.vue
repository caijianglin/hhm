<template>
  <svg :class="svgClass" aria-hidden="true" v-on="$listeners">
    <use :xlink:href="iconName" />
  </svg>
</template>

<script lang="ts">
import { Component, Prop, Vue } from "vue-property-decorator";

@Component
export default class SvgIcon extends Vue {
  @Prop() private iconClass!: string;
  @Prop() private className!: string;
  get iconName(): string {
    return `#icon-${this.iconClass}`;
  }
  get svgClass(): string {
    if (this.className) {
      return "svg-icon " + this.className;
    } else {
      return "svg-icon";
    }
  }
}
</script>

<style lang="scss">
@function vw($px) {
  @return ($px / 750) * 100vw;
}
.svg-icon {
  width: 1rem;
  height: 1rem;
  vertical-align: -0.15em;
  fill: currentColor;
  overflow: hidden;
  color: #fff;
}
</style>
