<template>
  <router-view />
</template>
<script lang="ts">
import { defineComponent, watch } from 'vue';
import { useQuasar } from 'quasar';
import useAppStore from './stores/app';
import { storeToRefs } from 'pinia';

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
