<template>
  <div class="foot-copyright">{{ $t('app.name') }} {{ $t('app.footer') }} {{ $t('app.footer.company') }}</div>
</template>
<script setup>
import { useI18n } from 'vue-i18n';
const { t } = useI18n();
</script>
<style lang="less" scoped>
.foot-copyright {
  padding: 20px;
  font-size: 12px;
  color: #999999;
  line-height: 20px;
  text-align: center;
}
</style>
