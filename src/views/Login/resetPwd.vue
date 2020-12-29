<template>
  <div class="reset-password">
    <div class="input-line">
      <span class="label">当前用户:</span>
      <input v-model="getUserName" type="text" name="userName" readonly />
    </div>
    <div class="input-line">
      <span class="label">输入新密码:</span>
      <input
        v-model="password"
        type="password"
        name="password"
        placeholder="请输入新密码"
        @keyup="password = password.replace(/[\u4e00-\u9fa5]/gi, '')"
      />
      <span v-if="passwordWarn" class="warning-tip">{{ passwordWarn }}</span>
    </div>
    <div class="input-line">
      <span class="label">确认新密码:</span>
      <input
        v-model="confirmPwd"
        type="password"
        name="confirmPwd"
        placeholder="请确认新密码"
        @keyup="confirmPwd = confirmPwd.replace(/[\u4e00-\u9fa5]/gi, '')"
      />
      <span v-if="confirmPwdWarn" class="warning-tip">{{
        confirmPwdWarn
      }}</span>
    </div>
    <div class="input-line btn-line">
      <span class="btn" @click="submit">提交</span>
      <span class="btn goback" @click="goback">返回</span>
    </div>
  </div>
</template>

<script lang="ts">
import { Component, Prop, Vue, Watch } from "vue-property-decorator";
import { isvalidUsername, isvalidPwd } from "@utils/validate.ts";
import { updatePassword } from "@api/index.ts";
import { Getter } from "vuex-class";
@Component({})
export default class Login extends Vue {
  private password: string = "";
  private confirmPwd: string = "";
  private passwordWarn: string = "";
  private confirmPwdWarn: string = "";

  @Watch("password")
  getPwd(value: string | number) {
    if (value !== "") {
      this.passwordWarn = "";
      this.confirmPwdWarn = "";
    }
  }
  get getUserName() {
    const userInfo = JSON.parse(localStorage.getItem("user_info") as any);
    return userInfo.empCode || "";
  }
  // 校验
  isValid() {
    this.passwordWarn = "";
    this.confirmPwdWarn = "";
    if (this.password === "") {
      this.passwordWarn = "请输入新密码";
      return false;
    }
    if (this.confirmPwd === "") {
      this.confirmPwdWarn = "请确认新密码";
      return false;
    }
    if (this.password !== this.confirmPwd) {
      this.confirmPwdWarn = "两次密码输入不一致，请重新输入！";
      this.password = "";
      this.confirmPwd = "";
      return false;
    }
    return true;
  }
  submit() {
    if (this.isValid()) {
      const params = {
        userID: this.getUserName,
        newPassWord: this.password
      };
      updatePassword(params)
              .then((res: any) => {
                const r = res.retCode;
                if(r === "1"){
                  this.$message({
                    showClose: true,
                    message: '密码修改成功',
                    type: 'success'
                  });
                }else{
                  this.$message({
                    showClose: true,
                    message: '密码修改失败',
                    type: 'warning'
                  });
                }
              })
              .catch(err => {
                // console.log("onShow -> err", err);
                this.$message({
                  showClose: true,
                  message: '密码修改失败',
                  type: 'error'
                });
              });
      // console.log("Login -> submit -> params", params);
      // 密码提交接口
    }
  }
  goback() {
    this.$router.go(-1);
  }
}
</script>

<style rel="stylesheet/scss" lang="scss" scoped>
.reset-password {
  width: 100%;
  min-height: 100%;
  padding: 20px 0 0 0;
  background-color: #fff;
  text-align: left;

  .input-line {
    position: relative;
    height: 40px;
    line-height: 40px;
    margin: 10px 0;
    padding: 0 50px;

    .label {
      display: inline-block;
      width: 150px;
      font-size: 16px;
      font-weight: 500;
      color: #333;
      text-align: right;
    }

    input {
      margin: 0 0 0 15px;
      width: calc(100% - 170px);
      text-align: left;
      line-height: 26px;
      font-size: 14px;
      color: #333;
      border: solid 1px #999;
      background-color: #ffffe6;
      &:focus {
        outline: none;
      }
    }
    .warning-tip {
      position: absolute;
      left: 215px;
      bottom: -12px;
      font-size: 12px;
      color: red;
      line-height: 12px;
    }
  }
  .btn-line {
    text-align: center;
    .btn {
      display: inline-block;
      margin: 0 20px;
      padding: 5px 20px;
      font-size: 14px;
      color: #fff;
      font-weight: 500;
      line-height: 20px;
      background-color: #013571;
      cursor: pointer;

      &:hover {
        background-color: lighten(#013571, 10%);
      }
    }
    .goback {
      background-color: #999;

      &:hover {
        background-color: darken(#999, 10%);
      }
    }
  }
}
</style>
