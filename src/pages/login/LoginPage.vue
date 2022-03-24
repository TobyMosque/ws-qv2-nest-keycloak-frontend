<template>
  <div id="page-login">
    <h5 class="q-my-md">{{ $t('login.title') }}</h5>
    <q-separator></q-separator>
    <q-form ref="form" class="row q-col-gutter-sm">
      <div class="col col-12">
        <qc-input
          v-model="username"
          :label="$t('fields.username')"
          :rules="validation.userName"
          @blur="isUsernameValid = true"
        ></qc-input>
      </div>
      <div class="col col-12">
        <qc-input
          type="password"
          v-model="password"
          :label="$t('fields.password')"
          :rules="validation.password"
          @blur="isPasswordValid = true"
        ></qc-input>
      </div>
      <div class="col col-5">
        <q-btn
          class="full-width"
          flat
          color="primary"
          :label="$t('actions.forget')"
          @click="forget"
        ></q-btn>
      </div>
      <div class="col col-7"></div>
      <div class="col col-5">
        <q-btn
          class="full-width"
          color="secondary"
          :label="$t('actions.createAccount')"
          to="/register"
        ></q-btn>
      </div>
      <div class="col col-7">
        <q-btn
          class="full-width"
          color="positive"
          :label="$t('actions.login')"
          @click="login"
        ></q-btn>
      </div>
    </q-form>
  </div>
</template>

<script lang="ts">
import { defineComponent, ref } from 'vue';
import useValidation from 'src/composables/validations';
import useLoginPageStore from './login.store';
import { storeToRefs } from 'pinia';
import { QForm } from 'quasar';
import { log } from 'src/utils/console';

export default defineComponent({
  name: 'LoginPage',
  setup() {
    const store = useLoginPageStore();
    const state = storeToRefs(store);
    log('Hello Login Page!');
    const form = ref<QForm>();
    const isUsernameValid = ref<boolean | string>(true);
    const isPasswordValid = ref<boolean | string>(true);
    const validation = useValidation({
      userName: {
        required: true,
        email: true,
        server: isUsernameValid,
      },
      password: {
        required: true,
        server: isPasswordValid,
      },
    });

    async function login() {
      validation.resetServer();
      const isValid = await form.value?.validate();
      if (isValid) {
        await store.login();
      }
    }

    return {
      ...state,
      form,
      isUsernameValid,
      isPasswordValid,
      validation,
      forget: store.forget.bind(store),
      login,
    };
  },
});
</script>
