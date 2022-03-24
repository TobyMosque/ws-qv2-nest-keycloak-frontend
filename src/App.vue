<template>
  <router-view />
</template>
<script lang="ts">
import { defineComponent, watch, inject } from 'vue';
import { useQuasar } from 'quasar';
import useAuthStore from './stores/auth';
import useAppStore from './stores/app';
import { storeToRefs } from 'pinia';
import { discard, log } from './utils/console';
import { serverTokenKey } from 'src/boot/oidc-server';

export default defineComponent({
  name: 'App',
  setup() {
    const quasar = useQuasar();
    const appStore = useAppStore();
    quasar.dark.set(appStore.dark);

    if (process.env.CLIENT) {
      const appState = storeToRefs(appStore);
      watch(
        () => quasar.dark.isActive,
        () => {
          appState.dark.value = quasar.dark.isActive;
        },
        { immediate: true }
      );
      requestAnimationFrame(() => {
        quasar.dark.set('auto');
      });
    }
  },
});
</script>
