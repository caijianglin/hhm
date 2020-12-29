<template>
<div class="home" id="home">
  <div class="home-header">
    <img class="logo" :src="require('@assets/'+logoAddr+'.png')" alt="" />
    <div class="logout">
      <a @click="logout">
        <svg-icon class="btn-off" icon-class="off"></svg-icon> 注销
      </a>
    </div>
    <!--旧版本搜索位置-->
    <!-- <div class="search">
        <input
          v-model.trim="searchText"
          placeholder="请输入搜索关键字"
          type="text"
          @keyup.enter="search"
        />
        <svg-icon
          class="icon-clear"
          icon-class="delete"
          @click="clearSearch"
        ></svg-icon>
        <svg-icon
          class="icon-search"
          icon-class="search"
          @click="search"
        ></svg-icon>
      </div> -->
    <!--新版本菜单导航-->
    <div class="nav-list">
      <a :class="['home-name', activeNav === 'main' && 'active']" href="#" @click="toMainMenu">公司门户</a>
      <!--<a class="home-name" href="http://192.168.146.122/dq.asp" target="_blank">党群门户</a>-->
      <el-dropdown trigger="hover" class="nav-dropdown" @command="menuOnChange" show-timeout="100">
        <span class="el-dropdown-link">
          {{menuName}}<i class="el-icon-arrow-down el-icon--right"></i>
        </span>
        <el-dropdown-menu slot="dropdown">
          <el-dropdown-item v-for="(item, index) in menuList2" :class="[activeNav === item.code && 'active']" :command="item.code" :menuName="item.company">{{item.company}}</el-dropdown-item>
          <!--<el-dropdown-item :class="[activeNav === 'zcdl' && 'active']" command="zcdl">中船动力</el-dropdown-item>
          <el-dropdown-item :class="[activeNav === 'dlyjy' && 'active']" command="dlyjy">动力研究院</el-dropdown-item>
          <el-dropdown-item :class="[activeNav === 'zcsj' && 'active']" command="zcsj">中船三井</el-dropdown-item>
          <el-dropdown-item :class="[activeNav === 'acgs' && 'active']" command="acgs">安柴公司</el-dropdown-item>
          <el-dropdown-item :class="[activeNav === 'zcfw' && 'active']" command="zcfw">中船服务</el-dropdown-item>
          <el-dropdown-item :class="[activeNav === 'dlbj' && 'active']" command="dlbj">动力部件</el-dropdown-item>
          <el-dropdown-item :class="[activeNav === 'others' && 'active']" command="others">...</el-dropdown-item>-->
        </el-dropdown-menu>
      </el-dropdown>
    </div>
  </div>
  <div class="container">
    <div class="banner">
      <swiper :options="swiperOption" v-if="bannerImgs.length > 0">
        <swiper-slide v-for="(item, index) in bannerImgs" :key="`slide-${index}`">
          <img class="banner-img" :src="item.imgpath" alt="" />
        </swiper-slide>
        <div class="swiper-pagination" slot="pagination"></div>
      </swiper>
    </div>
    <!--旧版本菜单导航-->
    <!-- <ul class="menu clearfix">
        <li
          v-for="(label, index) in menuList2"
          :key="index"
          class="menu-item"
          :class="[activeMenu === index ? 'active' : '']"
          @click="menuChange(label, index)"
        >
          {{ label.company }}
        </li>
      </ul> -->
    <div class="user-bar">
      <el-dropdown size="small" trigger="hover" @command="handleCommand">
        <div class="avator">
          <img src="@assets/avatar.png" alt="">
        </div>
        <el-dropdown-menu slot="dropdown" class="user-dropdown">
          <el-dropdown-item command="user_info">个人信息</el-dropdown-item>
          <el-dropdown-item command="edit_pwd">修改密码</el-dropdown-item>
        </el-dropdown-menu>
      </el-dropdown>
      <span class="user-name">您好，{{ userInfo.empName || "" }}</span>
      <span>工号：{{ userInfo.empCode || "" }}</span>
      <span>{{ userInfo.orgName || "-" }}</span>
      <!--<span class="welcome">&#45;&#45;&#45;&#45;今天也要元气满满哦</span>-->
      <div class="search">
        <input v-model.trim="searchText" placeholder="请输入搜索关键字" type="text" @keyup.enter="search" />
        <svg-icon class="icon-clear" icon-class="delete" @click="clearSearch"></svg-icon>
        <svg-icon class="icon-search" icon-class="search" @click="search"></svg-icon>
      </div>
    </div>
    <!--弹窗展示更多, 必须得用v-show才能加上tippy-->
    <more-data-dialog v-show="userInfoDialogVisible" @close.stop="userInfoDialogVisible = false">
      <div style="display:flex;flex-wrap:wrap">
        <h4>员工信息</h4>
      </div>
      <div style="display: flex;flex-direction: row;">
        <div style="width: 30%;">
            <img src="@assets/cssc.png" style="width: 100px;height: 30px;display: flex;margin: 10px auto;" alt="">
            <img src="@assets/cssc2.png" style="width: 90px;height: 90px;" alt="">
        </div>
        <div style="width: 70%;display: flex;flex-direction: column;">
          <div class="li-div">姓名：{{ userInfo.empName || "" }}</div>
          <div class="li-div">部门：{{ userInfo.orgName || "-" }}</div>
          <div class="li-div">职务：{{ userInfo.degree || "" }}</div>
          <div class="li-div">电话：{{ userInfo.otel || "" }}</div>
          <div class="li-div">外网邮箱：{{ userInfo.pemail || "" }}</div>
          <div class="li-div">内网邮箱：{{ userInfo.oemail || "" }}</div>
        </div>
      </div>
    </more-data-dialog>
    <div class="content-box-wrapper clearfix">
      <!--沪东重机与中船动力都展示company组件-->
      <company v-show="activeMenu === 0 || activeMenu === 1" :active-tab-index="activeMenu" :company-name="companyName" />
      <!--<dqmh v-show="activeMenu === 1" />-->
      <!--<others v-show="activeMenu !== 0 && activeMenu !== 1" />-->
      <others v-show="activeMenu !== 0 && activeMenu !== 1" />
    </div>
  </div>
  <!-- moreDataDialogVisible -->
  <tools />
