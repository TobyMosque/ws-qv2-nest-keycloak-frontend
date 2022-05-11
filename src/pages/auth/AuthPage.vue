<template>
  <div id="page-login">
    <h5 class="q-my-md">{{ $t('login.title') }}</h5>
    <q-separator></q-separator>
    <q-form ref="form" class="row q-col-gutter-sm">
      <div class="col col-5">
        <q-btn
          class="full-width"
          color="secondary"
          :href="registerUrl"
          :label="$t('actions.createAccount')"
        ></q-btn>
      </div>
      <div class="col col-7">
        <q-btn
          class="full-width"
          color="positive"
          :href="loginUrl"
          :label="$t('actions.login')"
        ></q-btn>
      </div>
    </q-form>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import useAuthPageStore from './auth.store';
import { storeToRefs } from 'pinia';

export default defineComponent({
  name: 'AuthPage',
  setup() {
    const store = useAuthPageStore();
    const { loginUrl, registerUrl } = storeToRefs(store);

    if (process.env.CLIENT) {
      store.initialize();
    }
    return {
      loginUrl,
      registerUrl,
    };
  },
});
</script>
