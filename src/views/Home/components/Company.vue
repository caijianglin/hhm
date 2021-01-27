<template>
<div class="company">
  <div class="content-box schedule" id="schedule" style="height:330px;">
    <div class="title-line" style="margin-bottom:5px">
      <p class="title">日程安排（<span style="color: red">{{ dayTask }}</span>）</p>
      <!-- <p class="load-more">更多</p> -->
    </div>
    <calendar @update-task="updateNeedTodo" />
  </div>
  <div class="content-box to-do-list" id="todo-list" style="height:330px">
    <div class="title-line tab-line" style="float: right">
      <!--<p class="title">待办事项（<span style="color: red">{{ needTodo }}</span>）</p>-->

        <a class="load-more" @click="TODOListLoadMore">
            更多
        </a>

    </div>
      <el-tabs @tab-click="handleTabClick" v-model="dbTabName" class="tabs">
          <el-tab-pane :label="'待办事项（'+needTodo+'）'" name="todolist">
              <div class="list-wrapper" v-if="needTodolList.length > 0">
                  <div class="todo-line" v-for="(item, index) in needTodolList.slice(0, 9)" :key="`todo-${index}`">
                    <span class="title" :style="{
                          color: item.isTimeOut === 'Y' ? '#EC5550' : '#414141',
                          maxWidth:
                            item.isTimeOut === 'Y'
                              ? 'calc(100% - 120px)'
                              : 'calc(100% - 140px)'
                        }" @click="itemLinkTo(jspUrl, 'jsp', item)">
                      {{ item.processInstName }}
                        <span class="type3" v-if="item.companyName">{{ item.companyName }}</span>
                        <span class="type2" v-if="item.bpfName">{{ item.bpfName }}</span>
                        <span class="type">{{ item.workItemName }}</span>
                        </span>

                      <span class="warning" v-if="item.isTimeOut === 'Y'">超时</span>

                      <span class="date">{{ item.startTime }}</span>
                  </div>
              </div>
              <p v-else class="none-tip">暂无数据</p>
          </el-tab-pane>
          <el-tab-pane label="我的已办" name="dolist">
              <div class="list-wrapper" v-if="finishedTodolList.length > 0">
                  <div class="todo-line" v-for="(item, index) in finishedTodolList.slice(0, 9)" :key="`todo-${index}`">
                    <span class="title" :style="{
                          color: item.isTimeOut === 'Y' ? '#EC5550' : '#414141',
                          maxWidth:
                            item.isTimeOut === 'Y'
                              ? 'calc(100% - 120px)'
                              : 'calc(100% - 140px)'
                        }" @click="itemLinkTo(jspFinishedUrl, 'jsp', item)">
                      {{ item.processInstName }}
                        <span class="type3" v-if="item.companyName">{{ item.companyName }}</span>
                        <span class="type2" v-if="item.bpfName">{{ item.bpfName }}</span>
                        <span class="type">{{ item.workItemName }}</span>
                      </span>

                      <span class="warning" v-if="item.isTimeOut === 'Y'">超时</span>
                      <span class="date">{{ item.startTime }}</span>
                  </div>
              </div>
              <p v-else class="none-tip">暂无数据</p>
          </el-tab-pane>
          <el-tab-pane :label="'未阅通知（'+unviewdTotal+'）'" name="unviewedNotices">
              <div class="list-wrapper" v-if="unviewedNoticelList.length > 0">
                  <div class="todo-line" v-for="(item, index) in unviewedNoticelList.slice(0, 9)" :key="`todo-${index}`">
                    <span class="title" :style="{
                          color: item.isTimeOut === 'Y' ? '#EC5550' : '#414141',
                          maxWidth:
                            item.isTimeOut === 'Y'
                              ? 'calc(100% - 120px)'
                              : 'calc(100% - 140px)'
                        }" @click="itemLinkTo(jspUnNoticeUrl, 'jsp', item)">
                      {{ item.title }}
                        <span class="type">{{ item.message }}</span>
                      </span>

                      <span class="warning" v-if="item.isTimeOut === 'Y'">超时</span>
                      <span class="date">{{ item.createTime }}</span>
                  </div>
              </div>
              <p v-else class="none-tip">暂无数据</p>
          </el-tab-pane>
          <el-tab-pane label="已阅通知" name="viewedNotices">
              <div class="list-wrapper" v-if="viewedNoticelList.length > 0">
                  <div class="todo-line" v-for="(item, index) in viewedNoticelList.slice(0, 9)" :key="`todo-${index}`">
                    <span class="title" :style="{
                          color: item.isTimeOut === 'Y' ? '#EC5550' : '#414141',
                          maxWidth:
                            item.isTimeOut === 'Y'
                              ? 'calc(100% - 120px)'
                              : 'calc(100% - 140px)'
                        }" @click="itemLinkTo(jspNoticeUrl, 'jsp', item)">
                      {{ item.title }}
                        <span class="type">{{ item.message }}</span>
                      </span>

                      <span class="warning" v-if="item.isTimeOut === 'Y'">超时</span>
                      <span class="date">{{ item.createTime }}</span>
                  </div>
              </div>
              <p v-else class="none-tip">暂无数据</p>
          </el-tab-pane>
      </el-tabs>

  </div>
  <div class="content-box personal-area" style="height:330px">
    <div class="title-line">
      <p class="title">快捷入口</p>
      <!-- <p
          v-if="personalList.length > 0"
          class="load-more"
          @click="loadMore('personal', personalList)"
        >
          更多
        </p> -->
      <div v-if="personalList.length > 0" class="edit" @click="
            delIconVisible = !delIconVisible;
            editLabel = editLabel === '编辑' ? '完成' : '编辑';
          ">
        <svg-icon class="icon-edit" icon-class="edit"></svg-icon>
        <span>{{ editLabel }}</span>
      </div>
    </div>
    <div class="tools-wrapper">
      <p v-if="!personalList.length > 0" class="none-tip">快去添加吧</p>
      <template v-else>
        <div :id="`personal-${item.id}`" class="tools-item" :title="item.name" v-for="(item, index) in personalList.slice(0, 12)" :key="`personal-${item.id}`" @click="
              item.stype === 'tools'
                ? toolsClick(item, 'personal')
                : itemLinkTo(item.url ? item.url : item.linkAction, item.stype)
            ">
          <img class="icon" :src="`${item.icon}`" alt="" />
          <p class="label">{{ item.name || "" }}</p>
          <svg-icon v-if="delIconVisible" class="icon-delete" icon-class="delete" @click.stop="delPersonalItem(item, index)"></svg-icon>
        </div>
      </template>
      <!--弹窗展示更多-->
      <more-data-dialog v-show="personalMoreDataDialogVisible" @close.stop="personalMoreDataDialogVisible = false">
        <div style="display:flex;flex-wrap:wrap" v-if="personalList.length > 0">
          <div :id="`dialog-personal-${item.id}`" class="tools-item" :title="item.name" style="width:70px" v-for="(item, index) in personalList" :key="`dialog-personal-${item.id}`" @contextmenu.prevent="openMenu($event, item)" @click="
                item.stype === 'tools'
                  ? toolsClick(item, 'personal')
                  : itemLinkTo(
                      item.url ? item.url : item.linkAction,
                      item.stype
                    )
              ">
            <img class="icon" :src="`${item.icon}`" alt="" />
            <p class="label">{{ item.name || "" }}</p>
          </div>
        </div>
      </more-data-dialog>
      <!-- <div class="tools-item">
              <svg-icon class="icon add" icon-class="add"></svg-icon>
              <p class="label">添加更多</p>
            </div> -->
    </div>
  </div>
  <!--<div class="content-box charts">
      <div class="title-line">
        <p class="title">数据看板</p>
        &lt;!&ndash; <p class="load-more">更多</p> &ndash;&gt;
      </div>
      <p class="none-tip">敬请期待</p>
      &lt;!&ndash; <div id="charts" style="width: 100%;height:240px;"></div> &ndash;&gt;
    </div>-->
  <div class="content-box management-list">
    <div class="title-line">
      <p class="title">功能列表</p>
      <p class="load-more" @click="loadMore('management', managementList)">
        更多
      </p>
    </div>

    <div class="tools-wrapper" v-if="managementList.length > 0">
      <div :id="`management-${item.menuCode}`" class="tools-item" :title="item.name" v-for="(item, index) in managementList.slice(0, 9)" :key="`management-${index}`" @contextmenu.prevent="openMenu($event, item)">
        <img class="icon" :src="`${item.imagePath}`" alt="" />
        <p class="label">{{ item.menuName }}</p>
      </div>
      <!--弹窗展示更多, 必须得用v-show才能加上tippy-->
      <more-data-dialog v-show="managementMoreDataDialogVisible" @close.stop="managementMoreDataDialogVisible = false">
        <div style="display:flex;flex-wrap:wrap">
          <div :id="`dialog-management-${item.menuCode}`" class="tools-item" :title="item.name" style="width:80px" v-for="(item, index) in managementList" :key="`dialog-management-${index}`" @contextmenu.prevent="openMenu($event, item)">
            <img class="icon" :src="`${item.imagePath}`" alt="" />
            <p class="label">{{ item.menuName }}</p>
          </div>
        </div>
      </more-data-dialog>
      <!-- <el-popover
              placement="right"
              trigger="hover"
            >
              <p
                class="child-menu"
                v-for="(child, index) in item.childrenMenuTreeNodeList"
                :key="`child-menu-${index}`"
                @click="childrenMenuTreeNodeClick(child)"
              >
                {{ child.menuName }}
              </p>
            </el-popover> -->
    </div>
    <p v-else class="none-tip">暂无数据</p>
  </div>
  <div class="content-box notice">
    <div class="title-line tab-line">
      <!--<ul class="tabs">-->
        <!--<li v-for="(tab, index) in noticeTabData" :key="`notice-${index}`" :class="[noticeActiveTab === tab.type ? 'active' : '']" @click="noticeTabChange(tab, index)">-->
          <!--{{ tab.title }}-->
        <!--</li>-->
      <!--</ul>-->
      <router-link tag="a" target="_blank" :to="{ path: 'more_list', query: { appCode: appCode,stype: 'ad',sstype:noticeActiveTab,data:JSON.stringify(noticeTabData) } }" class="load-more">更多</router-link>
    </div>

      <el-tabs v-model="noticeActiveTab" @tab-click="noticeTabChange" class="tabs">
          <el-tab-pane :label="`${tab.title}`" v-for="(tab, index) in noticeTabData" :name="`${tab.type}`"></el-tab-pane>
      </el-tabs>
    <div class="notice-content" style="margin-top: 0;padding: 0;">
      <template v-if="noticeDate.length > 0">
        <template v-for="(item, index) in noticeDate">
          <div v-if="item.sstype === noticeActiveTab" class="notice-line" :key="`notice-${index}`" @click="loadNoticeInfo(item)">
            <span class="top-tip" v-if="item.istop === 'Y'" :style="{ background: index === 0 ? '#EC554F' : '#F1AF10' }">TOP{{ index + 1 }}</span>
            <p class="title" :style="{
                  maxWidth: getWidth(item.istop, item.isread)
                }">
              {{ item.title }}
            </p>
            <span v-if="item.isread === '0'" class="new-tip">NEW</span>
            <p class="date">{{ item.updatetime }}</p>
          </div>
        </template>
      </template>
      <p v-else class="none-tip">暂无数据</p>
    </div>
  </div>
  <div class="content-box tools-list" style="height:250px">
    <div class="title-line">
      <p class="title">便捷工具</p>
      <p class="load-more" @click="loadMore('tools', toolsList)">
        更多
      </p>
    </div>
    <div class="tools-wrapper" v-if="toolsList.length > 0">
      <div class="tools-item" :title="item.name" style="height:65px;padding:8px 0" v-for="(item, index) in toolsList.slice(0, 9)" :key="`tools-${index}`" @contextmenu.prevent="openMenu($event, item)" @click="toolsClick(item)">
        <img class="icon" :src="`${item.icon}`" alt="" />
        <p class="label">{{ item.name }}</p>
      </div>

      <!--弹窗展示更多-->
      <more-data-dialog v-show="toolsMoreDataDialogVisible" @close.stop="toolsMoreDataDialogVisible = false">
        <div style="display:flex;flex-wrap:wrap">
          <div class="tools-item" :title="item.name" style="width:80px;height:80px;padding:12px 0" v-for="(item, index) in toolsList" :key="`dialog-tools-${index}`" @contextmenu.prevent="openMenu($event, item)" @click="toolsClick(item)">
            <img class="icon" :src="`${item.icon}`" alt="" />
            <p class="label">{{ item.name }}</p>
          </div>
        </div>
      </more-data-dialog>
    </div>
    <p v-else class="none-tip">暂无数据</p>
  </div>
  <!--弹窗展示公告或新闻详细-->
  <!-- <more-data-dialog
      v-if="noticeInfoDialogVisible"
      @close.stop="noticeInfoDialogVisible = false"
    >
      <div class="notice-info">
        <h1>{{ currentNoticeInfo.info.title || "" }}</h1>
        <p class="note">
          <span>部门：{{ currentNoticeInfo.info.orgname || "" }}</span>
          <span>作者：{{ currentNoticeInfo.info.ownername || "" }}</span>
          <span>时间：{{ currentNoticeInfo.info.createtime || "" }}</span>
        </p>
        <p class="text">{{ currentNoticeInfo.info.body || "" }}</p>
        <div
          class="action-bar clearfix"
          v-if="currentNoticeInfo.files.length > 0"
        >
          <span>相关附件：</span>
          <div
            class="file-btn"
            v-for="file in currentNoticeInfo.files"
            :key="file.documentid"
            @click="viewFile(file.documentid)"
          >
            {{ file.documentname || "" }}
          </div>
        </div>
      </div>
    </more-data-dialog> -->
  <div class="content-box system-list" style="height:250px">
    <div class="title-line">
      <p class="title">专业系统</p>
      <p class="load-more" @click="loadMore('system', systemList)">
        更多
      </p>
    </div>
    <div class="tools-wrapper" v-if="systemList.length > 0">
      <div class="tools-item" :title="item.name" style="height:65px;padding:12px 0" v-for="(item, index) in systemList.slice(0, 9)" :key="`system-${index}`" @contextmenu.prevent="openMenu($event, item)" @click="itemLinkTo(item.url, item.stype)">
        <img class="icon" :src="`${item.icon}`" alt="" />
        <p class="label">{{ item.name }}</p>
      </div>
      <!--弹窗展示更多-->
      <more-data-dialog v-show="systemMoreDataDialogVisible" @close.stop="systemMoreDataDialogVisible = false">
        <div style="display:flex;flex-wrap:wrap">
          <div class="tools-item" :title="item.name" style="width:80px;height:80px;padding:12px 0" v-for="(item, index) in systemList" :key="`dialog-system-${index}`" @contextmenu.prevent="openMenu($event, item)" @click="itemLinkTo(item.url, item.stype)">
            <img class="icon" :src="`${item.icon}`" alt="" />
            <p class="label">{{ item.name }}</p>
          </div>
        </div>
      </more-data-dialog>
    </div>
    <p v-else class="none-tip">暂无数据</p>
  </div>
  <div class="content-box news">
    <div class="title-line">
      <p class="title">新闻动态</p>
      <router-link tag="a" target="_blank" :to="{ path: 'more_list', query: { appCode: appCode,stype: 'news' } }" class="load-more">更多</router-link>
    </div>
    <div class="news-content">
      <div class="new-news clearfix">
        <img v-if="newsImgData.imgId" class="new-news-img" :src="`/FileDownLoadDiskServlet?fileid=${newsImgData.imgId}`" @click="loadNoticeInfo({ id: newsImgData.newId })" alt="" />
        <div v-if="newsImgData.imgId" class="new-news-line clearfix">
          <div class="simple-news" v-for="(item, index) in newsData.slice(0, 3)" :key="`news-${index}`" @click="loadNoticeInfo(item)">
            <span class="top-tip" v-if="item.istop === 'Y'" :style="{
                  background: index === 0 ? '#EC554F' : '#F1AF10'
                }">TOP{{ index + 1 }}</span>
            <p class="simple-news-title" :style="{
                  maxWidth: getWidth(item.istop, item.isread)
                }">
              {{ item.title }}
            </p>
            <span v-if="item.isread === '0'" class="new-tip">NEW</span>
            <p class="simple-news-date">{{ item.createtime }}</p>
          </div>
        </div>
      </div>
      <template v-if="newsData.length > 0">
        <div class="simple-news" v-for="(item, index) in newsImgData.imgId
              ? newsData.slice(3, 6)
              : newsData.slice(0, 6)" :key="`news-${index}`" @click="loadNoticeInfo(item)">
          <span class="top-tip" v-if="item.istop === 'Y'" :style="{
                background: index === 0 ? '#EC554F' : '#F1AF10'
              }">TOP{{ index + 1 }}</span>
          <p class="simple-news-title" :style="{
                maxWidth: getWidth(item.istop, item.isread)
              }">
            {{ item.title }}
          </p>
          <span v-if="item.isread === '0'" class="new-tip">NEW</span>
          <p class="simple-news-date">{{ item.createtime }}</p>
        </div>
      </template>
      <p v-else class="none-tip">暂无数据</p>
    </div>
  </div>
  <!--知识分享-->
  <div class="content-box share-info notice2" style="height:250px;width: 280px;">
    <div class="title-line tab-line">
      <!--<ul class="tabs">
        <li v-for="(tab, index) in shareTabData" :key="`notice-${index}`" :class="[activeShareTab === tab.type ? 'active' : '']" @click="shareTabChange(tab, index)">
          {{ tab.title }}
        </li>
      </ul>-->
        <el-tabs v-model="activeShareTab" @tab-click="shareTabChange" class="tabs">
            <el-tab-pane :label="`${tab.title}`" v-for="(tab, index) in shareTabData" :name="`${tab.type}`"></el-tab-pane>
        </el-tabs>
      <router-link tag="a" target="_blank" :to="{ path: 'more_list', query: { appCode: appCode,stype: 'knowledge',sstype:activeShareTab,data:JSON.stringify(shareTabData)} }" class="load-more">更多</router-link>
    </div>
    <div class="notice-content">
      <template v-if="shareDate.length > 0">
        <template v-for="(item, index) in shareDate">
          <div v-if="item.sstype === activeShareTab" class="notice-line" :key="`notice-${index}`" @click="loadNoticeInfo(item)">
            <span class="top-tip" v-if="item.istop === 'Y'" :style="{ background: index === 0 ? '#EC554F' : '#F1AF10' }">TOP{{ index + 1 }}</span>
            <p class="title" :style="{
                  maxWidth: getWidth(item.istop, item.isread)
                }">
              {{ item.title }}
            </p>
            <span v-if="item.isread === '0'" class="new-tip">NEW</span>
            <p class="date">{{ item.updatetime }}</p>
          </div>
        </template>
      </template>
      <p v-else class="none-tip">暂无数据</p>
    </div>
  </div>
  <div v-show="false" class="content-box user-info">
    <div class="avatar-block clearfix">
      <div class="avatar">
        <img src="@assets/avatar.png" alt="" />
      </div>
      <div class="user-name">您好，{{ userInfo.empName || "" }}</div>
      <span class="edit-pwd" @click="eidtPwd">修改密码</span>
      <span class="logout" @click="logout">注销</span>
    </div>
    <div class="info-line clearfix">
      <div class="info-label">您的工号：</div>
      <div class="info-value">{{ userInfo.empCode || "" }}</div>
    </div>
    <div class="info-line clearfix">
      <div class="info-label">您的部门：</div>
      <div class="info-value">{{ userInfo.orgName || "-" }}</div>
    </div>
    <div class="info-line clearfix">
      <div class="info-label">问候语：</div>
      <div class="sign info-value" @dblclick="editSign">
        <span v-if="!editSignVisible">{{ userInfo.sign || "" }}</span>
        <el-input v-if="editSignVisible" size="mini" style="width:100%" placeholder="请输入问候语" v-model="userInfo.sign">
          <i slot="append" class="el-icon-check" @click="saveSign()"></i>
          <i slot="append" class="el-icon-close" @click="cancelSaveSign()"></i>
        </el-input>
      </div>
    </div>
    <div class="need-todo-button" @click="scrollTo('todo-list')">
      您的待办事项（{{ needTodo }}）
    </div>
    <div class="need-todo-button" @click="scrollTo('schedule')">
      您的日程任务（{{ dayTask }}）
    </div>
    <div class="info-line clearfix" style="margin-top:5px">
      <div class="info-label">最近日程：</div>
      <div class="info-value">{{ recentlySchedule }}</div>
    </div>
  </div>
  <!--右键弹窗-->
  <context-menu class="right-menu" :offset="menuOffset">
    <template v-slot:menuItem>
      <li @click="addToPersonal(currentData)">加入快捷入口</li>
    </template>
  </context-menu>
    <div style="height: 100vh;">
  <el-dialog
            top="5vh"
            :show-close="false"
            :visible.sync="todoIframeVisible"
            :close-on-click-modal="false"
            :lock-scroll="true"
            id="dialogClass"
            style="height:auto;"
            width="80%">
      <div slot="title" style="display: none;">{{jspIframeTitle}}</div>
      <iframe id="jIframe" :src="jspIframeUrl" frameborder="0" style="height: 90vh;width:100%;"
              ref="iframe"></iframe>
  </el-dialog>
    </div>
  <!-- <more-data-dialog
      v-if="jspDialogVisible"
      @close.stop="jspDialogVisible = false"
    >
      <iframe
        :src="jspIframeUrl"
        ref="jsp-iframe"
        id="jsp-iframe"
        frameborder="0"
      ></iframe>
    </more-data-dialog> -->
  <!--form表单提交，阻止打开action链接页面-->
  <iframe name="stop" style="display:none;"></iframe>