</div>
</template>

<script lang="ts">
import {
  Component,
  Prop,
  Vue,
  Watch
} from "vue-property-decorator";
import "swiper/dist/css/swiper.css";
import {
  swiper,
  swiperSlide
} from "vue-awesome-swiper";
import {
  getBannerImg,
  getCompanyDict
} from "@api/index.ts";
import {
  Company,
  Dqmh,
  Others,
  Tools
} from "./components";
import MoreDataDialog from "@components/MoreDataDialog/UserInfoCard.vue";
let vm: any = null;

// Vue.use(Popover);

@Component({
  components: {
    MoreDataDialog,
    swiper,
    swiperSlide,
    Company,
    Dqmh,
    Others,
    Tools
  }
})
export default class Home extends Vue {
  // @Getter user_info!: any;
  private userInfo: object = {
    empName: "",
    empCode: "",
    orgName: "",
    degree: "",
    otel: "",
    pemail: "",
    oemail: "",
    sign: ""
  };
  private menuName = "子公司门户";
  private logoAddr: string = "logoJT";
  private userInfoDialogVisible: boolean = false;
  private activeNav: string = "main";
  private searchText: string = "";
  private reg: any = null;
  private bannerImgs: object[] = [];
  private companyDicts: object[] = [];
  private swiperOption: any = {
    autoHeight: true,
    slidesPerView: 1,
    spaceBetween: 30,
    loop: true,
    speed: 1000,
    autoplay: {
      delay: 4000,
      disableOnInteraction: false
    },
    pagination: {
      el: ".swiper-pagination",
      clickable: true
    },
    on: {
      tap(e: any) {
        // 过滤分页与切换按钮的点击事件
        if (
          e.target.classList.contains("swiper-button-white") ||
          e.target.classList.contains("swiper-pagination-bullet")
        ) {
          return false;
        }
        // 箭头函数的this会指向Home实例，需用function
        vm.handleClickSlide(this);
      }
    }
  };
  private activeMenu: number = 0;
  private companyName: string = '';
  private menuList2: object[] = [{
      code: "10000001",
      company: "沪东重机"
    },
    {
      code: "10000002",
      company: "动力研究院"
    },
    {
      code: "10000004",
      company: "中船三井"
    }
  ];

