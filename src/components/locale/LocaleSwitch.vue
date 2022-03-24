<template>
  <q-page-sticky
    position="bottom-right"
    class="c-locale-switch"
    :offset="[18, 18]"
  >
    <q-fab
      v-model="fab"
      :label="$t('locale.title')"
      external-label
      vertical-actions-align="right"
      :icon="icon"
      direction="up"
    >
      <q-fab-action
        label-position="left"
        icon="img:flags/pt-BR.svg"
        @click="set('pt-BR')"
        :label="$t('locale.ptbr')"
        external-label
      />
      <q-fab-action
        label-position="left"
        icon="img:flags/en-US.svg"
        @click="set('en-US')"
        :label="$t('locale.enus')"
        external-label
      />
    </q-fab>
  </q-page-sticky>
</template>

<script lang="ts">
import { storeToRefs } from 'pinia';
import { useQuasar } from 'quasar';
import useAppStore from 'src/stores/app';
import { computed, defineComponent, ref } from 'vue';
import { useI18n } from 'vue-i18n';

export default defineComponent({
  name: 'LocaleSwitch',
  setup() {
    const fab = ref(false);
    const appStore = useAppStore();
    const appState = storeToRefs(appStore);
    const quasar = useQuasar();
    const i18n = useI18n();

    const icon = computed(() => `img:flags/${appState.locale.value}.svg`);

    async function set(locale: string) {
      appState.locale.value = locale;
      i18n.locale.value = locale;

      const lang = (await import(`quasar/lang/${locale}`)) as never;
      quasar.lang.set(lang);
    }
    return {
      fab,
      icon,
      set,
    };
  },
});
</script>

<style lang="scss">
.c-locale-switch {
  .q-btn--fab {
    padding: 0;
    .q-fab__icon-holder,
    img {
      width: 56px;
      height: 56px;
    }
  }
  .q-btn--fab-mini {
    padding: 0;
    img {
      width: 40px;
      height: 40px;
    }
  }
}
</style>