</div>
</template>

<script lang="ts">
import {
  Component,
  Prop,
  Vue,
  Watch
} from "vue-property-decorator";
import {
  Getter
} from "vuex-class";
import tippy from "tippy.js";
import 'tippy.js/dist/tippy.css';
// import echarts from "echarts";
import {
  Icon,
  Input,
  Dialog,
  Tabs,
  TabPane
} from "element-ui";
import Calendar from "@components/Calendar/index.vue";
import MoreDataDialog from "@components/MoreDataDialog/index.vue";
import ContextMenu from "@components/ContextMenu/index.vue";
import {
  getAdZsDict,
  getTodoAmount,
  queryRecentlySchedule,
  getDayTaskAmount,
  getPersonalList,
  delPersonalList,
  addToPersonalList,
  getManagementList,
  getNeedTodoList,
  getFinishedTodoList,
  getNotificationList,
  getNotificationedList,
  getNoticeDate,
  getToolList,
  // getNoticeInfo,
  downloadFile,
  signEdit
} from "@api/index.ts";
import Login from "../../Login/index.vue";
let vm: any = null;

// Vue.use(Popover);

@Component({
  components: {
    Calendar,
    MoreDataDialog,
    ContextMenu,
    [Input.name]: Input,
    [Icon.name]: Icon,
    [Dialog.name]: Dialog,
    [Tabs.name]: Tabs,
    [TabPane.name]: TabPane,
    // Popover
  }
})
export default class Company extends Vue {
  @Prop({
    default: null,
    type: Number
  })
  activeTabIndex!: number;
  @Prop({
    default: '1000',
    type: String
  })
  companyName!: string;
  private moreData: object[] = [];
  private userInfo: object = {
    empName: "",
    empCode: "",
    orgName: "",
    sign: ""
  };
  private task: object = {
    needTodo: 0,
    task: 0
  };
  private dbTabName: string = "todolist";
  private recentlySchedule: string = "";
  private needTodo: string | number = 0;
  private unviewdTotal: string | number = 0;
  private dayTask: string | number = 0;
  private personalList: object[] = [];
  private delIconVisible: boolean = false;
  private todoIframeVisible: boolean = false;
  private editLabel: string = "编辑";
  private allManagementList: object[] = [];
  private managementList: object[] = [];
  // private currentMenus: object[] = [];
  private menuOffset: any = {
    clientX: 0,
    clientY: 0
  };
  private currentData: object = {};
  private newsImgData: any = {
    imgId: ""
  };

