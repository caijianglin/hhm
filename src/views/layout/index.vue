<template>
  <!-- <div :class="isPC ? 'pc' : 'mobile'"> -->
  <div class="pc">
    <!-- <Nav></Nav> -->
    <AppMain></AppMain>
    <!-- <Footer></Footer> -->
  </div>
</template>

<script lang="ts">
import { Component, Vue } from "vue-property-decorator";
import { Nav, Footer, AppMain } from "./components";
import ResizeHandler from "./mixin/ResizeHandler";
import { Getter } from "vuex-class";

@Component({
  components: {
    Nav,
    Footer,
    AppMain
  },
  mixins: [ResizeHandler]
})
export default class Home extends Vue {
  @Getter isPC!: boolean;
}
</script>
