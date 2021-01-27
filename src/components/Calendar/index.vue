<template>
  <div class="calendar">
    <div class="calendar-header clearfix">
      <svg-icon
        class="left arrow"
        icon-class="left-arrow"
        @click="prevMonth"
      ></svg-icon>
      <span class="show-date">{{ showDateStr }}</span>
      <svg-icon
        class="right arrow"
        icon-class="right-arrow"
        @click="nextMonth"
      ></svg-icon>
    </div>
    <table cellspaceing="0" cellpadding="0" border="0" class="calendar-pane">
      <tbody>
        <tr>
          <th v-for="(label, index) in showWeeks" :key="index">{{ label }}</th>
        </tr>
        <tr v-for="(row, index) in tableRows" :key="`row-${index}`">
          <td
            v-for="cell in row"
            :key="cell.date"
            :id="cell.date"
            :class="[getCellClasses(cell), cell.date, cell.dayOfWeek]"
            @mouseenter="showTaskTip($event, cell)"
            @click="handleClick(cell)"
            @contextmenu.prevent="showEditMenu($event, cell)"
          >
            {{ cell.text }}
          </td>
        </tr>
      </tbody>
    </table>
    <!--右键弹窗-->
    <context-menu
      ref="context-menu"
      class="right-menu"
      :editable="true"
      :offset="menuOffset"
      style="background-color:#fff !important;"
    >
      <template v-slot:menuItem>
        <li
          v-for="(item, index) in currentTask"
          :key="`task-edit-${index}`"
          @dblclick="eidtTask(item, index)"
        >
          <!-- <input
            v-if="!item.isnew"
            readonly
            v-model="formatTime(item.plantime)"
            class="time"
            type="text"
          /> -->
          <!-- formatTime(item.plantime) -->
          <span v-if="!item.isnew" class="time">{{
            `${item.timeRange[0]} - ${item.timeRange[1]}`
          }}</span>
          <!-- <el-time-picker
            v-else
            style="width:120px !important"
            v-model="item.plantime"
            size="mini"
            value-format="HH:mm"
            :picker-options="{
              format: 'HH:mm'
            }"
            @change="hanlderChange"
            placeholder="选择时间"
          >
          </el-time-picker> -->
          <el-time-picker
            v-else
            is-range
            size="mini"
            class="time"
            v-model="item.timeRange"
            value-format="HH:mm"
            format="HH:mm"
            :picker-options="{
              format: 'HH:mm'
            }"
            range-separator="-"
            start-placeholder="开始时间"
            end-placeholder="结束时间"
            placeholder="选择时间范围"
          >
          </el-time-picker>
          ：
          <input
            v-if="!item.isnew"
            readonly
            v-model="item.content"
            class="remark"
            placeholder="内容"
            type="text"
          />
          <el-input
            v-else
            style="width:140px !important"
            v-model="item.content"
            size="mini"
            :maxlength="10"
            placeholder="请输入内容"
          ></el-input>

          <span
            v-if="item.isnew"
            class="btn-save"
            @click="saveOneTask(item, index)"
            >保存</span
          >
          <svg-icon
            v-else
            title="删除"
            class="icon-del"
            icon-class="delete"
            @click="delOneTask(item, index)"
          ></svg-icon>
        </li>
        <li class="btn-add" @click="addOneTask">添加</li>
      </template>
    </context-menu>
  </div>
</template>

<script lang="ts">
import { Component, Prop, Vue, Watch } from "vue-property-decorator";
import { TimePicker, Input } from "element-ui";
// import TimePicker from "@components/TimePicker/index.vue";
import "tippy.js/themes/light.css";
import tippy from "tippy.js";
import dayjs from "dayjs";
import {
  getDayCountOfMonth,
  getFirstDayOfMonth,
  getCurrentDate
} from "@utils/index";
import {
  addDayTask,
  delDayTask,
  queryMonthTasks,
  queryDayTasks
} from "@api/index.ts";
import ContextMenu from "@components/ContextMenu/index.vue";