  private newsData: object[] = [];
  private needTodolList: object[] = [];
  private finishedTodolList: object[] = [];
  private unviewedNoticelList: object[] = [];
  private viewedNoticelList: object[] = [];
  private unviewNotices: object[] = [];
  private viewedNotices: object[] = [];
  private shareTabData: object[] = [];
    /*[{
      title: "知识简报",
      type: "ZSJB"
    },
    {
      title: "两化融合动态",
      type: "LHRHDT"
    },
    {
      title: "保密专栏",
      type: "BMZL"
    },
    {
      title: "值班信息",
      type: "ZBXX"
    }
  ];*/
  private activeShareTab: string = "ZSJB";

  private shareDate: object[] = [];

  private noticeTabData: object[] = [];
    /*[{
      title: "公司公告",
      type: "com_notice"
    },
    {
      title: "技术动态",
      type: "tech_state"
    },
    {
      title: "生产动态",
      type: "prud_state"
    },
    {
      title: "安全保卫动态",
      type: "security_guard"
    },
    {
      title: "质量动态",
      type: "quality_state"
    },
    {
      title: "经营动态",
      type: "manage_state"
    }
  ];*/
  private systemList: object[] = [];
  /*[
        {
          code: "TYBM",
          name: "统一编码",
          url: "http://172.10.6.62:8080/ccode/login.jsp",
          stype: "system",
          icon: "编码.png"
        },
        {
          code: "PDM",
          name: "PDM(TC8.3)",
          url: "http://192.168.146.50:8888/tc/webclient",
          stype: "system",
          icon: "pdm.png"
        },
        {
          code: "WMS",
          name: "WMS",
          url: "http://192.168.139.24",
          stype: "system",
          icon: "WMS2.png"
        },
        {
          code: "MES",
          name: "MES(中高速机)",
          url: "http://192.168.146.19:8080/mes-web",
          stype: "system",
          icon: "mes (2).png"
        },
        {
          code: "EAM",
          name: "EAM",
          url: "http://eam.hhm.com.cn:8000/hdzj/index.jsp",
          stype: "system",
          icon: "EAM.png"
        },
        {
          code: "LMS",
          name: "LMS",
          url: "http://192.168.139.31:8080/ibms/login.jsp",
          stype: "system",
          icon: "TDM.png"
        },
        {
          code: "DAXT",
          name: "档案系统",
          url: "http://192.168.146.79:8080/esoaisapp",
          stype: "system",
          icon: "档案1.png"
        },
        {
          code: "SZTSG",
          name: "数字图书馆",
          url: "http://192.168.146.157/",
          stype: "system",
          icon: "图书馆.png"
        },
        {
          code: "JSFWS",
          name: "技术服务室管理系统",
          url: "http://service.hhm.com.cn",
          stype: "system",
          icon: "技术服务.png"
        },
        {
          code: "ZBBJX",
          name: "质保部绩效管理系统",
          url: "http://qa.hhm.com.cn",
          stype: "system",
          icon: "质保绩效.png"
        },
        {
          code: "JSZL",
          name: "技术资料(Ti、SB)",
          url: "http://192.168.146.122/newpage/tech_list.htm",
          stype: "system",
          icon: "技术资料.png"
        }
      ];*/
  private noticeActiveTab: string = "com_notice";

