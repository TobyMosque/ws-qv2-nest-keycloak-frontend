<template>
  <div id="page-register">
    <h5 class="q-my-md">{{$t('register.title')}}</h5>
    <q-separator></q-separator>
    <q-form ref="form" class="row q-col-gutter-sm">
      <div class="col col-12">
        <qc-input v-model="username" :label="$t('fields.username')" :rules="validation.username" @blur="isUsernameValid = true" />
      </div>
      <div class="col col-12">
        <qc-input v-model="confirmUsername" :label="$t('fields.confirmUsername')" :rules="validation.confirmUsername" />
      </div>
      <div class="col col-12">
        <qc-input v-model="firstName" :label="$t('fields.firstName')" :rules="validation.firstName" />
      </div>
      <div class="col col-12">
        <qc-input v-model="lastName" :label="$t('fields.lastName')" :rules="validation.lastName" />
      </div>
      <div class="col col-12">
        <qc-input type="password" v-model="password" :label="$t('fields.password')" :rules="validation.password" @blur="isPasswordValid = true" />
        <q-linear-progress size="5px" stripe :value="strength" :color="strColor" ></q-linear-progress>
      </div>
      <div class="col col-12">
        <qc-input type="password" v-model="confirmPassword" :label="$t('fields.confirmPassword')" :rules="validation.confirmPassword" />
      </div>
      <div class="col col-5">
        <q-btn class="full-width" color="secondary" :label="$t('actions.backLogin')" to="/login"></q-btn>
      </div>
      <div class="col col-7">
        <q-btn class="full-width" color="positive" :label="$t('actions.register')" @click="register"></q-btn>
      </div>
    </q-form>
  </div>
</template>

<script lang="ts">
import { computed, defineComponent, ref } from 'vue';
import useValidation from 'src/composables/validations';
import useRegisterPageStore from './register.store';
import { storeToRefs } from 'pinia';
import { QForm } from 'quasar';
import zxcvbn from 'zxcvbn';

export default defineComponent({
  name: 'RegisterPage',
  setup () {
    const store = useRegisterPageStore();
    const state = storeToRefs(store);

    const form = ref<QForm>();
    const isUsernameValid = ref(true);
    const isPasswordValid = ref(true);
    const strength = computed(() => {
      if (!state.password.value) {
        return 0
      }
      // eslint-disable-next-line @typescript-eslint/no-unsafe-member-access, @typescript-eslint/restrict-plus-operands, @typescript-eslint/no-unsafe-call, @typescript-eslint/no-unsafe-assignment
      const score = zxcvbn(state.password.value).score + 1
      return score / 5
    })
    const strColor = computed(() => {
      switch (strength.value) {
        case 1: return 'blue'
        case 0.8: return 'green'
        case 0.6: return 'yellow'
        case 0.4: return 'orange'
        case 0.2: return 'red'
        default: return 'grey'
      }
    })

    const validation = useValidation({
      username: {
        required: true,
        email: true,
        server: isUsernameValid
      },
      confirmUsername: {
        required: true,
        compare: { field: 'username', val: state.username },
        email: true
      },
      firstName: { required: true },
      lastName: { required: true },
      password: {
        required: true,
        strength: strength,
        server: isPasswordValid
      },
      confirmPassword: {
        required: true,
        compare: { field: 'password', val: state.password },
      },
    })

    async function register () {
      validation.resetServer();
      const isValid = await form.value?.validate();
      if (isValid) {
        await store.register();
      }
    }

    return {
      ...state,
      form,
      strength,
      strColor,
      isUsernameValid,
      isPasswordValid,
      validation,
      register
    }
  }
});
</script>