@Component({
  components: {
    ContextMenu,
    [TimePicker.name]: TimePicker,
    [Input.name]: Input
  }
})
export default class Calendar extends Vue {
  @Prop({
    default: null,
    type: String
  })
  value!: string;

  private showDate: any = new Date();
  private tableRows: object[] = [[], [], [], [], [], []];
  private instance: any = null;
  private monthTasks: string[] = [];
  private dayTasks: object[] = [];
  private taskEditVisible: boolean = false;
  private TimePickerVisible: boolean = false;
  private menuOffset: any = {
    clientX: 0,
    clientY: 0
  };
  private currentTask: object[] = [];
  private currentTaskIndex: number = 0;
  private selectedDate: string = "";
  hanlderChange(val: any) {
    console.log(val, "changge.....................");
  }
  get showWeeks() {
    // 表头用
    return ["日", "一", "二", "三", "四", "五", "六"];
  }
  get DayOfWeek() {
    return ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
  }
  get year() {
    return new Date(this.showDate).getFullYear();
  }
  get month() {
    return new Date(this.showDate).getMonth();
  }
  // 当月天数
  get dayCount() {
    return getDayCountOfMonth(this.year, this.month);
  }
  // 上一月的天数
  get preMonthDayCount() {
    if (this.month === 1) {
      return getDayCountOfMonth(this.year - 1, 11);
    } else {
      return getDayCountOfMonth(this.year, this.month);
    }
  }
  // 1号是星期几 代表空几个格
  get firstDay() {
    return getFirstDayOfMonth(new Date(this.year, this.month));
  }
  // 当前年月字符串
  get showDateStr() {
    return `${new Date(this.showDate).getFullYear()}年${new Date(
      this.showDate
    ).getMonth() + 1}月`;
  }