  private noticeDate: object[] = [];
  // private currentNoticeInfo: object = {};
  private toolsList: object[] = [];
  /*[
        {
          code: "CZZN",
          name: "操作指南",
          url: "",
          files: [
            {
              title: "1、OA流程代理的设置方法.pdf",
              url: "/portal/bjgjFile/操作指南/1、OA流程代理的设置方法.pdf",
              time: "2020-03-24",
              type: "pdf"
            },
            {
              title: "2、附件1：内网账号申请流程.pdf",
              url: "/portal/bjgjFile/操作指南/2、附件1：内网账号申请流程.pdf",
              time: "2020-03-24",
              type: "pdf"
            },
            {
              title: "2、附件2：用户账号、密码和基本信息操作指南.pdf",
              url: "/portal/bjgjFile/操作指南/2、附件2：用户账号、密码和基本信息操作指南.pdf",
              time: "2020-03-24",
              type: "pdf"
            },
            {
              title: "2、员工账号与权限开通说明.pdf",
              url: "/portal/bjgjFile/操作指南/2、员工账号与权限开通说明.pdf",
              time: "2020-03-24",
              type: "pdf"
            },
            {
              title: "3、二次验证及客户端专用密码配置.pdf",
              url: "/portal/bjgjFile/操作指南/3、二次验证及客户端专用密码配置.pdf",
              time: "2020-03-24",
              type: "pdf"
            },
            {
              title: "4、智通网X3安装指南.pdf",
              url: "/portal/bjgjFile/操作指南/4、智通网X3安装指南.pdf",
              time: "2020-03-24",
              type: "pdf"
            },
            {
              title: "5、智通网企业邮局客户端安装指南-电脑端.pdf",
              url: "/portal/bjgjFile/操作指南/5、智通网企业邮局客户端安装指南-电脑端.pdf",
              time: "2020-03-24",
              type: "pdf"
            },
            {
              title: "6、智通网用友NC财务系统安装指南.pdf",
              url: "/portal/bjgjFile/操作指南/6、智通网用友NC财务系统安装指南.pdf",
              time: "2020-03-24",
              type: "pdf"
            },
            {
              title: "6、智通网用友NC财务系统安装指南-网页版.pdf",
              url: "/portal/bjgjFile/操作指南/6、智通网用友NC财务系统安装指南-网页版.pdf",
              time: "2020-03-24",
              type: "pdf"
            }
          ],
          stype: "tools",
          icon: "help.png"
        },
        {
          code: "ZZJG",
          name: "组织机构",
          url: "",
          files: [
            {
              title: "组织机构.jpg",
              url: "/portal/bjgjFile/组织机构.jpg",
              time: "2020-03-24"
            }
          ],
          stype: "tools",
          icon: "org.png"
        },
        {
          code: "TXL",
          name: "通讯录",
          url: "",
          files: [
            {
              title: "通讯录(2019).pdf",
              url: "/portal/bjgjFile/通讯录(2019).pdf",
              time: "2020-03-24",
              type: "pdf"
            }
          ],
          stype: "tools",
          icon: "addressBook.png"
        },
        {
          code: "XYJD",
          name: "协议酒店",
          url: "",
          files: [
            {
              title: "沪东重机有限公司协议酒店信息表2020.xls",
              url: "/portal/bjgjFile/共享资源/沪东重机有限公司协议酒店信息表2020.xls",
              time: "2020-03-24"
            }
          ],
          stype: "tools",
          icon: "e-m.png"
        },
        {
          code: "BCXX",
          name: "班车信息",
          url: "",
          files: [
          ],
          stype: "tools",
          icon: "schedule.png"
        },
        {
          code: "CP",
          name: "菜谱",
          url: "",
          files: [
          ],
          stype: "tools",
          icon: "email.png"
        }
      ];*/
  private personalMoreDataDialogVisible: boolean = false;
  private managementMoreDataDialogVisible: boolean = false;
  private systemMoreDataDialogVisible: boolean = false;
  private toolsMoreDataDialogVisible: boolean = false;
  private noticeInfoDialogVisible: boolean = false;

  // iframe弹窗的jsp页面url
  private jspUrl: string = "";
  private jspFinishedUrl: string="";
  private jspUnNoticeUrl: string="";
  private jspNoticeUrl: string="";
  private jspIframeUrl: string = "";
  private jspIframeTitle: string = "";
  private jspDialogVisible: boolean = false;
  private mInstances1: any[] = [];
  private mInstances2: any[] = [];

  private pInstances1: any[] = [];
  private pInstances2: any[] = [];
  private tippyArr: any[] = [];
  private tippyMap: any = {};

  // 新闻公告刷新定时器
  private newsTimer: any = null;
  // 问候语编辑状态
  private editSignVisible: boolean = false;
  private oldUserSign: string = "";
  private appCode: string = "10000000";
  // 监听tab切换
  @Watch('activeTabIndex')
  activeTabIndexOnChange(newVal: number, oldVal: number) {
    console.log(newVal + ":" + oldVal);
    // 判断newVal的值为哪个tab，刷新数据
    // if(newVal === 0){}
    // else if(newVal === 2){}
    // else {}
  }
  // 监听tab切换
  @Watch('companyName')
  nameOnChange(newVal: string, oldVal: string) {
    this.appCode = newVal;
    this.queryAdZsDict();
    this.loadNotice("news");
    this.loadNotice("ad");
    this.loadNotice("knowledge");
    this.queryManagementList();
    this.queryToolsList();
    this.querySystemList();
    // 判断newVal的值为哪个tab，刷新数据
    // if(newVal === 0){}
    // else if(newVal === 2){}
    // else {}
  }
  // 编辑问候语
  editSign() {
    this.oldUserSign = (this.userInfo as any).sign;
    this.editSignVisible = true;
  }

  // 编辑问候语保存
  saveSign() {
    signEdit({
        text: (this.userInfo as any).sign
      })
      .then(res => {
        this.editSignVisible = false;
        this.$store.dispatch("GetUserInfo");
      })
      .catch(() => {
        this.cancelSaveSign();
      });
  }
  cancelSaveSign() {
    (this.userInfo as any).sign = this.oldUserSign;
    this.editSignVisible = false;
  }

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

  // 修改密码
  eidtPwd() {
    this.$router.push("/reset_pwd");
    // window.open("/coframe/rights/user/update_password.jsp", "_blank");
    // window.open("/coframe/auth/login/logout.jsp", "_blank");
  }

  // 注销登录
  logout() {
    if (confirm("确定要退出当前账号吗？")) {
      this.$store.dispatch("FedLogOut").then(() => {
        // this.$router.push("/login");
        window.open("/coframe/auth/login/logout_pol.jsp", "_self");
      });
      //   let form = document.createElement("form"); //定义一个form表单
      //   form.style.display = "none";
      //   form.target = "";
      //   form.enctype = "multipart/form-data";
      //   form.method = "post";
      //   form.action = "/default/coframe/auth/login/logout.jsp";
      //   var input1 = document.createElement("input");
      //   input1.type = "text";
      //   input1.name = "_url";
      //   input1.value = window.location.href;

      //   document.body.appendChild(form); //将表单放置在web中
      //   form.appendChild(input1);

      //   form.submit(); //表单提交

      //   // this.$store.dispatch("FedLogOut").then(() => {
      //   //   this.$router.push("/login");
      //   // });
      // } else {
      //   return false;
    }
  }
  // 更新日程待办任务数量
  updateNeedTodo(val: number) {
    this.dayTask = Number(this.dayTask) + val;
    this.getRecentlySchedule();
  }
  updateWorkItemTodo() {
    getTodoAmount()
      .then((res: any) => {
        this.needTodo = res.total;
      })
      .catch(err => {
        console.log("onShow -> err", err);
      });
  }
  updateWorkItems() {
    getNeedTodoList()
      .then((res: any) => {
        this.needTodolList = res.result;
        this.jspUrl = res.formPath;
      })
      .catch(err => {
        console.log("onShow -> err", err);
      });
  }

  updateFinishedWorkItems() {
    getFinishedTodoList()
      .then((res: any) => {
        this.finishedTodolList = res.result;
        this.jspFinishedUrl = res.formPath;
      })
      .catch(err => {
        console.log("onShow -> err", err);
      });
  }

