<template>
  <div class="notice-info clearfix">
    <!-- currentNoticeInfo -->
    <h1>{{ currentNoticeInfo.info ? currentNoticeInfo.info.title : "" }}</h1>
    <p class="note">
      <span
      >部门：{{
          currentNoticeInfo.info ? currentNoticeInfo.info.orgname : ""
        }}</span
      >
      <span
      >作者：{{
          currentNoticeInfo.info ? currentNoticeInfo.info.ownername : ""
        }}</span
      >
      <span
      >时间：{{
          currentNoticeInfo.info ? currentNoticeInfo.info.createtime : ""
        }}</span
      >
    </p>
    <p class="text">
      {{ currentNoticeInfo.info ? currentNoticeInfo.info.body : "" }}
    </p>
    <div
            class="action-bar clearfix"
            v-if="currentNoticeInfo.files && currentNoticeInfo.files.length > 0"
    >
      <span style="padding-right: 0">相关附件：</span>
      <div
              style="float: left;margin-left: 20px;"
              v-for="file in currentNoticeInfo.files"
              :key="file.fileid"
              @click="viewFile(file)"
      >
          <div class="file-btn">{{ file.filename || "" }}</div><img @click="downloadFile(file)" src="@assets/ItemIcons/download.png" height="15" width="15" style="margin-top: 25px"/>
      </div>
    </div>
    <!-- <h4 v-if="currentNoticeInfo.files">
      预览：{{ currentNoticeInfo.files[0].documentname }}
    </h4> -->
    <div v-if="isPDFShow && getFristPdf">
    <span id="pages" class="pages">{{ currentPage }} / {{ pageCount }}</span>
      <span class="page-btn next" @click="changePdfPage(1)">下一页</span>
      <span class="page-btn pre" @click="changePdfPage(0)">上一页</span>
    </div>
    <div v-if="isPDFShow && getFristPdf" class="pdf-wrapper">
      <pdf
              :src="getFristPdf"
              :page="currentPage"
              @num-pages="pageCount = $event"
              @page-loaded="currentPage = $event"
              ref="wrapper"
              class="pdf"
      ></pdf>
      <!--<span class="page-btn next" @click="changePdfPage(1)" style="margin-top:20px;">下一页</span>-->
      <!--<span class="page-btn pre" @click="changePdfPage(0)" style="margin-top:20px;">上一页</span>-->
    </div>
      <span class="page-btn next" @click="changePdfPage(1)">下一页</span>
      <span class="page-btn pre" @click="changePdfPage(0)">上一页</span>
  </div>
</template>

<script lang="ts">
import pdf from "vue-pdf";
import { Component, Prop, Vue, Watch } from "vue-property-decorator";
import { Getter } from "vuex-class";
import { getNoticeInfo, downloadFile } from "@api/index.ts";

@Component({
  components: {
    pdf
  }
})
export default class NoticeInfo extends Vue {
  private currentNoticeInfo: object = {};
  private isPDFShow: boolean = false;
  private currentPage: number = 1;
  private pageCount: number = 0;
  get getFristPdf() {
    const doc: any = this.currentNoticeInfo;
    if (doc.files && doc.files[0].fileid) {
      return `/FileDownLoadDiskServlet?fileid=${doc.files[0].fileid}`;
    } else {
      return "";
    }
  }
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
  // 预览附件
  viewFile(file: any) {
    if(file.fileid){
      // window.open(`/FileDownLoadDiskServlet?fileid=${file.fileid}`);
      const fileid = file.fileid;
      const filename = file.filename;
      const filetype = file.filetype.toLowerCase();
      const strUrl = `http://eos.cpgc.com.cn:8012/onlinePreview?url=${encodeURIComponent(`http://eos.cpgc.com.cn/FileDownLoadDiskServlet?fileid=${fileid}&fullfilename=${fileid}.${filetype}`)}`;
      window.open(strUrl);
    }
    // downloadFile({ fileid: "9e4484e6-8799-4679-8e8e-d47b73a6ab2c" })
    //   .then()
    //   .catch(data => {
    //     console.log("Home -> viewFile -> data", data);
    //     // const url = window.URL.createObjectURL(data);
    //     window.open(data, "_blank");
    //   });
  }
  downloadFile(file: any){
    if(file.fileid){
      window.open(`/FileDownLoadDiskServlet?fileid=${file.fileid}`);
    }
  }
  loadData(id: string | number) {
    getNoticeInfo(id)
      .then((res: any) => {
        this.currentNoticeInfo = {
          info: res.polNotice,
          files: res.files
        };
        if (res.files[0].filetype.includes("pdf") || res.files[0].filetype.includes("PDF")) {

          this.isPDFShow = true;
        }
      })
      .catch(err => {
        console.log("onShow -> err", err);
      });
  }
  mounted() {
    const id: any = this.$route.query.id;
    this.loadData(id);
  }
}
</script>

<style lang="scss" scoped>
  .notice-info {
    width: 1190px;
    height: 100%;
    margin: 0 auto;
    text-align: left;
    background-color: #fff;
    cursor: default;
      overflow: hidden;

    h1 {
      text-align: center;
    }
    .note {
      margin: 0 2.5px;
      text-align: right;
      font-size: 14px;
    }
    .text {
      margin: 20px 0 0 0;
      text-indent: 2rem;
    }
    .action-bar {
      width: 100%;
      margin-top: 20px;
      padding: 20px 0;
      border-top: 1px solid #999;

      span {
        float: left;
        margin-bottom: 20px;
        line-height: 40px;
        padding: 0 20px;
      }
      .file-btn {
        float: left;
        line-height: 40px;
        margin: 0 0 20px 0;
        padding: 0 20px;
        // background-color: #727272;
        background-color: #257dc0;
        color: #fff;
        cursor: pointer;

        &:hover {
          background-color: darken(#257dc0, 5%);
        }
      }
    }

    .pdf-wrapper {
      width: 100%;
      height: calc(100% - 350px);
        overflow-y: auto;
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
  @media screen and (max-width: 1440px) {
  }
</style>