  // 渲染切换后月份的数据
  @Watch("showDate", {
    immediate: true,
    deep: true
  })
  async getShowDate(newVal: any) {
    const ym = dayjs(newVal).format("YYYY-MM");
    // 获取包括前后两月在内的三月内的有设置备忘的日期数组
    try {
      const res: any = await queryMonthTasks(ym);
      this.monthTasks = res.result;
      this.initCalendar();
    } catch (error) {
      this.initCalendar();
    }
  }
  // 渲染日历
  initCalendar() {
    let count = 1;
    // 日历计数 start = 1, 日历布局为 7123456
    const offset = this.firstDay;
    this.tableRows = [[], [], [], [], [], []];
    const rows = this.tableRows;
    // const now = getDateTimestamp(new Date());
    let nextMonthDay = 1;

    // 6x7日历table结构
    // 6列
    const rowsNum = Math.ceil((offset + this.dayCount) / 7);
    for (let i = 0; i < rowsNum; i++) {
      const row: any = rows[i];
      // 每一行7个
      for (let j = 0; j < 7; j++) {
        let cell = row[j];
        // 初始化每一个格, 赋默认值, row/column 对应 rowIndex/columnIndex
        if (!cell) {
          cell = {
            row: i,
            column: j,
            date: "",
            type: "current-month",
            dayOfWeek: "",
            hightLight: false,
            selected: false, // 是否被选择
            disable: false
          };
        }
        // 整个table的计数
        const num = i * 7 + j;
        cell.disable = false;

        // 空出前几格及后几格
        if (num < offset) {
          cell.text = this.preMonthDayCount - offset + j;
          cell.type = "pre-month";
          const preMonth =
            this.month === 0
              ? 12
              : this.month < 10
              ? `0${this.month}`
              : this.month;
          // 格式化后的对应日期
          const preYear =
            this.month === 0
                ?this.year - 1
                : this.year;
          cell.date = `${preYear}-${preMonth}-${
            Number(cell.text) < 10 ? `0${cell.text}` : cell.text
          }`;
        } else if (count > this.dayCount) {
          cell.text = nextMonthDay;
          cell.type = "next-month";
          const nextMonth =
            this.month + 1 === 12
              ? '01'
              : this.month + 2 < 10
              ? `0${this.month + 2}`
              : this.month + 2;
          const nextYear =
            this.month + 1 === 12
              ?this.year + 1
              : this.year;
          cell.date = `${nextYear}-${nextMonth}-${
            Number(cell.text) < 10 ? `0${cell.text}` : cell.text
          }`;
          nextMonthDay++;
        } else {
          cell.text = count++;
          const currentMonth =
              this.month + 1 < 10
              ? `0${this.month + 1}`
              : this.month + 1;
          cell.date = `${this.year}-${currentMonth}-${
            Number(cell.text) < 10 ? `0${cell.text}` : cell.text
          }`;
          // 当天
          if (cell.date === getCurrentDate()) {
            cell.type = "today";
          }
        }
        // 周几
        cell.dayOfWeek = this.DayOfWeek[j];
        // 判断当日有无备忘记录，设置爱高亮状态
        if (this.hasTasks(cell)) {
          cell.hightLight = true;

          // const instances = tippy("`#${}`", {
          //   arrow: true,
          //   placement: "left",
          //   arrowType: "sharp", // sharp(default) or 'round'
          //   animation: "fade",
          //   maxWidth: 200,
          //   animateFill: true,
          //   content: "...loading",
          //   trigger: "hover"
          // });
          // this.instance = instances[0];
          // this.instance.show(0);
        }
        this.$set(row, j, cell);
      }
    }
    this.tableRows = rows;
  }
  cellMatchesDate(cell: any, date: Date | string) {
    const value = new Date(date);
    return (
      this.year === value.getFullYear() &&
      this.month === value.getMonth() &&
      Number(cell.text) === value.getDate()
    );
  }
  // class修改cell样式
  getCellClasses(cell: any) {
    const classes = [];
    // console.log(cell.type)
    const today = cell.type === "today";
    const normal = cell.type === "";
    const disable = cell.disable;
    const hightLight = cell.hightLight;

    if (disable) classes.push("disable");

    if (today) {
      classes.push("today");
      classes.push("current-month");
      if (this.cellMatchesDate(cell, this.value)) {
        classes.push("current");
      }
    } else {
      classes.push(cell.type);
    }
    if (hightLight) classes.push("hight-light");

    if (cell.selected) classes.push("selected");
    return classes.join(" ");
  }
  prevYear() {
    this.showDate = new Date(dayjs(this.showDate).subtract(1, "year"));
  }
  prevMonth() {
    this.showDate = new Date(dayjs(this.showDate).subtract(1, "month"));
  }
  nextYear() {
    this.showDate = new Date(dayjs(this.showDate).add(1, "year"));
  }
  nextMonth() {
    this.showDate = new Date(dayjs(this.showDate).add(1, "month"));
  }
  // 格式化时间
  formatTime(time: string) {
    const hms = time.split(" ")[1];
    let hm: string = "";
    if (hms) {
      hm = `${hms.split(":")[0]}:${hms.split(":")[1]}`;
    } else {
      hm = `${time.split(":")[0]}:${time.split(":")[1]}`;
    }
    return hm;
  }
  // 隐藏日期选择面板
  hideTimePicker() {
    this.TimePickerVisible = false;
  }
  // 展示时间面板
  showTimePicker(index: number) {
    this.currentTaskIndex = index;
    setTimeout(() => {
      this.TimePickerVisible = true;
    }, 150);
  }
  // 判断当天是否存在备忘信息
  hasTasks(cell: any) {
    return this.monthTasks.indexOf(cell.date) !== -1;
  }
  // 展示当天任务
  showTaskTip(e: any, cell: any) {
    if (!cell.hightLight) {
      return false;
    }
    // 清除上一次的tip
    if (this.instance) {
      this.instance.destroy();
    }
    this.$nextTick(() => {
      this.instance = tippy(document.getElementById(`${cell.date}`), {
        theme: "bluebg",
        arrow: true,
        // trigger: "focus",
        placement: "top",
        arrowType: "sharp", // sharp(default) or 'round'
        // maxWidth: 200,
        animateFill: true,
        content: "...loading",
        flipOnUpdate: true,
        onShow(instance: any) {
          queryDayTasks(cell.date)
            .then((res: any) => {
              this.dayTasks = res.result;
              let dom = "";
              for (const item of this.dayTasks) {
                // 格式化时间去掉秒
                const startDate =
                  item.plantime.split(":")[0] +
                  ":" +
                  item.plantime.split(":")[1];
                let endDate = "";
                if (item.endtime) {
                  endDate =
                    item.endtime.split(":")[0] +
                    ":" +
                    item.endtime.split(":")[1];
                }
                dom += `<p style="white-space: nowrap;">${startDate} ${
                  endDate ? "- " + endDate : ""
                }：${item.content}</p>`;
              }
              instance.setContent(dom);
            })
            .catch(err => {
              console.log("onShow -> err", err);
            });
        }
      });
      // this.instance = instances[0];
      this.instance.show();
    });
  }
  // 右键事件展示可编辑面板
  showEditMenu(e: any, cell: any) {
    this.selectedDate = cell.date;
    queryDayTasks(cell.date)
      .then((res: any) => {
        this.dayTasks = res.result;
        this.menuOffset.clientX = e.clientX;
        this.menuOffset.clientY = e.clientY;
        this.currentTask = this.dayTasks;
        this.currentTask = this.currentTask.map((task: any) => {
          // const startTime = task.plantime.split(" ")[1];
          if (!task.endtime) {
            this.$set(task, "endtime", "2020-03-30 23:59");
          }
          // 格式化时间去掉秒
          const startDate =
            task.plantime.split(" ")[1].split(":")[0] +
            ":" +
            task.plantime.split(" ")[1].split(":")[1];
          const endDate =
            task.endtime.split(" ")[1].split(":")[0] +
            ":" +
            task.endtime.split(" ")[1].split(":")[1];

          this.$set(task, "timeRange", [startDate, endDate]);
          return task;
        });
      })
      .catch(err => {
        console.log("onShow -> err", err);
      });
  }
  // 删除某条备忘
  delOneTask(item: any, index: number) {
    delDayTask(item.id)
      .then(() => {
        this.currentTask.splice(index, 1);
        // 更新个人信息处待办任务数量,减1
        this.$emit("update-task", -1);

        if (this.currentTask.length <= 0) {
          // 该日期已不存在任务，在任务日期数组中移除
          const dateIndex = this.monthTasks.findIndex(
            (date: any) => date === this.selectedDate
          );
          if (dateIndex !== -1) {
            this.monthTasks.splice(dateIndex, 1);
          }
          this.initCalendar(); // 添加完任务重新渲染日历，标记当前日期已有备忘
        }
      })
      .catch(err => {
        console.log("onShow -> err", err);
      });
  }
  // 新增一条备忘到数据库
  saveOneTask(item: any, index: number) {
    const params: any = {
      content: item.content,
      plantime: `${this.selectedDate} ${item.timeRange[0]}:00`, // 格式化日期为后端需要格式
      endtime: `${this.selectedDate} ${item.timeRange[1]}:00` // 格式化日期为后端需要格式
    };
    // 如果id有值，则为编辑，传入id
    if (item.id) {
      this.$set(params, "id", item.id);
    }
    addDayTask({ data: params })
      .then((res: any) => {
        const obj: any = this.currentTask[index];
        obj.id = res.id;
        obj.isnew = false;
        this.monthTasks.push(this.selectedDate);
        this.initCalendar(); // 添加完任务重新渲染日历，标记当前日期已有备忘

        // 更新个人信息处待办任务数量,加1
        this.$emit("update-task", 1);
      })
      .catch(err => {
        console.log("onShow -> err", err);
      });
  }
  // 开始添加一条新的备忘
  addOneTask(item: any, index: number) {
    this.currentTask.push({
      isnew: true,
      plantime: "",
      endtime: "",
      timeRange: ["00:00", "23:59"],
      content: ""
    });
    // 动态调整位置
    this.$nextTick(() => {
      const cmu: any = this.$refs["context-menu"];
      cmu.offsetHandler();
    });
  }
  // 编辑某一条备忘
  eidtTask(item: any, index: number) {
    const obj: any = this.currentTask[index];
    this.$set(obj, "isnew", true);
    // 动态调整位置
    this.$nextTick(() => {
      const cmu: any = this.$refs["context-menu"];
      cmu.offsetHandler();
    });
  }
  // 日期单元格点击事件
  handleClick(cell: any) {
    console.log("handleClick -> cell", cell);

    // // 清除上一次的tip
    // if (this.instance) {
    //   this.instance.destroy()
    // }
    // if (this.isTip) {
    // }
    // const target = e.target;
    // if (target.tagName !== "TD") return;
    // if (cell.disable) return;
    // this.$emit("pick", cell.date);
  }
  created() {
    this.initCalendar();
  }
}
</script>