  updateUnNotifications() {
    getNotificationList()
      .then((res: any) => {
        this.unviewedNoticelList = res.notificationList;
        this.jspUnNoticeUrl = res.formPath;
        this.unviewdTotal = res.total;
      })
      .catch(err => {
        console.log("onShow -> err", err);
      });
  }
  updateNotifications() {
    getNotificationedList()
      .then((res: any) => {
        this.viewedNoticelList = res.notificationList;
        this.jspNoticeUrl = res.formPath;
      })
      .catch(err => {
        console.log("onShow -> err", err);
      });
  }
  // 快捷入口待办事项与日程任务锚点定位
  scrollTo(id: string) {
    const ele: any = document.getElementById(id);
    ele.scrollIntoView();
  }
  // 链接跳转
  itemLinkTo(url: string, type: string = "", item: any = "") {
    if (!url) {
      return false;
    }
    // 待办事项
    if (type && type === "jsp") {
      this.jspIframeUrl = `${url}`;
      this.jspIframeTitle = item.processInstName;
      this.todoIframeVisible = true;
      this.$nextTick(() => {
      const jspWinIframe: any = this.$refs.iframe;
        jspWinIframe.contentWindow.location.href = this.jspIframeUrl;
        // jspWinIframe.contentWindow.location.reload();
        // eslint-disable-next-line no-constant-condition
        if (!/*@cc_on!@*/ 0) {
          // if not IE
          jspWinIframe.onload = () => {
            // 加载完毕
            jspWinIframe.contentWindow.postMessage(item, "*",);
          };
        } else {
          jspWinIframe.onreadystatechange = () => {
            if (jspWinIframe.readyState === "complete") {
              // 加载完毕
              jspWinIframe.contentWindow.postMessage(item, "*",);
            }
          };
        }
      });
      /*this.$nextTick(() => {
        // 新开页面打开链接，postMessage方式调用新页面方法
        const jspWindow: any = window.open(this.jspIframeUrl);
        // eslint-disable-next-line no-constant-condition
        if (! /!*@cc_on!@*!/ 0) {
          // if not IE
          jspWindow.onload = () => {
            // 加载完毕
            jspWindow.postMessage(
              [item, "self", false],
              `http://${window.location.host}`
            );
          };
        } else {
          jspWindow.onreadystatechange = () => {
            if (jspWindow.readyState === "complete") {
              // 加载完毕
              jspWindow.postMessage(
                [item, "self", false],
                `http://${window.location.host}`
              );
            }
          };
        }
      });*/
    } else if (type && type === "system") {
      if(`${url}`.indexOf("protocol") > -1){
        window.open(`${url}`, "_self");
      }else{
        window.open(`${url}`, "_blank");
      }
    } else {
      window.open(`${url}`+"?companyCode="+this.companyName, "_blank");
    }
  }
  // 弹窗方式打开，已丢弃此方式
  // itemLinkTo(url: string, type: string = "", item: any = "") {
  //   if (!url) {
  //     return false;
  //   }
  //   // 相对路径写死个‘default’
  //   this.jspIframeUrl = `/default${url}`;
  //   this.jspDialogVisible = true;
  //   if (type && type === "jsp") {
  //     this.jspIframeUrl = `${url}?workItemID=${item.workItemID}`;
  //     this.$nextTick(() => {
  //       const jspWinIframe: any = this.$refs["jsp-iframe"];
  //       // eslint-disable-next-line no-constant-condition
  //       if (!/*@cc_on!@*/ 0) {
  //         // if not IE
  //         jspWinIframe.onload = () => {
  //           // 加载完毕
  //           jspWinIframe.contentWindow.initData(item, "self", false);
  //         };
  //       } else {
  //         jspWinIframe.onreadystatechange = () => {
  //           if (jspWinIframe.readyState === "complete") {
  //             // 加载完毕
  //             jspWinIframe.contentWindow.initData(item, "self", false);
  //           }
  //         };
  //       }
  //       // console.log(
  //       //   "Company -> itemLinkTo -> jspWinIframe.contentWindow",
  //       //   jspWinIframe.contentWindow
  //       // );
  //     });
  //   }
  // }

  // 便携工具点击事件
  toolsClick(item: any, from: string) {
    let files = item.files;
    // 快捷入口判断
    if (from && from === "personal") {
      const tIndex = this.toolsList.findIndex((val: any) => {
        return item.code === val.code;
      });
      files = (this.toolsList[tIndex] as any).files;
    }
    const routeData = this.$router.resolve({
      name: "files_list",
      params: {
        dataList: files
      }
    });
    const fileWin: any = window.open(routeData.href, "_blank");
    // eslint-disable-next-line no-constant-condition
    if (! /*@cc_on!@*/ 0) {
      // if not IE
      fileWin.onload = () => {
        // 加载完毕
        fileWin.sessionStorage.setItem("tools-files", JSON.stringify(files));
      };
    } else {
      fileWin.onreadystatechange = () => {
        if (fileWin.readyState === "complete") {
          // 加载完毕
          fileWin.sessionStorage.setItem("tools-files", JSON.stringify(files));
        }
      };
    }
  }
  // 待办事项更多事件
  TODOListLoadMore() {
    window.open("/bfp/pcf/client/tasklist/my_task.jsp", "_blank");
  }

  handleTabClick(tab: any,event: any){
    switch (tab.name) {
      case "todolist":
        this.updateWorkItemTodo();
        this.updateWorkItems();break;
      case "dolist":
        this.updateFinishedWorkItems();break;
      case "unviewedNotices":
        this.updateUnNotifications();break;
      case "viewedNotices":
        this.updateNotifications();break;
    }
  }
  // drawCharts() {
  //   const myChart = echarts.init(document.getElementById("charts"));
  //   const option = {
  //     title: {
  //       text: null,
  //       subtext: null
  //     },
  //     color: ["#87CBFF", "#879DFF", "#87E7FF"],
  //     tooltip: {
  //       trigger: "item",
  //       // formatter: "{a} <br/>{b} : {c} ({d}%)"
  //       formatter: "{b} : {c} ({d}%)"
  //     },
  //     legend: {
  //       show: true,
  //       bottom: 0
  //     },
  //     calculable: true,
  //     series: [
  //       {
  //         // name: "",
  //         label: {
  //           normal: {
  //             position: "inner",
  //             show: false
  //           }
  //         },
  //         type: "pie",
  //         radius: [50, 100],
  //         roseType: "area",
  //         data: [
  //           { value: 50, name: "请假" },
  //           { value: 30, name: "出差" },
  //           { value: 70, name: "出勤" }
  //         ]
  //       }
  //     ]
  //   };
  //   myChart.setOption(option);
  // }
  // 删除快捷入口项目
  delPersonalItem(item: any, index: number) {
    delPersonalList(item.id)
      .then(() => {
        this.personalList.splice(index, 1);
        // this.loadPersonalData();
      })
      .catch(err => {
        console.log("onShow -> err", err);
      });
  }
  // 右键菜单展示
  openMenu(e: any, data: any) {
    this.menuOffset.clientX = e.clientX;
    this.menuOffset.clientY = e.clientY;
    this.currentData = data;
  }
  // 添加到快捷入口
  addToPersonal(data: any) {
    // 快捷入口最多只能放几九个
    if (this.personalList.length >= 12) {
      alert("您的快捷入口空位已不足！");
      return false;
    }
    // 判断快捷入口是否已经存在该功能
    const inPersonal: number = this.personalList.findIndex((value: any) => {
      return value.code === (data.code || data.menuCode);
    });
    if (inPersonal !== -1) {
      alert("您的快捷入口已存在该功能！");
      return false;
    }
    const obj = {
      code: data.code || data.menuCode,
      name: data.name || data.menuName,
      url: data.url || data.linkAction,
      stype: data.stype || data.linkType,
      icon: data.icon || data.imagePath,
      files: data.files || null
    };
    console.log("addToPersonal -> obj", obj);
    addToPersonalList({
        data: obj
      })
      .then(res => {
        this.loadPersonalData();
      })
      .catch(err => {
        console.log("Home -> addToPersonal -> err", err);
      });
  }

