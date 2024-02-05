<template>
  <div class="forgot-password-form">
    <div class="forgot-password-form-title">{{ $t('forgotPassword.form.title') }}</div>
    <div class="forgot-password-form-error-msg">{{ errorMessage }}</div>
    <a-form
      ref="forgotPasswordFormRef"
      :model="forgotPasswordInfo"
      :rules="forgotPasswordRules"
      layout="vertical"
      @submit="handleSubmit">
      <a-form-item field="password" :label="$t('forgotPassword.form.password.label')" :validate-trigger="['change', 'blur']">
        <a-input-password
          v-model="forgotPasswordInfo.password"
          :defaultVisibility="true"
          :placeholder="$t('forgotPassword.form.password.placeholder')"
          allow-clear>
          <template #prefix>
            <icon-lock />
          </template>
        </a-input-password>
      </a-form-item>
      <a-form-item
        field="confirmPassword"
        :label="$t('forgotPassword.form.confirmPassword.label')"
        :validate-trigger="['change', 'blur']">
        <a-input-password
          v-model="forgotPasswordInfo.confirmPassword"
          :defaultVisibility="true"
          :placeholder="$t('forgotPassword.form.confirmPassword.placeholder')"
          allow-clear>
          <template #prefix>
            <icon-lock />
          </template>
        </a-input-password>
      </a-form-item>
      <a-form-item
        field="userEmail"
        :label="$t('forgotPassword.form.userEmail.label')"
        :validate-trigger="['change', 'blur']">
        <a-input-group class="email-group">
          <a-input v-model="forgotPasswordInfo.userEmail" :placeholder="$t('forgotPassword.form.userEmail.placeholder')">
            <template #prefix>
              <icon-user />
            </template>
          </a-input>
          <a-button type="primary" :disabled="disabledCaptcha">{{ $t('forgotPassword.form.getCaptcha') }}</a-button>
        </a-input-group>
      </a-form-item>
      <a-form-item field="captcha" :label="$t('forgotPassword.form.captcha.label')" :validate-trigger="['change', 'blur']">
        <a-input v-model="forgotPasswordInfo.captcha" :placeholder="$t('forgotPassword.form.captcha.placeholder')">
          <template #prefix>
            <icon-user />
          </template>
        </a-input>
      </a-form-item>
      <a-space class="forgotPassword-form-bottom-btn" :size="16" direction="vertical">
        <a-button type="primary" html-type="submit" long :loading="loading">
          {{ $t('forgotPassword.form.forgotPassword') }}
        </a-button>
        <a-button type="text" long class="login-form-forgotPassword-btn" @click="handleChangeShowForm('login')">
          {{ $t('forgotPassword.form.back') }}
        </a-button>
      </a-space>
    </a-form>
  </div>
</template>
<script setup>
import { ref, reactive, computed } from 'vue';
import { useI18n } from 'vue-i18n';
import useLoading from '@/hooks/loading';

const { t } = useI18n();
const { loading, setLoading } = useLoading();
const props = defineProps({
  showForm: {
    type: String,
    required: true
  }
});
const forgotPasswordFormRef = ref();
const errorMessage = ref('');
const resendTime = ref(60);
const forgotPasswordInfo = reactive({
  username: '',
  password: '',
  confirmPassword: '',
  userEmail: '',
  captcha: ''
});

const disabledCaptcha = computed(() => {
  let temp = true;
  if (forgotPasswordInfo.userEmail) {
    temp = false;
  }
  return temp;
});

const forgotPasswordRules = {
  password: [{ required: true, message: t('forgotPassword.form.password.errMsg') }],
  confirmPassword: [
    { required: true, message: t('forgotPassword.form.confirmPassword.errMsg') },
    {
      validator: (value, callback) => {
        if (value !== forgotPasswordInfo.password) {
          callback(t('forgotPassword.form.confirmPassword.errMsg2'));
        } else {
          callback();
        }
      }
    }
  ],
  userEmail: [
    {
      required: true,
      message: t('forgotPassword.form.userEmail.errMsg')
    },
    {
      type: 'email',
      message: t('forgotPassword.form.userEmail.errMsg2')
    }
  ],
  captcha: [{ required: true, message: t('forgotPassword.form.captcha.errMsg') }]
};

const emits = defineEmits(['update:showForm']);

const handleChangeShowForm = (form) => {
  emits('update:showForm', form);
};

const handleSubmit = async ({
  errors,
  values
}) => {
  if (loading.value) return;
  if (!errors) {
    setLoading(true);
    try {
      await userStore.forgotPassword(values);

      Message.success(t('forgotPassword.form.forgotPassword.success'));
    } catch (err) {
      errorMessage.value = err.message;
    } finally {
      setLoading(false);
    }
  }
};
</script>

<style scoped lang="less">
.forgot-password-form {
  width: 340px;
  &-title {
    color: var(--color-text-1);
    font-weight: 500;
    font-size: 24px;
    line-height: 32px;
  }

  &-error-msg {
    height: 32px;
    color: rgb(var(--red-6));
    line-height: 32px;
  }

  &-bottom-btn {
    margin-top: 20px;
  }

  .email-group {
    width: 100%;
  }
}
</style>
