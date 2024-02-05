<template>
  <div class="register-form">
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
.register-form {
  width: 320px;
  height: 288px;
}
</style>