  // 更多弹窗展示
  loadMore(type: string, data: object[]) {
    if (type === "personal") {
      this.personalMoreDataDialogVisible = true;
    } else if (type === "management") {
      this.managementMoreDataDialogVisible = true;
    } else if (type === "system") {
      this.systemMoreDataDialogVisible = true;
    } else if (type === "tools") {
      this.toolsMoreDataDialogVisible = true;
    }
  }
  // 获取快捷入口数据
  loadPersonalData() {
    // 获取快捷入口列表数据,并进行数据处理
    const mg: any = this.allManagementList;
    getPersonalList()
      .then((res: any) => {
        // this.managementList
        this.personalList = [];
        this.personalList = res.result.map((item: any) => {
          // 判断是否为功能列表模块
          if (item.stype === "function") {
            // 查找对应的功能列表模块数据拷贝
            const mgItemData = mg.find((mgItem: any) => {
              if (mgItem.menuCode === item.code) return mgItem;
            });
            // 合并数据
            return Object.assign({}, item, mgItemData);
          } else {
            return item;
          }
        });
        if(this.pInstances1.length > 0){
          this.pInstances1.forEach((item,index) =>{
            if(item !== undefined){
              item.destroy();
            }
          });
          /*for(let i = 0;i < this.pInstances1.length;i++){
            if(this.pInstances1[i] !== undefined){
              this.pInstances1[i].destroy();
            }
          }*/
          // instances1 = undefined;
          this.pInstances1 = new Array();
        }
        if(this.pInstances2.length > 0){
          this.pInstances2.forEach((item,index) =>{
            if(item !== undefined){
              item.destroy();
            }
          });
          /*for(let i = 0;i < this.pInstances2.length;i++){
            if(this.pInstances2[i] !== undefined){
              this.pInstances2[i].destroy();
            }
          }*/
          // instances2 = undefined;
          this.pInstances2 = new Array();
        }
        this.$nextTick(() => {
          // 增加tippy气泡操作
          this.addTippy(this.personalList, "personal",this.pInstances1,this.pInstances2);
        });
      })
      .catch(err => {
        console.log("onShow -> err", err);
      });
    // getPersonalList()
    //   .then((res: any) => {
    //     this.personalList = res.result;
    //   })
    //   .catch(err => {
    //     console.log("onShow -> err", err);
    //   });
  }
  // 获取公告详细
  loadNoticeInfo(val: any) {
    val.isread = "1";
    // 新开路由页面传参
    const routeData = this.$router.resolve({
      name: "notice_info",
      query: {
        id: val.id
      }
    });
    window.open(routeData.href, "_blank");
    // 当前页面弹窗查看公告，新闻详细，此方式已丢弃改为上面新页面展示
    // getNoticeInfo(val.id)
    //   .then((res: any) => {
    //     // this.currentNoticeInfo = {
    //     //   info: res.polNotice,
    //     //   files: res.files
    //     // };
    //     // this.noticeInfoDialogVisible = true;
    //     // 新开路由页面传参
    //     const routeData = this.$router.resolve({
    //       name: "notice_info",
    //       params: {
    //         info: res.polNotice,
    //         files: res.files
    //       }
    //     });
    //     window.open(routeData.href, "_blank");
    //   })
    //   .catch(err => {
    //     console.log("onShow -> err", err);
    //   });
  }
  // 预览附件
  // viewFile(id: string | number) {
  //   window.open(`/default/FileDownLoadServlet?fileid=${id}`);
  //   // downloadFile({ fileid: "9e4484e6-8799-4679-8e8e-d47b73a6ab2c" })
  //   //   .then()
  //   //   .catch(data => {
  //   //     console.log("Home -> viewFile -> data", data);
  //   //     // const url = window.URL.createObjectURL(data);
  //   //     window.open(data, "_blank");
  //   //   });
  // }
  // 加载新闻列表或公告列表与知识分享列表
  loadNotice(type: string) {
    getNoticeDate(type, this.appCode)
      .then((res: any) => {
        if (type === "news") {
          this.newsData = res.result.splice(0, 6);
          this.newsImgData = res.img;
        } else if (type === "ad") {
          this.noticeDate = res.result;
        } else {
          this.shareDate = res.result;
        }
      })
      .catch(err => {
        console.log("Home -> loadNotice -> err", err);
      });
  }
  // 公告tab切换
  noticeTabChange(item: any) {
    this.noticeActiveTab = item.name;
  }
  // 知识分享tab切换
  shareTabChange(item: any) {
    this.activeShareTab = item.name;
  }
  iterTippy(childList:any,type:string,level:any,pre:string){
    // this.tippyArr = [];
    level = level + 1;
    if(
      !childList.childrenMenuTreeNodeList ||
      !(childList.childrenMenuTreeNodeList.length > 0)
    ) {
      return;
    }
    let listDom = "";
    for (let j = 0; j < childList.childrenMenuTreeNodeList.length; j++) {
      // 事件传参无效，把参数绑定到节点自定义属性link上
      if(childList.childrenMenuTreeNodeList[j].linkResId){
        listDom += `<p class="child-menu"
          id="${pre}-${level}-${j}"
          link="${childList.childrenMenuTreeNodeList[j].linkAction}"
          onclick="childrenMenuTreeNodeClick()">
          ${childList.childrenMenuTreeNodeList[j].menuName}</p>`;
      }else{
        listDom += `<p class="child-menu"
          id="${pre}-${level}-${j}">
          ${childList.childrenMenuTreeNodeList[j].menuName}</p>`;
        const tempDom = this.iterTippy(childList.childrenMenuTreeNodeList[j],type,level,pre);
        this.tippyArr.push({id:`${pre}-${level}-${j}`,domHtml:tempDom});
      }
    }
    return listDom;
  }
  // 列表增加tippy
  addTippy(data: any, type: string,instances1: any[],instances2: any[]) {
    if (!(data.length > 0)) {
      return false;
    }
    let t = 0;
    for (const item of data) {
      const childList: any = item;
      t = t+1;
      if (
        !childList.childrenMenuTreeNodeList ||
        !(childList.childrenMenuTreeNodeList.length > 0)
      ) {
        continue;
      }
      let listDom = "";
      listDom += this.iterTippy(childList,type,0,`${type}-${childList.id || childList.menuCode}`);
      /*for (let j = 0; j < childList.childrenMenuTreeNodeList.length; j++) {
        // 事件传参无效，把参数绑定到节点自定义属性link上
        listDom += `<p class="child-menu"
          id="child-menu-${j}"
          link="${childList.childrenMenuTreeNodeList[j].linkAction}"
          onclick="childrenMenuTreeNodeClick()">
          ${childList.childrenMenuTreeNodeList[j].menuName}</p>`;
        // const childMenu = document.getElementById(`child-menu-${j}`);
        // childMenu.onclick = function()
      }*/
      // this.currentMenus = childList.childrenMenuTreeNodeList;
      // const template: any = document.getElementById("child-menus");
      // dom树相应模块生成对应id，type-id形式，用于让tippy绑定
      /*console.log("destroy");
      if(instances1.length > 0){
        for(const ins1 of instances1){
          if(ins1 !== undefined){

            ins1.destroy();
          }
        }
        // instances1 = undefined;
        instances1 = new Array();
      }
      if(instances2.length > 0){
        for(const ins2 of instances2){
          if(ins2 !== undefined){
            ins2.destroy();
          }
        }
        // instances2 = undefined;
        instances2 = new Array();
      }*/
      this.$nextTick(() => {
        const that = this;
        const menuDom = document.getElementById(`${type}-${childList.id || childList.menuCode}`);
        if(menuDom !== null){
          instances1.push(tippy(menuDom, {
            theme: "light",
            content: listDom,
            onShown() {
              that.showTippys();
            },
            arrow: true,
            // trigger: "click",
            placement: "right",
            interactive: true,
            animateFill: true,
            arrowType: "sharp" // sharp(default) or 'round'
          }));
        }else{
          tippy(menuDom, {
            theme: "light",
            content: listDom,
            arrow: true,
            onShown() {
              that.showTippys();
            },
            // trigger: "click",
            placement: "right",
            interactive: true,
            animateFill: true,
            arrowType: "sharp" // sharp(default) or 'round'
          })
        }

        instances2.push(tippy(document.getElementById(`dialog-${type}-${childList.id || childList.menuCode}`), {
          theme: "light",
          content: listDom,
          arrow: true,
          onShown() {
            that.showTippys();
          },
          // trigger: "click",
          placement: "right",
          interactive: true,
          animateFill: true,
          arrowType: "sharp" // sharp(default) or 'round'
        }));
      });
    }
  }

  showTippys(){

    const that = this;
    for (let k = that.tippyArr.length - 1;k >= 0;k--){
      const tempDomMap = that.tippyArr[k];
      // tslint:disable-next-line:no-string-literal
      const tempHtml = tempDomMap['domHtml'];
      // tslint:disable-next-line:no-string-literal
      const tempId = tempDomMap['id'];
      const tempTippy = tippy(document.getElementById(tempId),{
        theme: "light",
        content: tempHtml,
        allowHTML: true,
        onShown(){
          that.showTippys();
        },
        // trigger: "click",
        placement: "right",
        interactive: true,
        animateFill: true,
        arrowType: "sharp" // sharp(default) or 'round'
      });
    }
  }

