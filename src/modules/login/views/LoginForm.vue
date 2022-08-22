<template>
  <div class="auth">
    <div class="form-auth">
      <el-form
        ref="ruleFormRef"
        :model="ruleForm"
        status-icon
        :rules="rules"
        class="login-form"
        label-position="top"
        hide-required-asterisk="true">
        <el-form-item label="Логин" prop="login">
          <el-input
            placeholder="Введите логин"
            v-model="ruleForm.login"
            type="login"
            autocomplete="off" />
        </el-form-item>
        <el-form-item label="Пароль" prop="pass">
          <el-input
            placeholder="Введите пароль"
            v-model="ruleForm.pass"
            type="password"
            autocomplete="off" />
          <span v-if="store.getters.getErrorLogin"
            >Неправильный логин или пароль</span
          >
        </el-form-item>

        <el-form-item>
          <el-button
            type="primary"
            @click="submitForm(ruleFormRef, ruleForm.login, ruleForm.pass)">
            Отправить</el-button
          >
          <el-button type="danger" @click="resetForm(ruleFormRef)"
            >Сбросить</el-button
          >
        </el-form-item>
      </el-form>
    </div>
  </div>
</template>

<script lang="ts">
import { reactive, ref, defineComponent } from 'vue';
import { FormInstance } from 'element-plus';
import { RuleForm } from '@/modules/login/models/login-model';
import { useStore } from 'vuex';

export default defineComponent({
  name: 'LoginForm',
  setup() {
    const store = useStore();

    const ruleFormRef = ref<FormInstance>();
    const ruleForm = reactive<RuleForm>({
      login: '',
      pass: '',
    });

    const validateLogin = (rule: any, value: string, callback: any) => {
      store.commit('changeErrorLogin');
      if (value === '') {
        callback(new Error('Введите логин'));
        return;
      }
      if (ruleForm.login !== '') {
        if (!ruleFormRef.value) return;
        ruleFormRef.value.validateField('pass', () => null);
      }
      callback();
    };
    const validatePassword = (rule: any, value: string, callback: any) => {
      store.commit('changeErrorLogin');
      if (value === '') {
        callback(new Error('Введите пароль'));
        return;
      }
      callback();
    };

    const rules = reactive({
      login: [
        {
          validator: validateLogin,
          trigger: 'blur',
        },
      ],
      pass: [
        {
          validator: validatePassword,
          trigger: 'blur',
        },
      ],
    });

    const submitForm = async (
      formEl: FormInstance | undefined,
      login: string,
      password: string
    ) => {
      if (!formEl) return;
      await formEl.validate(async (isValid: any) => {
        if (isValid) {
          await store.dispatch('loginUser', { login, password });
        }
      });
    };
    const resetForm = (formEl: FormInstance | undefined) => {
      store.commit('changeErrorLogin');
      if (!formEl) return;
      formEl.resetFields();
    };

    return {
      ruleForm,
      rules,
      submitForm,
      ruleFormRef,
      resetForm,
      store,
    };
  },
});
</script>

<style lang="scss" scoped>
.auth {
  display: flex;
  width: 100%;
  height: 100vh;
  justify-content: center;
  align-items: center;
}
.form-auth {
  padding: 20px;
  border: 1px solid rgb(128, 126, 126);
  border-radius: 15px;
  background-color: $background-day-blocks;
}
</style>
