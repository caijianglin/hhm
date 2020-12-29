<!--党群门户-->
<template>
  <div class="more-list">
    <div class="search">
      <!-- <div class="search-bar">
        <p class="search-title">查询条件</p>
      </div> -->
      <el-form
        :inline="true"
        :model="queryModel"
        size="small"
        style="margin-top:15px"
      >
      <el-form-item v-show="options.length > 0" label="分类选择" >

          <el-select v-model="queryModel.sstype" placeholder="请选择" style="width: 200px;" @change="reloadData">
              <el-option label="ALL" value=""></el-option>
              <el-option
                      v-for="item in options"
                      :key="item.type"
                      :label="item.title"
                      :value="item.type"
              >
              </el-option>
          </el-select>
      </el-form-item>
        <el-form-item label="标题名称"style="margin-left:10px">
          <el-input
            v-model="queryModel.title"
            placeholder="请输入标题名称"
            clearable
            style="width: 200px;"
          ></el-input>
        </el-form-item>
        <el-form-item label="部门名称" style="margin-left:10px">
          <el-input
            v-model="queryModel.orgname"
            placeholder="请输入部门名称"
            clearable
            style="width: 200px;"
          ></el-input>
        </el-form-item>
        <div class="btn-wrapper">
          <el-button
            size="mini"
            class="btn"
            icon="el-icon-search"
            @click="loadData"
            >搜索</el-button
          >
          <el-button
            size="mini"
            class="btn"
            icon="el-icon-refresh-left"
            @click="resetQuery"
            >重置</el-button
          >
        </div>
      </el-form>
    </div>
    <div class="table-content">
      <template v-if="tableData.length > 0">
        <!--新闻-->
        <!-- <div class="news-content" v-if="$route.query.stype === 'news'">
          <div
            class="simple-news"
            v-for="(item, index) in tableData"
            :key="`news-${index}`"
            @click="loadNoticeInfo(item)"
          >
            <p class="simple-news-title">
              {{ item.title }}
            </p>
            <span v-if="item.isread === '0'" class="new-tip">NEW</span>
            <p class="simple-news-date">{{ item.createtime }}</p>
          </div>
        </div> -->
        <!--公告-->
        <div class="notice-content">
          <template v-for="(item, index) in tableData">
            <div
              class="notice-line"
              :key="`notice-${index}`"
              @click="loadNoticeInfo(item)"
            >
              <span
                class="top-tip"
                v-if="item.istop === 'Y'"
                :style="{ background: index === 0 ? '#EC554F' : '#F1AF10' }"
                >TOP{{ index + 1 }}</span
              >
              <p
                class="title"
                :style="{
                  maxWidth: getWidth(item.istop, item.isread)
                }"
              >
                {{ item.title }}
              </p>
              <!-- v-if="item.isread === '0'" -->
              <!--<span class="new-tip">NEW</span>-->
              <span v-if="item.isread === '0'" class="new-tip">NEW</span>
              <p class="date">{{ item.updatetime }}</p>
            </div>
          </template>
        </div>
      </template>
      <p v-else class="none-tip">暂无数据</p>
      <!-- <el-table
        v-loading="loading"
        :data="tableData"
        @sort-change="sortChange"
        style="width: 100%"
        size="small"
        border
        resizable
        header-cell-class-name="el-table-header-bg"
      >
        <el-table-column prop="title" label="标题"></el-table-column>
        <el-table-column prop="createtime" label="时间" width="200" sortable>
        </el-table-column>
      </el-table> -->
      <el-pagination
        class="pagination"
        @size-change="sizeChange"
        @current-change="currentChange"
        :current-page="queryModel.pageIndex"
        :page-sizes="[10, 20, 50, 100]"
        :page-size="queryModel.pageSize"
        layout="total, sizes, prev, pager, next, jumper"
        background
        :total="queryModel.total"
      />
    </div>
  </div>
</template>

<script lang="ts">
import {
  Button,
  Form,
  FormItem,
  Input,
  Select,
  Option,
  Table,
  TableColumn,
  Pagination,
  Loading
} from "element-ui";
import { Component, Prop, Vue } from "vue-property-decorator";
import { getNoticePageDate } from "@api/index.ts";
Vue.use(Loading.directive);
Vue.prototype.$loading = Loading.service;

@Component({
  components: {
    [Button.name]: Button,
    [Form.name]: Form,
    [FormItem.name]: FormItem,
    [Input.name]: Input,
    [Select.name]: Select,
    [Option.name]: Option,
    [Table.name]: Table,
    [TableColumn.name]: TableColumn,
    [Pagination.name]: Pagination
  }
})
export default class MoreList extends Vue {
  private queryModel: any = {
    sstype: "",
    title: "",
    orgname: "",
    pageIndex: 1,
    pageSize: 10,
    total: 0
  };
  private loading: boolean = false;
  private tableData: object[] = [];
  private options: object[] = [];

  // 获取样式宽度
  getWidth(istop: string, isread: string) {
    if (istop === "Y" && isread === "0") {
      return "calc(100% - 200px)";
    } else if (istop === "Y" || isread === "0") {
      return "calc(100% - 165px)";
    } else {
      return "calc(100% - 125px)";
    }
  }

