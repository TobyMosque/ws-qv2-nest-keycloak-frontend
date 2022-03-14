<template>
  <q-layout id="layout-clean" view="lHh Lpr lFf" class="bg-main">
    <q-page-container>
      <q-page class="row">
        <div class="col flex flex-center relative-position layout-auth">
          <img alt="Quasar logo" class="absolute-center" :src="`images/quasar-logo-${dark ? 'dark' : 'light'}.svg`">
        </div>
        <div class="col col-auto shadow-up-2 page-container relative-position bg-content">
          <div class="page-form q-pa-xl absolute-center">
            <router-view />
          </div>
        </div>
      </q-page>
    </q-page-container>
    <locale-switch></locale-switch>
  </q-layout>
</template>

<script lang="ts">
import { storeToRefs } from 'pinia';
import useAppStore from 'src/stores/app';
import { defineAsyncComponent, defineComponent } from 'vue';
import useAuthLayoutStore from './auth.store';

export default defineComponent({
  name: 'AuthLayout',
  components: {
    LocaleSwitch: defineAsyncComponent(() => import('components/locale/LocaleSwitch.vue'))
  },
  setup () {
    const store = useAuthLayoutStore();
    const state = storeToRefs(store);

    const appStore = useAppStore();
    const appState = storeToRefs(appStore);

    return {
      ...state,
      dark: appState.dark
    }
  }
});
</script>

<style lang="scss">
#layout-clean {
  .page-container {
    width: 540px !important;
    .page-form {
      width: 100%;
    }
  }
  @media (max-width: $breakpoint-sm-max) {
    .page-container {
      width: 100% !important;
    }
  }
}
</style>