  toMainMenu(){
    this.companyName = "10000000";
    this.activeNav = "main";
    this.logoAddr = 'logoJT';
    document.title = '中船动力（集团）有限公司';
    (document.getElementById("tIcon") as HTMLLinkElement).href="favicon.ico"
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

  // 页面tab菜单切换
  menuChange(label: any, index: number) {
    console.log("Home -> menuChange -> index", index);
    if (index === 0) {
      this.activeMenu = index;
      this.companyName = label.code;
    }
    /*else if(index === 1){
      window.open("http://192.168.146.122/dq.asp","_blank");
    }*/
    else {
      this.activeMenu = index;
      this.companyName = label.code;
    }

  }
  // 轮播图跳转事件
  handleClickSlide(sp: any) {
    const index: number = sp.realIndex;
    const banner: any = this.bannerImgs[index];
    if (!banner.imgurl) {
      return false;
    }
    window.open(banner.imgurl, "_blank");
  }
  // 清空搜索条件
  clearSearch() {
    this.searchText = "";
    this.reduceNode();
  }
  // 监测搜索关键词为空时清除highLight
  @Watch("searchText")
  getsearchText() {
    if (this.searchText === "") {
      this.reduceNode();
    }
  }
  // 关键词搜索高亮+定位
  search() {
    this.reduceNode();
    this.$nextTick(() => {
      if (!this.searchText) {
        return false;
      }
      const home: any = document.getElementById("home");
      this.reg = new RegExp(this.searchText, "g");
      this.searchChildNodes(home);
      this.$nextTick(() => {
        const highLightNodes: any = document.getElementsByClassName("anchor");
        highLightNodes[0].scrollIntoView();
      });
    });
  }
  // 导航下拉子菜单选择事件
  menuOnChange(command: string) {
    console.log("Home -> menuOnChange -> command", command);
    // 判断command参数的值，确定当前选择的菜单进行操作
    this.companyName = command;
    this.activeNav = command;
    if(command === '10000001'){
      this.logoAddr = 'logo';
      document.title = '沪东重机有限公司';
      (document.getElementById("tIcon") as HTMLLinkElement).href="favicon2.ico"
    }else{
      this.logoAddr = 'logoJT';
      document.title = '中船动力（集团）有限公司';
      (document.getElementById("tIcon") as HTMLLinkElement).href="favicon.ico"
    }
  }
  // 遍历节点
  searchChildNodes(node: any) {
    if (!node.innerHTML) {
      return false;
    }
    if (node.innerHTML.includes(this.searchText)) {
      if (node.children.length > 0) {
        for (const child of node.childNodes) {
          if (child.nodeType === 3 && /\s/.test(child.nodeValue)) {
            // 删除空白的节点
            continue;
          } else {
            this.searchChildNodes(child);
          }
        }
      } else {
        const newDom =
          '<span style="background-color:#ff9632;" class="anchor">' +
          this.searchText +
          "</span>";
        node.innerHTML = node.innerHTML.replace(this.reg, newDom);
      }
    } else {
      return false;
    }
  }
  // 高亮还原
  reduceNode() {
    const nodes: any = document.getElementsByClassName("anchor");
    if (!nodes) {
      return false;
    }
    for (const node of nodes) {
      console.log("Home -> reduceNode -> node", node);
      this.$nextTick(() => {
        const textNode = document.createTextNode(node.innerText);
        node.parentNode.replaceChild(textNode, node);
      });
    }
  }
  handleCommand(command: string) {
    if (command === 'user_info') {
      console.log('个人中心页面');
      this.userInfoDialogVisible = true;
    } else {
      // this.$router.push("/reset_pwd");
      window.open("/coframe/rights/user/update_password.jsp","_blank");
    }
  }
  created() {
    vm = this;
  }
  mounted() {
    const localUserInfo: any = localStorage.getItem("user_info");
    this.userInfo = JSON.parse(localUserInfo);
    // 获取顶部轮播图
    getBannerImg()
      .then((res: any) => {
        this.bannerImgs = res.result;
      })
      .catch(err => {
        console.log("onShow -> err", err);
      });
    // 获取公司字典
    getCompanyDict()
      .then((res: any) => {
        this.menuList2 = res.companyDict;
      })
      .catch(err => {
        console.log("onShow -> err", err);
      });
  }
}
</script>

<style lang="scss" scoped>
.home {
  position: relative;
  width: 100%;
  background-color: #f9f9fb;

  .home-header {
    max-width: 1450px;
    min-width: 1190px;
    height: 60px;
    margin: 0 auto;
    padding: 10px 0;

    .logo {
      float: left;
      display: block;
      //width: 250px;
      height: 30px;
      margin: 5px 0;
    }

    .nav-list {
      position: relative;
      float: right;
      margin-right: 40px;
      font-size: 17px;
      font-weight: 500;
      color: #333;
      line-height: 38px;

      a {
        position: relative;
        display: inline-block;
        margin: 0 20px 0 0;
        padding: 0 10px;
        text-decoration: none;
        cursor: pointer;

        &.active {
          // color: #005bac;
          color: #fff;
          background-color: #005bac;
          border-radius: 20px;

          // &::after {
          //   position: absolute;
          //   content: '';
          //   width: 35px;
          //   height: 3px;
          //   left: 50%;
          //   bottom: 2px;
          //   transform: translateX(-50%);
          //   background-color: #005bac;
          // }

          &:hover {
            color: #fff;
          }
        }

        &:hover {
          color: #005bac;
        }
      }
    }

    .nav-dropdown {
      cursor: pointer;

      &:hover {
        .el-dropdown-link {
          color: #005bac;
        }
      }

      .el-dropdown-link {
        font-size: 17px;
        font-weight: 500;
        color: #333;
        line-height: 38px;
      }
    }

    .logout {
      float: right;
      margin: 5px 25px 5px 0;
      line-height: 30px;
      color: #777;

      &:hover {
        color: #005bac;

        .btn-off {
          color: #005bac;
        }
      }

      .btn-off {
        width: 20px;
        height: 20px;
        font-size: 24px;
        color: #777;
        // height: 30px;
      }
    }

    .search {
      position: relative;
      float: right;
      width: 342px;
      height: 38px;
      padding: 5px 18px;
      border: 1px solid #999;
      border-radius: 19px;
      margin-right: 20px;

      &:hover {
        .icon-clear {
          display: block;
        }
      }

      input {
        width: 100%;
        height: 28px;
        line-height: 28px;
        outline-style: none;
        border: 0px;
        border-radius: 2px;
        padding-right: 50px;
        font-size: 13px;
      }

      .icon-clear {
        position: absolute;
        display: none;
        top: 11px;
        right: 50px;
        width: 13px;
        height: 13px;
        color: #9a9a9a;
        cursor: pointer;

        &:hover {
          color: #4192f7;
        }
      }

      .icon-search {
        position: absolute;
        right: 18px;
        top: 10px;
        width: 15px;
        color: #9a9a9a;
        cursor: pointer;

        &:hover {
          color: #4192f7;
        }
      }
    }
  }

  .container {
    width: 1400px;
    margin: 0 auto;

    .banner {
      width: 100%;

      .swiper-container {
        border-top-left-radius: 20px;
        border-top-right-radius: 20px;
        //height: 161px;
      }

      .banner-img {
        height: 260px;
        border-top-left-radius: 20px;
        border-top-right-radius: 20px;
      }

      /deep/.swiper-pagination-bullets {
        bottom: 12px;
        width: auto;
        left: 50%;
        transform: translateX(-50%);
        border-radius: 5px;
        background-color: rgba(0, 0, 0, 0.29);
        font-size: 14px;
      }

      /deep/.swiper-pagination-bullets .swiper-pagination-bullet {
        margin: 0 10px;
        width: 9px;
        height: 9px;
        background-color: #fff;
        opacity: 0.29;
      }

      /deep/.swiper-pagination-bullet-active {
        background-color: #fff !important;
        opacity: 1 !important;
      }

      img {
        display: block;
        width: 100%;
      }
    }

    // .menu {
    //   display: flex;
    //   flex-wrap: nowrap;
    //   width: 100%;
    //   height: 40px;
    //   background-color: #005bac;
    //   color: #fff;
    //   list-style: none;

    //   &-item {
    //     flex: 1;
    //     float: left;
    //     height: 100%;
    //     font-size: 13px;
    //     line-height: 40px;
    //     cursor: pointer;
    //   }
    //   .active {
    //     background-color: #034b8b;
    //   }
    // }
    .user-bar {
      width: 100%;
      height: 40px;
      padding: 5px 20px;
      font-size: 15px;
      font-weight: 500;
      color: #fff;
      text-align: left;
      background-color: #005bac;

      .avator {
        display: inline-block;
        vertical-align: middle;
        width: 30px;
        height: 30px;
        margin-right: 20px;
        border-radius: 50%;
        overflow: hidden;
        cursor: pointer;

        img {
          width: 100%;
        }
      }

      span {
        display: inline-block;
        vertical-align: middle;
        margin-right: 30px;

        &.welcome {
          margin-left: 100px;
        }
      }

      .search {
        position: relative;
        float: right;
        width: 300px;
        height: 30px;
        padding: 4px 18px;
        border: 1px solid #fff;
        border-radius: 19px;
        margin-right: 20px;

        &:hover {
          .icon-clear {
            display: block;
          }
        }

        input {
          width: 100%;
          height: 18px;
          line-height: 18px;
          outline-style: none;
          border: 0px;
          border-radius: 2px;
          padding-right: 50px;
          font-size: 13px;

          &::placeholder {
            color: #fff;
          }
        }

        .icon-clear {
          position: absolute;
          display: none;
          top: 8px;
          right: 50px;
          width: 13px;
          height: 13px;
          color: #aaa;
          cursor: pointer;

          &:hover {
            color: #4192f7;
          }
        }

        .icon-search {
          position: absolute;
          right: 18px;
          top: 6px;
          width: 15px;
          color: #fff;
          cursor: pointer;

          &:hover {
            color: #4192f7;
          }
        }
      }
    }

    .content-box-wrapper {
      width: 1404px;
      margin-left: -2px;
      padding: 0px 0 50px 0;
    }
  }
}

@media screen and (max-width: 1580px) {
  .home {
    .home-header {
      max-width: 1290px;
    }

    .container {
      width: 1240px;

      .content-box-wrapper {
        width: 1244px;
      }
    }
  }
}

@media screen and (max-width: 1380px) {
  .home {
    .home-header {
      max-width: 1190px;
    }

    .container {
      width: 1140px;

      .content-box-wrapper {
        width: 1144px;
      }
    }
  }
}

/deep/.el-dropdown-menu__item:focus,
/deep/.el-dropdown-menu__item:not(.is-disabled):hover {
  color: #005bac;
}

.active {
    // color: #005bac;
    color: #fff;
    background-color: #005bac;
}
.el-dropdown-menu__item {
    &:hover {
        color: #fff !important;
        background-color: #005bac !important;
    }
}
.user-dropdown {
  background-color: #2f2f2f;

  .el-dropdown-menu__item {
    color: #eee;
    &:hover {
      background-color: #005bac;
      color: #fff;
      font-weight: 500;
    }
  }

  /deep/.popper__arrow {
    border-bottom-color: #2f2f2f;
  }

  /deep/.popper__arrow::after {
    border-bottom-color: #2f2f2f;
  }
}
  .li-div{
    display: flex;
    margin: 0px 0px 10px 30px;
  }
</style>