  // 获取最近日程
  getRecentlySchedule() {
    queryRecentlySchedule().then((res: any) => {
      this.recentlySchedule = res.result || "";
    });
  }
  queryToolsList() {

    getToolList('tools',this.appCode).then((res: any) => {
      this.toolsList = res.result;
    }).catch(err => {
      console.log("onShow -> err", err);
    });
  }
  queryAdZsDict() {
    getAdZsDict(this.companyName).then((res: any) => {
      this.noticeTabData = res.adDicts;
      this.shareTabData = res.zsDicts;
    }).catch(err => {
      console.log("onShow -> err", err);
    });
  }
  querySystemList() {

    getToolList('system',this.appCode).then((res: any) => {
      this.systemList = res.result;
    }).catch(err => {
      console.log("onShow -> err", err);
    });
  }
  initManagementList() {
    getManagementList("")
      .then((res: any) => {
        this.allManagementList = res.result;
        // this.addTippy(this.managementList, "management",this.mInstances1,this.mInstances2);
        this.$nextTick(() => {
          // 增加tippy气泡操作
          // new Promise((reslove, reject) => {
          // this.$nextTick(() => {
          // 处理完毕后再获取快捷入口数据
          this.loadPersonalData();
          // });
          // }).then(() => {
          // });
        });
      })
      .catch(err => {
        console.log("onShow -> err", err);
      });

  }
  queryManagementList() {
    if(this.mInstances1.length > 0){
      this.mInstances1.forEach((item,index) =>{
        if(item !== undefined){
          item.destroy();
        }
      });
      /*for(let i = 0;i < this.mInstances1.length;i++){
        if(this.mInstances1[i] !== undefined){
          this.mInstances1[i].destroy();
        }
      }*/
      // instances1 = undefined;
      this.mInstances1 = new Array();
    }
    if(this.mInstances2.length > 0){
      this.mInstances2.forEach((item,index) =>{
        if(item !== undefined){
          item.destroy();
        }
      });
      /*for(let i = 0;i < this.mInstances2.length;i++){
        if(this.mInstances2[i] !== undefined){
          this.mInstances2[i].destroy();
        }
      }*/
      // instances2 = undefined;
      this.mInstances2 = new Array();
    }
    getManagementList(this.appCode)
      .then((res: any) => {
        this.managementList = res.result;
        this.addTippy(this.managementList, "management",this.mInstances1,this.mInstances2);
        this.$nextTick(() => {
          // 增加tippy气泡操作
          // new Promise((reslove, reject) => {
          // this.$nextTick(() => {
          // 处理完毕后再获取快捷入口数据
          // this.loadPersonalData();
          // });
          // }).then(() => {
          // });
        });
      })
      .catch(err => {
        console.log("onShow -> err", err);
      });

  }
  created() {
    vm = this;
  }
  mounted() {
    const localUserInfo: any = localStorage.getItem("user_info");
    this.userInfo = JSON.parse(localUserInfo);
    // 获取最近日程
    this.getRecentlySchedule();
    // 绘制数据看板
    // this.drawCharts();
    // 获取新闻与公告与知识分享
    this.loadNotice("news");
    this.loadNotice("ad");
    this.loadNotice("knowledge");
    // 获取待办事项数量
    this.updateWorkItemTodo();
    this.updateUnNotifications();
    // this.queryManagementList(this.appCode);
    this.queryToolsList();
    this.querySystemList();
    this.queryAdZsDict();
    // 获取代办任务数量
    getDayTaskAmount()
      .then((res: any) => {
        this.dayTask = res.total;
      })
      .catch(err => {
        console.log("onShow -> err", err);
      });

    // 获取功能列表数据
    this.initManagementList();
    this.queryManagementList();
    // 获取待办事项列表
    this.updateWorkItems();

    this.newsTimer = setInterval(() => {
      this.loadNotice("news");
      this.loadNotice("ad");
      this.loadNotice("knowledge");
      this.updateWorkItemTodo();
      this.updateUnNotifications();
      this.updateWorkItems();
      this.getRecentlySchedule();
    }, 5 * 60 * 1000);

    const win: any = window;
    win.childrenMenuTreeNodeClick = (event: any) => {
      const e = event || window.event;
      const link = e.target.attributes.link.value;
      // window.open(link, "_blank");
      // const company: any = Company;
      // company.itemLinkTo(link);
      this.itemLinkTo(link);
      // console.log(, ".............");
    };
    win.a = () => {
      this.todoIframeVisible = false;
      switch (this.dbTabName) {
        case "todolist":
            this.updateWorkItemTodo();
            this.updateWorkItems();
            break;
        case "dolist":
          this.updateFinishedWorkItems();
          break;
        case "unviewedNotices":
          this.updateUnNotifications();break;
        case "viewedNotices":
          this.updateNotifications();break;
      }
    }
  }
  beforeDestroy() {
    // 销毁定时器
    if (this.newsTimer) {
      clearTimeout(this.newsTimer);
    }
  }
}
</script>
<style>
    #dialogClass .el-dialog__body {
        padding: 0 20px !important;
    }
    .el-tabs__header{
        margin: 0 30px 0 0 !important;
    }
</style>
<style lang="scss" scoped>
    .el-dialog__wrapper{
        overflow-y: hidden;
    }