  resetQuery() {
    this.queryModel.sstype = "";
    this.queryModel.title = "";
    this.queryModel.orgname = "";
    this.loadData();
  }
  sizeChange(val: any) {
    this.queryModel.pageSize = val;
    this.loadData();
  }
  currentChange(val: any) {
    this.queryModel.pageIndex = val;
    this.loadData();
  }
  sortChange({ prop, order }: any) {
    this.queryModel.sortField = prop;
    this.queryModel.sortOrder = order;
    this.queryModel.pageIndex = 1;
    this.loadData();
    // 后端排序
  }
  // 获取公告详细
  loadNoticeInfo(val: any) {
    console.log("loadNoticeInfo -> val", val);
    val.isread = "1";
    // 新开路由页面传参
    const routeData = this.$router.resolve({
      name: "notice_info",
      query: {
        id: val.id
      }
    });
    window.open(routeData.href, "_blank");
  }
  reloadData(val: string){
    this.queryModel.sstype = val;
    // 加载数据列表
    this.loadData();
  }
  loadData() {
    const params = {
      "criteria/_expr[4]/appCode": this.$route.query.appCode || "",
      "criteria/_expr[5]/sstype": this.queryModel.sstype,
      "criteria/_expr[3]/stype": this.$route.query.stype || "",
      "criteria/_expr[1]/title": this.queryModel.title,
      "criteria/_expr[1]/_op": "like",
      "criteria/_expr[1]/_likeRule": "all",
      "criteria/_expr[2]/orgname": this.queryModel.orgname,
      "criteria/_expr[2]/_op": "like",
      "criteria/_expr[2]/_likeRule": "all",
      pageIndex: this.queryModel.pageIndex - 1, // 后端分页是从0开始
      pageSize: this.queryModel.pageSize,
      sortField: this.queryModel.sortField,
      sortOrder: this.queryModel.sortOrder
    };
    this.loading = true;
    getNoticePageDate(params)
      .then((res: any) => {
        this.tableData = res.result;
        this.queryModel.total = res.total;
        this.loading = false;
      })
      .catch(() => {
        this.loading = false;
      });
  }
  mounted() {
    this.queryModel.sstype = this.$route.query.sstype;
    // 加载数据列表
    this.loadData();
    this.options = this.$route.query.data === undefined?[]:JSON.parse(this.$route.query.data.toString());
  }
}
</script>
<style lang="scss" scoped>
.more-list {
  width: 1190px;
  margin: 0 auto;
  padding: 20px;
  text-align: left;
  cursor: default;

  .search {
    width: 100%;
    padding: 25px 25px 10px 25px;
    background-color: #fff;
    box-shadow: 0 0 13px 0 rgba(0, 0, 0, 0.07);
    border-radius: 8px;

    &-bar {
      width: 100%;
      height: 30px;

      .search-title {
        float: left;
        font-size: 16px;
        font-weight: bold;
        color: #333;
        line-height: 30px;
      }
      // .btn-wrapper {
      //   float: right;
      //   height: 100%;
      // }
    }
    .btn-wrapper {
      float: right;
      height: 100%;
    }
  }

  .table-content {
    position: relative;
    width: 100%;
    margin: 50px 0 0 0;
    padding: 20px 10px;
    background-color: #fff;
    box-shadow: 0 0 13px 0 rgba(0, 0, 0, 0.07);
    border-radius: 8px;

    .pagination {
      margin: 25px 0 0 0;
      text-align: right;
    }
  }

  .btn {
    height: 30px !important;
    margin: 0 0 0 15px;
    border: 1px solid #dcdfe6;
    background-color: #fff;
    color: #606266;

    &:hover {
      border: 1px solid #151836;
      background-color: #151836;
      color: #fff;
    }
  }

  //element表头添加样式，header-cell-class-name
  /deep/.el-table-header-bg {
    background-color: #f5f7fa !important;
  }

  .notice-content {
    .notice-line {
      width: 100%;
      padding: 0 10px;
      height: 40px;
      line-height: 40px;
      text-align: left;
      cursor: pointer;

      &:hover {
        background-color: #f9f9f9;
        .title {
          color: #4192f7 !important;
        }
      }

      .title {
        float: left;
        font-size: 13px;
        color: #414141;
        overflow: hidden;
        text-overflow: ellipsis;
        white-space: nowrap;
      }
      .date {
        width: 100px;
        float: right;
        font-size: 13px;
        color: #9fa5b3;
        text-align: right;
      }
    }
  }

  .news-content {
    width: 100%;
    .simple-news {
      width: 100%;
      padding: 0 10px;
      font-size: 13px;
      height: 40px;
      line-height: 40px;
      text-align: left;
      cursor: pointer;

      &:hover {
        background-color: #f9f9f9;
        .simple-news-title {
          color: #4192f7;
        }
      }

      &-title {
        float: left;
        max-width: calc(100% - 170px);
        color: #414141;
        overflow: hidden;
        text-overflow: ellipsis;
        white-space: nowrap;
        text-align: left;
      }
      &-date {
        width: 120px;
        float: right;
        font-size: 13px;
        color: #9fa5b3;
        text-align: right;
      }
    }
  }
  .top-tip {
    float: left;
    width: auto;
    height: 20px;
    margin: 9.5px 10px 0 -5px;
    padding: 0 5px;
    line-height: 20px;
    background: linear-gradient(0deg, #ec554f 0%, #ec554f 100%);
    border-radius: 2px;
    color: #fff;
    font-size: 12px;
    text-align: center;
    transform: scale(0.7);
  }
  .new-tip {
    display: inline-block;
    vertical-align: text-top;
    margin-left: 10px;
    width: 36px;
    height: 20px;
    line-height: 20px;
    background: linear-gradient(0deg, #ec554f 0%, #ec554f 100%);
    border-radius: 2px;
    color: #fff;
    font-size: 12px;
    text-align: center;
    transform: scale(0.55);
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
</style>
