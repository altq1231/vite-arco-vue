<template>
  <div class="login-page flex-row">
    <div class="left-side">
      <div class="login-banner"></div>
    </div>
    <div class="login-content flex-col fill-flex">
      <div class="top-header">
        <div class="header-container flex-row">
          <div class="logo-content flex-row">
            <img class="logo" :src="bannerImage" />
            管理后台
          </div>
          <nav class="nav-menu flex-row">
            <div class="menu-item">
              <router-link to="/">用户协议</router-link>
            </div>
            <div class="menu-item">
              <router-link to="/">隐私政策</router-link>
            </div>
            <div class="menu-item">
              <router-link to="/">帮助中心</router-link>
            </div>
          </nav>
        </div>
      </div>
      <div class="content-container flex-row fill-flex">
        <div class="login-card">
          <LoginForm />
        </div>
      </div>
      <div class="foot-copyright">hh home ©2022 Created by Altq</div>
    </div>
  </div>
</template>

<script setup>
import bannerImage from '/logo.svg';
import LoginForm from './components/login-form.vue';
</script>

<style lang="less" scoped>
.login-page {
  width: 100%;
  .left-side {
    flex: 0 0 400px;
    width: 400px;

    .login-banner {
      width: 400px;
      height: 100%;
      background-size: cover;
      background-position: 50%;
      background-image: url(../../assets/image/login_bg.png);
    }
  }

  .login-content {
    height: 100%;
    position: relative;
    padding-bottom: 40px;
    min-height: 100vh;
    .foot-copyright {
      position: absolute;
      padding: 0 20px;
      font-size: 12px;
      color: #999999;
      line-height: 18px;
      text-align: center;
      left: 0;
      right: 0;
      bottom: 20px;
    }

    .top-header {
      flex: 0 0 65px;
      width: 100%;
      height: 65px;
      color: var(--color-text-1);
      overflow: hidden;
      transition: background-color 0.5s ease;
      padding: 0 20px;
      .header-container {
        height: 100%;
        position: relative;
        align-items: center;
        justify-content: space-between;
        .logo-content {
          align-items: center;
          font-size: 22px;

          .logo {
            height: 40px;
            margin-right: 20px;

            svg {
              height: 100%;
            }
          }
        }

        .nav-menu {
          margin-left: 30px;
          .menu-item {
            &:nth-child(n + 2) {
              margin-left: 10px;
            }

            &:nth-last-child(n + 2) {
              margin-right: 10px;
            }

            a {
              color: var(--color-text-3);
              font-size: 14px;
              transition: color 0.3s;

              &:hover {
                color: rgb(var(--primary-6));
              }
            }

            &.active {
              a {
                color: rgb(var(--primary-6));
              }
            }
          }
        }
      }
    }

    .content-container {
      align-items: center;
      justify-content: center;
      padding-top: 30px;

      .login-card {
        padding: 40px 45px;
        overflow: hidden;
        position: relative;
        min-width: 450px;
        margin: 0 auto 80px;

        .form-content {
          padding: 20px 0 0;

          :deep(.ant-form-item) {
            margin-bottom: 30px;
          }

          :deep(.ant-form-item-with-help) {
            margin-bottom: 6px;
          }

          .input-item {
            .form-input.ant-input.password-input {
              padding-right: 60px;
            }
            .password-icon {
              position: absolute;
              right: 0;
              top: 0;
              height: 60px;
              width: 60px;
              display: flex;
              align-items: center;
              justify-content: center;
              font-size: 20px;
              color: rgba(0, 0, 0, 0.25);
              cursor: pointer;
              user-select: none;

              &:hover {
                color: rgba(0, 0, 0, 0.45);
              }
            }
          }

          .login-btn {
            height: 60px;
            margin-top: 30px;
            margin-bottom: 16px;
            width: 100%;
            font-size: 20px;
            line-height: 50px;

            &:disabled {
              color: #ffffff;
              background-color: #6aadfd;
              border-color: #6aadfd;
              cursor: initial;
            }
          }

          .form-actions {
            align-items: center;
            justify-content: space-between;
            margin-bottom: 14px;

            .forget,
            .code-login {
              font-size: 17px;
              height: 26px;
              line-height: 26px;
              color: rgb(var(--primary-6));
              cursor: pointer;
              transition: color 0.3s;

              &:hover {
                color: #2e8dff;
              }
            }
          }
        }

        .other-login {
          .login-title {
            flex: 0 0 40px;
            height: 40px;
            line-height: 40px;
            text-align: center;
            font-size: 17px;
            font-weight: 400;
            color: #aaaaaa;
            text-align: center;
          }

          .other-login-content {
            align-items: center;
            justify-content: center;
            margin-top: 10px;

            .login-item {
              margin: 0 12px;
              flex: 0 0 46px;
              width: 46px;
              height: 46px;
              display: flex;
              align-items: center;
              justify-content: center;

              a {
                font-size: 46px;
                width: 46px;
                height: 46px;
                overflow: hidden;
                border-radius: 23px;
                line-height: 1;
              }
            }
          }
        }
      }
    }
  }
}
</style>
