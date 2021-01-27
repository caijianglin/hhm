import request from "@/utils/request";

/**
 *  获取首页数据
 *
 * @export
 * @returns
 */
export function getBannerImg() {
  return request({
    url: "com.primeton.portal.topBiz.getAllTopimgs.biz.ext",
    method: "post"
  });
}

/**
 *  获取公司字典数据
 *
 * @export
 * @returns
 */
export function getCompanyDict() {
  return request({
    url: "com.primeton.portal.commonBiz.queryCompanyDict.biz.ext",
    method: "post"
  });
}

/**
 *  获取公告、新闻tab字典数据
 *
 * @export
 * @returns
 */
export function getAdZsDict(companyid: string) {
  return request({
    url: "com.primeton.portal.commonBiz.queryPolDict.biz.ext",
    method: "post",
    data: {companyid}
  });
}

/**
 *  获取待办任务
 *
 * @export
 * @returns
 */
export function getTodoAmount() {
  return request({
    url: "com.primeton.portal.taskBiz.queryPersonWorkItemCount.biz.ext",
    method: "post"
  });
}
/**
 *  获取待办任务
 *
 * @export
 * @returns
 */
export function getDayTaskAmount() {
  return request({
    url: "com.primeton.portal.scheduleBiz.queryScheduleCount.biz.ext",
    method: "post"
  });
}

/**
 *  获取个人区域列表
 *
 * @export
 * @param {object} params
 * @returns
 */
export function getPersonalList() {
  return request({
    url: "com.primeton.portal.toolBiz.queryAllTools.biz.ext",
    method: "post"
  });
}

/**
 *  删除个人区域列表数据
 *
 * @export
 * @param {object} params
 * @returns
 */
export function addToPersonalList(data: any) {
  return request({
    url: "com.primeton.portal.toolBiz.addTool.biz.ext",
    method: "post",
    data
  });
}

/**
 *  添加到个人区域
 *
 * @export
 * @param {object} params
 * @returns
 */
export function delPersonalList(id: string | number) {
  return request({
    url: "com.primeton.portal.toolBiz.delToolById.biz.ext",
    method: "post",
    data: { id }
  });
}

/**
 *  获取功能列表
 *
 * @export
 * @param {object} params
 * @returns
 */
export function getManagementList(appCode: string) {
  return request({
    url: "com.primeton.portal.funBiz.queryAllFuns.biz.ext",
    method: "post",
    data: {appCode}
  });
}

/**
 *  获取待办列表
 *
 * @export
 * @param {object} params
 * @returns
 */
export function getNeedTodoList() {
  return request({
    url: "com.primeton.portal.taskBiz.queryPersonWorkItems.biz.ext",
    method: "post"
  });
}
/**
 *  获取已办列表
 *
 * @export
 * @param {object} params
 * @returns
 */
export function getFinishedTodoList() {
  return request({
    url: "com.primeton.portal.taskBiz.queryPersonFinishedWorkItems.biz.ext",
    method: "post"
  });
}
/**
 *  获取未阅通知
 *
 * @export
 * @param {object} params
 * @returns
 */
export function getNotificationList() {
  return request({
    url: "com.primeton.portal.taskBiz.queryNotificationList.biz.ext?state=UNVIEWED",
    method: "post"
  });
}
/**
 *  获取已阅通知
 *
 * @export
 * @param {object} params
 * @returns
 */
export function getNotificationedList() {
  return request({
    url: "com.primeton.portal.taskBiz.queryNotificationList.biz.ext?state=VIEWED",
    method: "post"
  });
}

/**
 *  添加日程任务
 *
 * @export
 * @param {object} params
 * @returns
 */
export function addDayTask(data: object) {
  return request({
    url: "com.primeton.portal.scheduleBiz.addScheduleInfo.biz.ext",
    method: "post",
    data
  });
}

/**
 *  删除日程任务
 *
 * @export
 * @param {object} params
 * @returns
 */
export function delDayTask(id: string | number) {
  return request({
    url: "com.primeton.portal.scheduleBiz.delScheduleInfoById.biz.ext",
    method: "post",
    data: { id }
  });
}

/**
 *  获取便捷工具
 *
 * @export
 * @param {object} params
 * @returns
 */
export function getToolList(stype: string | number,appCode: string) {
  return request({
    url: "com.primeton.portal.poltoolbiz.queryPolToolByCode.biz.ext",
    method: "post",
    data: { 'stype':stype,'appCode':appCode }
  });
}

/**
 *  查询某月下的含任务日期
 *
 * @export
 * @param {object} params
 * @returns
 */
export function queryMonthTasks(month: string | number) {
  return request({
    url: "com.primeton.portal.scheduleBiz.queryScheduleInfosMon.biz.ext",
    method: "post",
    data: { month }
  });
}
/**
 *  查询某日下的任务记录
 *
 * @export
 * @param {object} params
 * @returns
 */
export function queryDayTasks(day: string | Date) {
  return request({
    url: "com.primeton.portal.scheduleBiz.queryScheduleInfosDay.biz.ext",
    method: "post",
    data: { day }
  });
}

/**
 *  获取公告列表
 *
 * @export
 * @param {object} params
 * @returns
 */
export function getNoticeDate(stype: string,companyCode: string) {
  return request({
    url: "com.primeton.portal.polnoticebiz.queryNoticesByType.biz.ext",
    method: "post",
    data: { 'stype':stype,'companyCode':companyCode }
  });
}

// 获取新闻公告分页数据
export function getNoticePageDate(data: any) {
  return request({
    url: "com.primeton.portal.polnoticebiz.queryNoticesByTypeWithPage.biz.ext",
    method: "post",
    data
  });
}

// 修改密码
export function updatePassword(data: any) {
  return request({
    url: "com.primeton.portal.commonBiz.updatePassword.biz.ext",
    method: "post",
    data
  });
}
/**
 *  获取公告详细
 *
 * @export
 * @param {object} params
 * @returns
 */
export function getNoticeInfo(id: string | number) {
  return request({
    url: "com.primeton.portal.polnoticebiz.queryNoticeDetail.biz.ext",
    method: "post",
    data: { id }
  });
}

// 获取最近日程
export function queryRecentlySchedule() {
  return request({
    url: "com.primeton.portal.scheduleBiz.queryRecentlySchedule.biz.ext",
    method: "get"
  });
}

/**
 *  下载附件
 *
 * @export
 * @param {object} params
 * @returns
 */
export function downloadFile(params: any) {
  return request({
    url: "FileDownLoadDiskServlet",
    // headers: {
    //   "Content-Type": "application/pdf",
    //   "Content-Disposition": "inline;filename=module.pdf"
    // },
    method: "get",
    responseType: "blob",
    params
  });
}
/**
 *  问候语修改
 *
 * @export
 * @param {object} data
 * @returns
 */
export function signEdit(data: any) {
  return request({
    url: "com.primeton.portal.commonBiz.updateEmpById.biz.ext",
    method: "post",
    data
  });
}