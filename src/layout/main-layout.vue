<template>
  <a-layout class="layout">
    <div class="layout-header"><GlobalHeader /></div>
    <a-layout-content class="layout-content" :style="paddingStyle">
      <default-layout />
      <GlobalFooter />
    </a-layout-content>
  </a-layout>
</template>

<script setup>
import { computed, ref } from 'vue';
import { useAppStore, useUserStore } from '@/store';
import DefaultLayout from './index.vue';
import GlobalHeader from '@/components/global-header/index.vue';
import GlobalFooter from '@/components/global-footer/index.vue';

const isInit = ref(false);
const appStore = useAppStore();
const navbarHeight = `60px`;
const renderMenu = computed(() => appStore.menu && !appStore.topMenu);
const hideMenu = computed(() => appStore.hideMenu);
const menuWidth = computed(() => {
  return appStore.menuCollapse ? 48 : appStore.menuWidth;
});
const collapsed = computed(() => {
  return appStore.menuCollapse;
});
const paddingStyle = computed(() => {
  const paddingLeft = renderMenu.value && !hideMenu.value ? { paddingLeft: `${menuWidth.value}px` } : {};
  const paddingTop = { paddingTop: navbarHeight };
  return { ...paddingLeft, ...paddingTop };
});
</script>

<style scoped lang="less">
@nav-size-height: 60px;
@layout-max-width: 1100px;
.layout {
  height: 100%;
  width: 100%;
}
.layout-header {
  position: fixed;
  top: 0;
  left: 0;
  z-index: 100;
  width: 100%;
  height: @nav-size-height;
}

.layout-content {
  min-height: 100vh;
  background-color: var(--color-fill-2);
  transition: padding 0.2s cubic-bezier(0.34, 0.69, 0.1, 1);
}
</style>
