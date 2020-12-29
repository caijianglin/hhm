<template>
  <div class="login">
    <div class="login-header">
      <img class="logo-icon" src="@assets/logoJT.png" alt="" />
    </div>
    <div class="login-content">
      <div class="login-box">
        <div class="login-box-form">
          <p class="title">集成管理平台</p>
          <p v-show="loginError" class="error-tip">用户名或密码错误</p>
          <div class="input-wrapper">
            <svg-icon class="icon" icon-class="name"></svg-icon>
            <input v-model.trim="name" placeholder="请输入用户名" type="text" />
            <!-- @blur="validateUsername" -->
            <!-- <p class="warn" v-show="nameWarn">用户名格式错误</p> -->
          </div>
          <div class="input-wrapper">
            <svg-icon class="icon" icon-class="password"></svg-icon>
            <input
              v-model="password"
              placeholder="请输入密码"
              type="password"
              @keyup.enter="login"
            />
            <!-- @blur="validatePassword" -->
            <p class="warn" v-show="pwdWarn">{{ pwdText }}</p>
          </div>
          <div
            class="login-button btn-hover-animate"
            v-btnLoading="btnLoading"
            @click="login"
          >
            登录
          </div>
        </div>
      </div>
    </div>
    <div class="login-footer">
      中船动力（集团）有限公司@2020 版权所有
    </div>
  </div>
</template>

<script lang="ts">
import { Component, Prop, Vue } from "vue-property-decorator";
import { isvalidUsername, isvalidPwd } from "@utils/validate.ts";
@Component({})
export default class Login extends Vue {
  private name: string = "";
  private password: string = "";
  private btnLoading: boolean = false;
  private loginError: boolean = false;
  //   private nameWarn: boolean = false;
  private pwdWarn: boolean = false;
  private pwdText: string = "";

  //   validateUsername() {
  //     if (isvalidUsername(this.name)) {
  //       this.nameWarn = false;
  //     } else {
  //       this.nameWarn = true;
  //     }
  //   }
  validatePassword() {
    // 输入为空提示“输入密码”
    if (!this.password) {
      this.pwdText = "请输入密码";
      this.pwdWarn = true;
      return false;
    }
    this.pwdText = "密码格式错误";
    if (isvalidPwd(this.password)) {
      this.pwdWarn = false;
    } else {
      this.pwdWarn = true;
    }
  }

  login() {
    this.btnLoading = true;
    // 校验密码格式
    // this.validatePassword();
    // 用户名为空或密码格式错误不允许登录
    if (this.name === "" && this.pwdWarn) {
      this.btnLoading = false;
      return false;
    }
    // 调用登录接口，刷新登录状态并登录
    const formData = new FormData();
    formData.append("username", this.name);
    formData.append("password", this.password);

    this.$store
      .dispatch("UserLogin", formData)
      .then(res => {
        this.btnLoading = false;
        // 验证+登录成功跳转到首页
        console.log("登陆成功");
        this.$store.dispatch("GetUserInfo").then(() => {
          this.$router.push("/");
        });
      })
      .catch(error => {
        if (error) alert(error);
        this.btnLoading = false;
      });
  }
}
</script>

