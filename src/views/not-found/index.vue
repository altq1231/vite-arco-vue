<template>
  <div class="nothing-page flex-col">
    <div class="top-tips flex-row">
      <img class="run-img" src="../../assets/svg/web404.svg" />
      <div class="right-info">
        <h1>
          Oops！Error
          <span>404</span>
          …
        </h1>
        <p>很抱歉，找不到您请求的页面.</p>
        <a-button class="back-btn" key="back" type="primary" @click="back">返回</a-button>
      </div>
    </div>
  </div>
</template>

<script lang="ts" setup>
  import { useRouter } from 'vue-router';

  const router = useRouter();
  const back = () => {
    // warning： Go to the node that has the permission
    router.push({ name: 'Home' });
  };
</script>

<style lang="less" scoped></style>
