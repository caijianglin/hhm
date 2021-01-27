<template>
  <div class="files-list">
    <div class="content">
      <template v-if="filesList.length > 0">
        <template v-for="(item, index) in filesList">
          <div class="line" :key="`file-${index}`" @click="openFile(item)">
            <p class="title">
              {{ index + 1 + "、" + item.filename }}
            </p>
            <p class="date">{{ item.createTime?item.createTime.toString().substring(0,11):"" }}</p>
          </div>
        </template>
      </template>
      <p v-else class="none-tip">暂无数据</p>
    </div>
  </div>
</template>
<script lang="ts">
import { Component, Vue } from "vue-property-decorator";
@Component
export default class FilesList extends Vue {
  private filesList: any = [];

  openFile(file: any) {
    // if (type.includes("pdf") || type.includes("PDF")) {
    //   const routeUrl = this.$router.resolve({
    //     path: "show_pdf",
    //     query: {
    //       fileUrl: `${fileUrl}`
    //     }
    //   });
    //   window.open(routeUrl.href, "_blank");
    // } else {
    //   window.open(`/FileDownLoadDiskServlet?fileid=${fileUrl}`, "_blank");
    // }
    if(file.fileid){
      const fileid = file.fileid;
      const filename = file.filename;
      const filetype = file.filetype.toLowerCase();
      const strUrl = `http://eos.cpgc.com.cn:8012/onlinePreview?url=${encodeURIComponent(`http://eos.cpgc.com.cn/FileDownLoadDiskServlet?fileid=${fileid}&fullfilename=${fileid}.${filetype}`)}`;
      window.open(strUrl);
    }
  }
  beforeDestroy() {
    localStorage.removeItem("tools-files");
  }
  mounted() {
    // const params = this.$route;
    // console.log("FilesList -> mounted -> params", params)
    // sessionStorage.setItem("tools-files", JSON.stringify(params));
    // 用定时器延迟数据获取，等A页面设置完sessionStorage
    setTimeout(() => {
      const list: any = window.sessionStorage.getItem("tools-files");
      this.filesList = JSON.parse(list);
    }, 200);
  }
}
</script>
<style lang="scss" scoped>
.files-list {
  width: 100%;
  padding: 50px 0;

  .content {
    width: 960px;
    padding: 20px;
    min-height: calc(100vh - 100px);
    margin: 0 auto;
    overflow: auto;
    background-color: #fff;
    box-shadow: 0 2px 4px rgba(0, 0, 0, 0.12), 0 0 6px rgba(0, 0, 0, 0.04);
    border-radius: 10px;

    .line {
      position: relative;
      width: 100%;
      height: 40px;
      padding: 0 20px;
      line-height: 40px;
      text-align: left;
      cursor: pointer;

      &::after {
        content: "";
        position: absolute;
        display: block;
        width: calc(100% - 50px);
        height: 0;
        margin: 0 auto;
        border-bottom: solid 1px #999;
        bottom: 0;
        left: 25px;
      }

      &:hover {
        background-color: #f9f9f9;
        .title {
          color: #4192f7 !important;
        }
      }

      .title {
        float: left;
        width: calc(100% - 200px);
        font-size: 13px;
        color: #414141;
        overflow: hidden;
        text-overflow: ellipsis;
        white-space: nowrap;
      }
      .date {
        width: 150px;
        float: right;
        font-size: 13px;
        color: #9fa5b3;
        text-align: right;
      }
    }

    .none-tip {
      position: absolute;
      top: 50%;
      left: 50%;
      transform: translate(-50%, -50%);
      color: #999;
      font-size: 14px;
    }
  }
}
</style>
