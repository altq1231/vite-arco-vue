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
            {{ $t('app.name') }}
          </div>
          <nav class="nav-menu flex-row">
            <div class="menu-item">
              <router-link to="/">
                {{ $t('login.page.userAgreement') }}
              </router-link>
            </div>
            <div class="menu-item">
              <router-link to="/">
                {{ $t('login.page.privacyPolicy') }}
              </router-link>
            </div>
            <div class="menu-item">
              <router-link to="/">
                {{ $t('login.page.helpCenter') }}
              </router-link>
            </div>
          </nav>
        </div>
      </div>
      <div class="content-container flex-row fill-flex">
        <div class="login-card">
          <transition name="slide-fade">
            <Register v-model:showForm="showForm" v-if="showForm === 'register'" />
            <ForgotPassword v-model:showForm="showForm" v-else-if="showForm === 'forgot-password'" />
            <LoginForm v-model:showForm="showForm" v-else />
          </transition>
        </div>
      </div>
      <GlobalFooter />
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue';
import bannerImage from '/logo.svg';
import LoginForm from './components/login-form.vue';
import GlobalFooter from '../../components/global-footer/index.vue';
import Register from './components/register.vue';
import ForgotPassword from './components/forgot-password.vue';
import { useI18n } from 'vue-i18n';

const { t } = useI18n();
const showForm = ref('login');
</script>

<style lang="less" scoped>
.login-page {
  width: 100%;
  .left-side {
    flex: 0 0 520px;
    width: 520px;

    .login-banner {
      width: 520px;
      height: 100%;
      background-size: cover;
      background-position: 50%;
      background-image: url(../../assets/image/login_bg.png);
    }
  }

  .login-content {
    height: 100%;
    min-height: 100vh;

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
            margin-right: 15px;

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

      .login-card {
        overflow: hidden;
        padding: 30px 40px;
        width: 400px;
        height: 348px;
        position: relative;
      }
    }
  }
}
</style>
