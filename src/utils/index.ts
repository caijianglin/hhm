// export const resizeFooter = function (this: any) {
//   this.$nextTick(() => {
//     setTimeout(() => {
//       this.windowHeight = document.documentElement.clientHeight;
//       // 计算body真实高度，fixed下把未包含的footer高度加上
//       if (this.foot.style.position === "fixed") {
//         this.bodyHeight = document.body.offsetHeight + this.foot.offsetHeight;
//       }
//       else {
//         this.bodyHeight = document.body.offsetHeight;
//       }
//       this.bodyHeight < this.windowHeight
//         ? ((this.foot.style.position = "fixed"),
//           (this.foot.style.bottom = "0"))
//         : (this.foot.style.position = "relative");
//     }, 100);
//   });
// };
/**
 * 获取本月的天数
 * @param {Number} year
 * @param {Number} month
 */
export const getDayCountOfMonth = (year: number, month: number) => {
  if (month === 3 || month === 5 || month === 8 || month === 10) {
    return 30;
  }

  if (month === 1) {
    if ((year % 4 === 0 && year % 100 !== 0) || year % 400 === 0) {
      return 29;
    } else {
      return 28;
    }
  }

  return 31;
};

/**
 * 获取本年的天数
 * @param {Number} year
 */
export const getDayCountOfYear = (year: string | number) => {
  const y = Number(year);
  const isLeapYear = y % 400 === 0 || (y % 100 !== 0 && y % 4 === 0);
  return isLeapYear ? 366 : 365;
};

/**
 * 获取当月第一天是星期几
 * @param {Number} date
 */
export const getFirstDayOfMonth = (date: Date) => {
  const temp = new Date(date.getTime());
  temp.setDate(1);
  return temp.getDay();
};

// 获取统一的时间戳
export const clearTime = (date: Date) => {
  return new Date(date.getFullYear(), date.getMonth(), date.getDate());
};

// 获取前1/几天 date
export const prevDate = (date: Date, amount: number = 1) => {
  return new Date(date.getFullYear(), date.getMonth(), date.getDate() - amount);
};

// 获取后1/几天 date
export const nextDate = (date: Date, amount: number = 1) => {
  return new Date(date.getFullYear(), date.getMonth(), date.getDate() + amount);
};

// 当前年月日
export const getCurrentDate = () => {
  const date = new Date();
  const y = date.getFullYear();
  let m: string | number = date.getMonth() + 1;
  m = m < 10 ? "0" + m : m;
  let d: string | number = date.getDate();
  d = d < 10 ? "0" + d : d;
  return y + "-" + m + "-" + d;
};
