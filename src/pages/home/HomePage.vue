<template>
  <q-page id="page-home" class="flex flex-center">
    Home <br />
    <template v-if="isDeveloper">
      <q-btn to="/devboard" color="primary" :label="$t('actions.devboard')" />
    </template>
  </q-page>
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import useHomePageStore from './home.store';

export default defineComponent({
  name: 'HomePage',
  setup() {
    const store = useHomePageStore();

    return {
      isDeveloper: store.isDeveloper,
    };
  },
});
</script>
