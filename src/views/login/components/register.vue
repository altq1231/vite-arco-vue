<template>
  <div class="register-form">
    <div class="register-form-title">{{ $t('register.form.title') }}</div>
    <div class="register-form-error-msg">{{ errorMessage }}</div>
    <a-form
      ref="registerFormRef"
      :model="registerInfo"
      :rules="registerRules"
      layout="vertical"
      @submit="handleSubmit">
      <a-form-item field="username" :label="$t('register.form.userName.label')" :validate-trigger="['change', 'blur']">
        <a-input v-model="registerInfo.username" :placeholder="$t('register.form.userName.placeholder')">
          <template #prefix>
            <icon-user />
          </template>
        </a-input>
      </a-form-item>
      <a-form-item field="password" :label="$t('register.form.password.label')" :validate-trigger="['change', 'blur']">
        <a-input-password
          v-model="registerInfo.password"
          :defaultVisibility="true"
          :placeholder="$t('register.form.password.placeholder')"
          allow-clear>
          <template #prefix>
            <icon-lock />
          </template>
        </a-input-password>
      </a-form-item>
      <a-form-item
        field="confirmPassword"
        :label="$t('register.form.confirmPassword.label')"
        :validate-trigger="['change', 'blur']">
        <a-input-password
          v-model="registerInfo.confirmPassword"
          :defaultVisibility="true"
          :placeholder="$t('register.form.confirmPassword.placeholder')"
          allow-clear>
          <template #prefix>
            <icon-lock />
          </template>
        </a-input-password>
      </a-form-item>
      <a-form-item
        field="userEmail"
        :label="$t('register.form.userEmail.label')"
        :validate-trigger="['change', 'blur']">
        <a-input-group class="email-group">
          <a-input v-model="registerInfo.userEmail" :placeholder="$t('register.form.userEmail.placeholder')">
            <template #prefix>
              <icon-user />
            </template>
          </a-input>
          <a-button type="primary" :disabled="disabledCaptcha">{{ $t('register.form.getCaptcha') }}</a-button>
        </a-input-group>
      </a-form-item>
      <a-form-item field="captcha" :label="$t('register.form.captcha.label')" :validate-trigger="['change', 'blur']">
        <a-input v-model="registerInfo.captcha" :placeholder="$t('register.form.captcha.placeholder')">
          <template #prefix>
            <icon-user />
          </template>
        </a-input>
      </a-form-item>
      <a-space class="register-form-bottom-btn" :size="16" direction="vertical">
        <a-button type="primary" html-type="submit" long :loading="loading">
          {{ $t('register.form.register') }}
        </a-button>
        <a-button type="text" long class="login-form-register-btn" @click="handleChangeShowForm('login')">
          {{ $t('register.form.back') }}
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
const registerFormRef = ref();
const errorMessage = ref('');
const resendTime = ref(60);
const registerInfo = reactive({
  username: '',
  password: '',
  confirmPassword: '',
  userEmail: '',
  captcha: ''
});

const disabledCaptcha = computed(() => {
  let temp = true;
  if (registerInfo.userEmail) {
    temp = false;
  }
  return temp;
});

const registerRules = {
  username: [{ required: true, message: t('register.form.userName.errMsg') }],
  password: [{ required: true, message: t('register.form.password.errMsg') }],
  confirmPassword: [
    { required: true, message: t('register.form.confirmPassword.errMsg') },
    {
      validator: (value, callback) => {
        if (value !== registerInfo.password) {
          callback(t('register.form.confirmPassword.errMsg2'));
        } else {
          callback();
        }
      }
    }
  ],
  userEmail: [
    {
      required: true,
      message: t('register.form.userEmail.errMsg')
    },
    {
      type: 'email',
      message: t('register.form.userEmail.errMsg2')
    }
  ],
  captcha: [{ required: true, message: t('register.form.captcha.errMsg') }]
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
      await userStore.register(values);

      Message.success(t('register.form.register.success'));
    } catch (err) {
      errorMessage.value = err.message;
    } finally {
      setLoading(false);
    }
  }
};
</script>

<style scoped lang="less">
.register-form {
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
