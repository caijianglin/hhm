<template>

  <div class="show-pdf">
    <span id="pages" class="pages">{{ currentPage }} / {{ pageCount }}</span>
    <span class="page-btn next" @click="changePdfPage(1)">下一页</span>
    <span class="page-btn pre" @click="changePdfPage(0)">上一页</span>
    <div class="pdf-wrapper clearfix">
      <pdf
              :src="getSrc"
              :page="currentPage"
              @num-pages="pageCount = $event"
              @page-loaded="currentPage = $event"
              ref="wrapper"
              class="pdf"
      ></pdf>
    </div>
    <span class="page-btn next" @click="changePdfPage(1)" style="margin-top:20px;">下一页</span>
    <span class="page-btn pre" @click="changePdfPage(0)" style="margin-top:20px;">上一页</span>
  </div>
</template>
<script lang="ts">
import pdf from "vue-pdf";
import { Component, Vue } from "vue-property-decorator";
@Component({
  components: {
    pdf
  }
})
export default class ShowPDF extends Vue {
  get getSrc() {
    // return this.$route.query.src;
    const doc: any = this.$route.query;
    if (doc && doc.fileUrl) {
      return `/FileDownLoadDiskServlet?fileid=${doc.fileUrl}`;
    }
    return "";
  }
  private currentPage: number = 1;
  private pageCount: number = 0;
  changePdfPage(num: any) {
    const el: any = document.getElementById("pages");
    if (num === 0 && this.currentPage > 1) {
      this.currentPage--;
      el.scrollIntoView();
    }
    if (num === 1 && this.currentPage < this.pageCount) {
      this.currentPage++;
      el.scrollIntoView();
    }
  }
}
</script>
<style lang="scss" scoped>
  .show-pdf {
    width: 1200px;
    margin: 0 auto;
    padding: 50px 0;

    .pdf-wrapper {
      width: 100%;
      padding: 20px;
      background-color: #9f9f9f;
    }
    .pages {
      display: block;
      text-align: center;
    }
    .page-btn {
      float: right;
      display: block;
      margin: 0 0 10px 20px;
      padding: 5px 10px;
      cursor: pointer;
      user-select: none;

      &.pre {
        background-color: #ddd;
        &:hover {
          background-color: darken(#ddd, 5%);
        }
      }
      &.next {
        background-color: #257dc0;
        &:hover {
          background-color: lighten(#257dc0, 5%);
        }
      }
    }
  }
</style>

