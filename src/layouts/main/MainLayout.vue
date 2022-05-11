<template>
  <q-layout id="layout-main" view="hHh LpR fFf" class="bg-main">
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

        <q-toolbar-title> Quasar App </q-toolbar-title>

        <div>
          Quasar v{{ $q.version }}
          <q-btn
            flat
            icon="mdi-exit-to-app"
            :label="$t('actions.logout')"
            :href="logoutUrl"
            @click.prevent="logout"
          ></q-btn>
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
        <q-item-label header> Essential Links </q-item-label>
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
import { computed, defineAsyncComponent, defineComponent } from 'vue';
import useMainLayoutStore from './main.store';

export default defineComponent({
  name: 'MainLayout',
  components: {
    EssentialLink: defineAsyncComponent(
      () => import('components/EssentialLink.vue')
    ),
    LocaleSwitch: defineAsyncComponent(
      () => import('components/locale/LocaleSwitch.vue')
    ),
  },
  setup() {
    const store = useMainLayoutStore();
    const { logoutUrl, leftDrawerOpen } = storeToRefs(store);

    const { logout } = store;
    if (process.env.CLIENT) {
      store.initialize();
    }
    return {
      leftDrawerOpen,
      logoutUrl,
      essentialLinks: computed(() => store.essentialLinks),
      logout,
    };
  },
});
</script>