<style lang="scss">
.calendar {
  width: 100%;
  background-color: #ffffff;
  user-select: none;

  &-header {
    position: relative;
    width: 100%;
    height: 30px;
    color: #585859;
    font-size: 14px;
    font-weight: 500;
    line-height: 30px;
    text-align: center;
    background-color: #fff;

    .arrow {
      height: 14px;
      margin: 8px 0;
      line-height: 30px;
      color: #8b909e;
      cursor: pointer;

      &:hover {
        color: darken(#8b909e, 10%);
      }
    }

    .left {
      float: left;
      margin-left: 5px;
    }

    .right {
      float: right;
      margin-right: 5px;
    }
  }

  &-pane {
    width: 100%;
    border-collapse: separate;
    border-spacing: 3px 5px;
    table-layout: fixed;
    font-size: 12px;

    tr {
      th {
        min-width: 24px;
        max-width: 24px;
        color: #585859;
        font-size: 13px;
        font-weight: 500;
        text-align: center;
        line-height: 30px;
      }
    }

    td {
      height: 26px;
      line-height: 26px;
      box-sizing: border-box;
      font-weight: 400;
      color: #6d6c6c;
      border-radius: 50%;
      text-align: center;
      outline: none;
      cursor: auto;

      &:hover {
        background-color: #efefef;
      }
    }

    .today {
      background-color: #fed7cd !important;
      color: #ec554f !important;
    }

    .pre-month,
    .next-month {
      color: #9c9c9c;
    }
    .Sun,
    .Sat {
      color: #ec554f;
    }

    .hight-light,
    .has-task {
      background-color: #fef5cd !important;
      color: #f1b31d;
      cursor: pointer;
    }
  }
}
</style>
<style lang="scss">
.tippy-tooltip.bluebg-theme {
  background-color: #4192f7 !important;
  color: #fff !important;
  font-size: 12px !important;
  text-align: left !important;
}
.tippy-tooltip.bluebg-theme .tippy-arrow {
  border-top-color: #4192f7 !important;
}
.right-menu {
  li {
    padding: 0;
    text-align: left;
    input {
      display: inline-block;
      vertical-align: middle;
      // max-width: 80px;
      height: 20px;
      padding: 0 4px;
      font-size: 12px;
      color: #333;
      line-height: 20px;
      outline-style: none;
      border: 0px;
      text-align: left;
    }
    .time {
      display: inline-block;
      width: 180px;
      line-height: 20px;
      white-space: nowrap;
      text-align: center;
      &.el-range-editor.el-input__inner {
        padding: 3px 30px 3px 10px;
      }
      &.el-date-editor .el-range__close-icon {
        position: absolute;
        right: 5px;
        height: 20px;
        font-size: 2px;
      }
    }
    .remark {
      width: 140px;
    }
    .icon-del {
      width: 12px;
      height: 12px;
      color: #999;
      display: inline-block;
      vertical-align: middle;

      &:hover {
        color: #4192f7;
      }
    }
    .btn-save {
      display: inline-block;
      vertical-align: middle;
      margin-left: 10px;
      padding: 2px 5px;
      font-size: 10px;
      color: #333;
      background-color: #e7e7e7;
      border-radius: 3px;

      &:hover {
        color: #fff;
        background-color: #4192f7;
      }
    }
  }
  .btn-add {
    text-align: center;
  }
}
</style>
