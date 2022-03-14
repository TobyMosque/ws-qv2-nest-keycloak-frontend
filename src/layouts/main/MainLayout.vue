<template>
  <q-layout id="layout-main" view="lHh Lpr lFf" class="bg-main">
    <q-header elevated>
      <q-toolbar>
        <q-btn
          flat
          dense
          round
          icon="menu"
          aria-label="Menu"
          @click="leftDrawerOpen = !leftDrawerOpen"
        />

        <q-toolbar-title>
          Quasar App
        </q-toolbar-title>

        <div>
          Quasar v{{ $q.version }}
          <q-btn flat icon="mdi-exit-to-app" :label="$t('actions.logout')" @click="logout"></q-btn>
        </div>
      </q-toolbar>
    </q-header>

    <q-drawer
      v-model="leftDrawerOpen"
      show-if-above
      bordered
      content-class="bg-content"
    >
      <q-list>
        <q-item-label header>
          Essential Links
        </q-item-label>
        <essential-link
          v-for="link in essentialLinks"
          :key="link.title"
          v-bind="link"
        />
      </q-list>
    </q-drawer>

    <q-page-container>
      <router-view />
    </q-page-container>
    <locale-switch></locale-switch>
  </q-layout>
</template>

<script lang="ts">
import { storeToRefs } from 'pinia';
import { defineAsyncComponent, defineComponent } from 'vue';
import useMainLayoutStore from './main.store'

export default defineComponent({
  name: 'MainLayout',
  components: {
    EssentialLink: defineAsyncComponent(() => import('components/EssentialLink.vue')),
    LocaleSwitch: defineAsyncComponent(() => import('components/locale/LocaleSwitch.vue'))
  },
  setup() {
    const store = useMainLayoutStore();
    const state = storeToRefs(store);

    return {
      ...state,
      essentialLinks: store.essentialLinks,
      logout: store.logout.bind(store)
    };
  },
});
</script>
