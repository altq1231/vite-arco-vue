<template>
  <div class="forgot-password-form">
    注册
    <a-button type="primary" @click="handleChangeShowForm('login')">返回</a-button>
  </div>
</template>

<script lang="ts" setup>
const props = defineProps({
  showForm: {
    type: String,
    required: true
  }
});

const emits = defineEmits(['update:showForm']);

const handleChangeShowForm = (form: string) => {
  emits('update:showForm', form);
};
</script>

<style scoped lang="less">
.forgot-password-form {
  width: 340px;
}
</style>