<style rel="stylesheet/scss" lang="scss" scoped>
.login {
  width: 100%;
  height: 100%;
  overflow: hidden;

  &-header {
    width: 100%;
    height: 70px;
    padding: 18px 0;
    .logo-icon {
      display: block;
      height: 35px;
      margin: 0 0 0 157px;
    }
  }
  &-content {
    width: 100%;
    height: calc(100vh - 130px);
    overflow: hidden;
    background: url("~@assets/login-bg.png") no-repeat;
    background-size: cover;
    background-position-x: 25%;

    .login-box {
      position: absolute;
      right: 101px;
      top: 176px;
      width: 410px;
      height: 393px;
      padding: 14px;
      background-color: rgba(2, 71, 155, 0.2);
      border-radius: 9px;

      &-form {
        width: 100%;
        height: 100%;
        padding: 32px 24px;
        background-color: #fff;
        border-radius: 4px;
        text-align: left;

        .title {
          font-size: 18px;
          font-weight: 500;
          color: #185c91;
          line-height: 26px;
        }

        .error-tip {
          position: absolute;
          font-size: 12px;
          margin-top: 12px;
          color: red;
        }

        .input-wrapper {
          position: relative;
          width: 100%;
          height: 42px;
          margin-bottom: 24.5px;
          padding: 11px 25.5px;
          background-color: #d5dadd;
          border-radius: 21px;
          color: #7b7d7e;
          line-height: 20px;

          &:nth-of-type(1) {
            margin-top: 53px;
          }
          .icon {
            width: 12px;
            display: inline-block;
            vertical-align: middle;
            color: #7b7d7e;
            margin-right: 13.5px;
          }
          input {
            width: calc(100% - 76.5px);
            height: 20px;
            vertical-align: middle;
            font-size: 13px;
            color: #333;
            line-height: 20px;
            outline-style: none;
            border: 0px;
            border-radius: 2px;

            &:focus {
              outline: none;
            }
          }
          .warn {
            font-size: 12px;
            margin-top: 12px;
            color: red;
          }
        }
        .login-button {
          width: 100%;
          height: 42px;
          margin-top: 40px;
          background-color: #013571;
          border-radius: 21px;
          text-align: center;
          font-size: 18px;
          font-weight: 500;
          color: #fff;
          line-height: 42px;
          cursor: pointer;
          user-select: none;
          overflow: hidden;
        }
      }
    }
  }
  &-footer {
    width: 100%;
    height: 60px;
    line-height: 60px;
    text-align: center;
    font-weight: 500;
    font-size: 14px;
    color: rgba(0, 0, 0, 0.39);
  }

  //   &-header {
  //     width: 100%;
  //     height: 13vh;
  //     padding: 3.7vh 0;
  //     .logo-icon {
  //       display: block;
  //       height: 5.6vh;
  //       margin: 0 0 0 10.9vw;
  //     }
  //   }
  //   &-content {
  //     width: 100%;
  //     height: 590px;
  //     overflow: hidden;
  //     background: url("~@assets/login-bg.png") no-repeat;
  //     background-size: cover;
  //   }
  //   &-footer {
  //     width: 100%;
  //     height: 11vh;
  //     line-height: 11vh;
  //     text-align: center;
  //     font-weight: 500;
  //     color: rgba(0, 0, 0, 0.39);
  //   }

  @media screen and (min-width: 1442px) {
    &-header {
      width: 100%;
      height: 70px;
      padding: 18px 0;
      .logo-icon {
        display: block;
        height: 35px;
        margin: 0 0 0 157px;
      }
    }
    &-content {
      width: 100%;
      height: calc(100vh - 130px);
      overflow: hidden;
      background: url("~@assets/login-bg.png") no-repeat;
      background-size: cover;

      .login-box {
        // position: absolute;
        right: 135px;
        top: 235px;
        // width: 510px;
        // height: 488px;
        // padding: 19px;
        // background-color: rgba(2, 71, 155, 0.2);
        // border-radius: 12px;

        // &-form {
        //   width: 100%;
        //   height: 100%;
        //   padding: 45px 32px;
        //   background-color: #fff;
        //   border-radius: 6px;
        //   text-align: left;

        //   .title {
        //     font-size: 24px;
        //     font-weight: 500;
        //     color: #185c91;
        //     line-height: 30px;
        //   }

        //   .error-tip {
        //     position: absolute;
        //     font-size: 13px;
        //     margin-top: 12px;
        //     color: red;
        //   }

        //   .input-wrapper {
        //     position: relative;
        //     width: 100%;
        //     height: 56px;
        //     margin-bottom: 33px;
        //     padding: 15px 34px;
        //     background-color: #d5dadd;
        //     border-radius: 28px;
        //     color: #7b7d7e;
        //     line-height: 26px;

        //     &:nth-of-type(1) {
        //       margin-top: 53px;
        //     }
        //     .icon {
        //       width: 16px;
        //       display: inline-block;
        //       vertical-align: middle;
        //       color: #7b7d7e;
        //       margin-right: 18px;
        //     }
        //     input {
        //       width: calc(100% - 102px);
        //       vertical-align: middle;
        //       height: 26px;
        //       font-size: 16px;
        //       color: #333;
        //       line-height: 26px;
        //       outline-style: none;
        //       border: 0px;
        //       border-radius: 3px;

        //       &:focus {
        //         outline: none;
        //       }
        //     }
        //     .warn {
        //       font-size: 12px;
        //       margin-top: 12px;
        //       color: red;
        //     }
        //   }
        //   .login-button {
        //     position: relative;
        //     width: 100%;
        //     height: 56px;
        //     margin-top: 54px;
        //     background-color: #013571;
        //     border-radius: 28px;
        //     text-align: center;
        //     font-size: 24px;
        //     font-weight: 500;
        //     color: #fff;
        //     line-height: 56px;
        //     cursor: pointer;
        //     user-select: none;
        //     overflow: hidden;
        //   }
        // }
      }
    }
    &-footer {
      width: 100%;
      height: 60px;
      line-height: 60px;
      text-align: center;
      font-weight: 500;
      font-size: 14px;
      color: rgba(0, 0, 0, 0.39);
    }
  }
}
</style>