.company {
  width: 100%;

  .content-box {
    position: relative;
    float: left;
    height: 250px;
    width: 500px;
    margin: 2px 2px;
    padding: 5px 22px;
    box-shadow: 0px 0px 13px 0px rgba(0, 0, 0, 0.07);
    border-radius: 3px;
    background-color: #fff;

    .none-tip {
      position: absolute;
      top: 50%;
      left: 50%;
      transform: translate(-50%, -50%);
      color: #999;
      font-size: 14px;
    }
  }

  .user-info,
  .management-list,
  .system-list,
  .schedule {
    width: 250px;
  }

  //.share-info
  .news,
  .notice,
  .to-do-list {
    position: relative;
    width: 862px;
  }

  .charts,
  .personal-area,
  .tools-list {
    width: 280px;
  }

  .user-info {
    .avatar-block {
      position: relative;
      width: 100%;
      height: 50px;
      margin: 0 0 20px 0;

      .avatar {
        float: left;
        width: 50px;
        height: 50px;
        border-radius: 50%;
        overflow: hidden;
      }

      .user-name {
        float: left;
        width: calc(100% - 65px);
        margin-left: 15px;
        /*line-height: 50px;*/
        font-weight: 500;
        overflow: hidden;
        text-overflow: ellipsis;
        white-space: nowrap;
        text-align: left;
      }

      .logout,
      .edit-pwd {
        position: absolute;
        bottom: 0;
        right: 10px;
        font-size: 12px;
        color: #5ca0e7;
        cursor: pointer;

        &:hover {
          color: darken(#5ca0e7, 10%);
        }
      }

      .edit-pwd {
        right: 50px;
      }
    }

    .info-line {
      width: 100%;
      height: 30px;
      font-size: 13px;
      font-weight: 500;
      line-height: 30px;
      text-align: left;

      .info-label {
        float: left;
        width: 70px;
        color: #9fa5b3;
      }

      .info-value {
        float: left;
        width: calc(100% - 70px);
        height: 30px;
        color: #4a4a4a;
        overflow: hidden;
        text-overflow: ellipsis;
        white-space: nowrap;
      }

      .sign {
        cursor: pointer;

        /deep/.el-input-group__append {
          padding: 0;

          i {
            line-height: 26px;
            padding: 0 2px;

            &:hover {
              color: #5ca0e7;
              font-weight: 500;
            }
          }
        }
      }
    }

    .need-todo-button {
      width: 100%;
      height: 30px;
      margin: 12px 0 0 0;
      border: 1px solid #5ca0e7;
      border-radius: 2px;
      font-size: 13px;
      font-weight: 500;
      color: #5ca0e7;
      line-height: 30px;
      text-align: center;
      cursor: pointer;
    }
  }

  .news {
    .news-content {
      width: 100%;

      .new-news {
        width: 100%;

        .new-news-img {
          float: left;
          display: block;
          width: 150px;
          height: 94px;
          margin: 20px 20px 10px 0;
          cursor: pointer;
        }

        .new-news-line {
          float: left;
          width: calc(100% - 170px);

          .simple-news:nth-last-of-type(1) {
            margin-bottom: 0;
          }
        }
      }

      .simple-news {
        width: 100%;
        font-size: 13px;
        height: 25px;
        line-height: 25px;
        margin: 8px 0 5px 0;
        text-align: left;
        cursor: pointer;

        &:hover {
          .simple-news-title {
            color: #4192f7;
          }
        }

        .top-tip {
          margin-top: 5.5px;
        }

        &-title {
          float: left;
          color: #414141;
          overflow: hidden;
          text-overflow: ellipsis;
          white-space: nowrap;
          text-align: left;
        }

        &-date {
          width: 100px;
          float: right;
          font-size: 13px;
          color: #9fa5b3;
          text-align: right;
        }
      }
    }

    //  <div class="news-content">
    //           <div class="new-news">
    //             <img class="new-news-img" src="@assets/news.jpg" alt="" />
    //             <div
    //               class="new-news-line"
    //               v-for="(item, index) in newsData.slice(0, 3)"
    //               :key="`new-news-${index}`"
    //             >
    //               <p class="new-news-label">{{ newsData.title }}</p>
    //               <span class="new-news-date">{{ newsData.time }}</span>
    //             </div>
    //           </div>
    //           <div
    //             class="simple-news"
    //             v-for="(item, index) in newsData.slice(3, 6)"
    //             :key="`news-${index}`"
    //           >
    //             <p>
    //               {{ newsData.title }}
    //             </p>
    //             <span>{{ newsData.time }}</span>
    //           </div>
    //         </div>
  }

  .charts {}

  .personal-area {}

  .notice,
  .notice2 {
    .tab-line {
      position: absolute;
      width: 100%;
      // min-width: 620px;
      height: 40px;
      left: 0;
      top: 0;
        // background-color: #f4f5fa;
      line-height: 40px;

      .tabs {
        width: calc(100% - 72px);
        float: left;
        list-style: none;
        overflow: hidden;
        white-space: nowrap;
        margin-block-start: 0;
        margin-block-end: 0;
        padding-inline-start: 0;
        text-align: left;
        overflow-x: auto;

        &::-webkit-scrollbar {
          display: none;
        }

        -ms-scroll-chaining: chained;
        -ms-overflow-style: none;
        -ms-content-zooming: zoom;
        -ms-scroll-rails: none;
        -ms-content-zoom-limit-min: 100%;
        -ms-content-zoom-limit-max: 500%;
        -ms-scroll-snap-type: proximity;
        -ms-scroll-snap-points-x: snapList(100%, 200%, 300%, 400%, 500%);
        -ms-overflow-style: none;

        li {
          display: inline-block;
          vertical-align: middle;
          height: 100%;
          padding: 0 15px;
          font-size: 13px;
          font-weight: 500;
          color: #8f95a9;
          text-align: center;
          cursor: pointer;
        }

        .active {
          background-color: #fff;
          font-size: 15px;
          color: #8e8989;
          font-family: 微软雅黑;
        }
      }

      .load-more {
        margin-right: 22px;

        &::after {
          top: 15px;
        }
      }
    }

    &-content {
      height: 250px;
      margin-top: 20px;
      padding: 10px 0 0 0;
      overflow: hidden;

      .notice-line {
        width: 100%;
        margin: 8px 0 5px 0;
        height: 25px;
        line-height: 25px;
        text-align: left;
        cursor: pointer;

        &:hover {
          .title {
            color: #4192f7 !important;
          }
        }

        .title {
          float: left;
          max-width: 350px;
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

        // .new-tip {
        //   float: left;
        //   width: auto;
        //   margin: 2px 10px 0 -5px;
        //   padding: 0 5px;
        // }
      }
    }
  }

  .management-list {}

  .to-do-list {
    //width: 830px;
    // min-width: 890px;

    .list-wrapper {
      width: 100%;
      padding: 3px 0 0 0;

      .todo-line {
        width: 100%;
        text-align: left;
        height: 30px;
        line-height: 30px;
        margin: 0 0 5px 0;
        cursor: pointer;

        .type3 {
          max-width: 110px;
          margin-right: 10px;
          font-size: 15px;
          font-weight: 600;
          color: #5CA0E7;
          overflow: hidden;
          text-overflow: ellipsis;
          white-space: nowrap;
        }

        .type2 {
          max-width: 110px;
          margin-right: 10px;
          font-size: 15px;
          font-weight: 600;
          color: #2a2a2a;
          overflow: hidden;
          text-overflow: ellipsis;
          white-space: nowrap;
        }

        .type {
          max-width: 110px;
          margin-right: 20px;
          font-size: 14px;
          font-weight: 500;
          color: #2a2a2a;
          overflow: hidden;
          text-overflow: ellipsis;
          white-space: nowrap;
        }

        .warning {
          display: inline-block;
          vertical-align: middle;
          padding: 2px 5px;
          font-size: 12px;
          background-color: red;
          line-height: 14px;
          color: #fff;
          font-weight: 500;
          border-radius: 4px;
          transform: scale(0.8);
        }

        .title {
          display: inline-block;
          vertical-align: middle;
          font-size: 13px;
          color: #414141;
          overflow: hidden;
          text-overflow: ellipsis;
          white-space: nowrap;
            margin-right: 10px;
        }

        .date {
          display: block;
          float: right;
          color: #9fa5b3;
          font-size: 13px;
        }
      }
    }
  }

  .system-list {}

  .schedule {}

  .share-info {
    //width: 1100px;
    // .tab-line {
    //   position: absolute;
    //   top: 20px;
    //   left: 150px;
    //   list-style: none;

    //   li {
    //     float: left;
    //     margin: 0 20px;
    //     height: 30px;
    //     font-size: 13px;
    //     color: #959595;
    //     text-align: center;
    //     line-height: 30px;
    //     cursor: pointer;
    //   }
    //   .active {
    //     color: #3d8ee2;
    //     border-bottom: 2px solid #3d8ee2;
    //   }
    // }

    // .share-line {
    //   width: 100%;
    //   margin: 15px 0 5px 0;
    //   height: 25px;
    //   line-height: 25px;
    //   text-align: left;

    //   .title {
    //     float: left;
    //     max-width: 450px;
    //     font-size: 13px;
    //     color: #414141;
    //     overflow: hidden;
    //     text-overflow: ellipsis;
    //     white-space: nowrap;
    //   }
    //   .date {
    //     width: 50px;
    //     float: right;
    //     font-size: 13px;
    //     color: #9fa5b3;
    //     text-align: right;
    //   }
    // }
  }

  .tools-list {}

  .title-line {
    height: 30px;
    line-height: 30px;

    .title {
      float: left;
      font-size: 16px;
      font-weight: 600;
      color: #8e8989;
      font-family: 微软雅黑;
    }

    .load-more {
      position: relative;
      float: right;
      width: 30px;
      text-align: right;
      font-size: 13px;
      font-weight: 500;
      color: #257dc0;
      /*margin-right: 20px;*/
      cursor: pointer;

      &::after {
        content: "";
        position: absolute;
        border-right: 1px solid #257dc0;
        border-bottom: 1px solid #257dc0;
        width: 8px;
        height: 8px;
        top: 10px;
        right: -12px;
        transform: rotate(-45deg);
        -o-transform: rotate(-45deg);
        -webkit-transform: rotate(-45deg);
        -moz-transform: rotate(-45deg);
        -ms-transform: rotate(-45deg);
      }

      &:hover {
        color: darken(#257dc0, 10%);

        &::after {
          border-right: 1px solid darken(#257dc0, 10%);
          border-bottom: 1px solid darken(#257dc0, 10%);
        }
      }
    }

    .edit {
      position: absolute;
      display: inline-block;
      top: 8px;
      left: 90px;
      height: 20px;
      line-height: 20px;
      cursor: pointer;
      user-select: none;

      span {
        display: inline-block;
        vertical-align: middle;
        font-size: 12px;
        color: #727272;
      }

      .icon-edit {
        display: inline-block;
        vertical-align: middle;
        width: 14px;
        height: 14px;
        color: #727272;
      }

      &:hover {

        span,
        .icon-edit {
          color: #257dbf;
        }
      }
    }
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

  .top-tip {
    float: left;
    width: auto;
    height: 20px;
    margin: 2px 10px 0 -5px;
    padding: 0 5px;
    line-height: 20px;
    border-radius: 2px;
    color: #fff;
    font-size: 12px;
    text-align: center;
    transform: scale(0.7);
  }

  .tools-wrapper {
    display: flex;
    flex-wrap: wrap;
    justify-content: flex-start;
    align-content: flex-start;
    width: 100%;
    padding: 0;

    .tools-item {
      position: relative;
      width: calc(33.3333% - 6px);
      margin: 3px;
      height: 65px;
      padding: 8px 0;
      // overflow: hidden;
      cursor: pointer;

      &:hover {
        box-shadow: 0 2px 12px 0 rgba(0, 0, 0, 0.1);
      }

      .icon {
        width: 30px;
        max-height: 30px;
      }

      .add {
        color: #5ca0e6;
        width: 25px;
        height: 25px;
        margin-bottom: 5px;
      }

      .label {
        position: absolute;
        bottom: 5px;
        left: 0;
        width: 100%;
        overflow: hidden;
        text-overflow: ellipsis;
        white-space: nowrap;
        color: #323131;
        font-size: 12px;
        margin-top: 5px;
        text-align: center;
        transform: scale(0.9);
      }

      .icon-delete {
        position: absolute;
        right: -3px;
        top: -3px;
        width: 12px;
        height: 12px;
        // color: #dedbdc;
        color: #ec554f;

        &:hover {
          color: darken(#ec554f, 10%);
        }
      }
    }
  }
}

@media screen and (max-width: 1580px) {
  .company {
    .news,
    .to-do-list,
    .notice {
      width: 702px;
    }

    //.share-info {
    //  width: 890px;
    //}
  }
}

@media screen and (max-width: 1380px) {
  .company {

    .news,
    .to-do-list,
    .notice {
      width: 602px;
    }

    //.share-info {
    //  width: 790px;
    //}
  }
}
</style>

<style lang="scss">
.child-menu {
  margin: 5px 0;
  font-size: 12px;
  color: #414141;
  text-align: center;
  line-height: 22px;
  cursor: pointer;

  &:hover {
    color: #4192f7;
  }
}

// .notice-info {
//   width: 100%;
//   max-width: 800px;
//   margin: 0 auto;
//   cursor: default;
//   text-align: left;

//   h1 {
//     text-align: center;
//   }
//   .note {
//     margin: 0 2.5px;
//     text-align: right;
//     font-size: 14px;
//   }
//   .text {
//     margin: 20px 0 0 0;
//     text-indent: 2rem;
//   }
//   .action-bar {
//     width: 100%;
//     margin-top: 20px;
//     padding: 20px 0;
//     border-top: 1px solid #999;

//     span {
//       float: left;
//       margin-bottom: 20px;
//       line-height: 40px;
//       padding: 0 20px;
//     }
//     .file-btn {
//       float: left;
//       line-height: 40px;
//       margin: 0 10px 20px 0;
//       padding: 0 20px;
//       background-color: #727272;
//       color: #000;
//       cursor: pointer;
//     }
//   }
// }
#jsp-iframe {
  width: 100%;
  height: 100%;
  overflow: auto;
}
</style>
