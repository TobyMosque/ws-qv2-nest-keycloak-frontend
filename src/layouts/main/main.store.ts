import { defineStore, Pinia, storeToRefs } from 'pinia';
import useAppStore from 'src/stores/app';
import { error } from 'src/utils/console';
import { watch } from 'vue';

interface EssentiaLink {
  title: string;
  caption: string;
  icon: string;
  link: string;
}

export const mainLayoutStoreName = 'mainLayout';
const useMainLayoutStore = defineStore(mainLayoutStoreName, {
  state: () => ({
    leftDrawerOpen: false,
    logoutUrl: '#',
  }),
  actions: {
    toggleLeftDrawer() {
      this.leftDrawerOpen = !this.leftDrawerOpen;
    },
    async logout() {
      try {
        await this.$authApi.authControllerLogout();
      } catch (err) {
        error(err);
      }
      window.location.href = this.logoutUrl;
    },
    oidcUrls(locale: string) {
      const route = this.$router.resolve('/auth');
      this.logoutUrl = this.$oidc.createLogoutUrl({
        redirectUri: new URL(route.href, window.location.origin).href
      });
    },
    initialize () {
      const appStore = useAppStore();
      watch(
        () => appStore.locale,
        () => {
          this.oidcUrls(appStore.locale);
        });
      requestAnimationFrame(() => {
        this.oidcUrls(appStore.locale);
      });
    }
  },
  getters: {
    essentialLinks(): EssentiaLink[] {
      return [
        {
          title: this.$t('quasar.docs'),
          caption: 'quasar.dev',
          icon: 'school',
          link: 'https://quasar.dev',
        },
        {
          title: this.$t('quasar.github'),
          caption: 'github.com/quasarframework',
          icon: 'code',
          link: 'https://github.com/quasarframework',
        },
        {
          title: this.$t('quasar.discord'),
          caption: 'chat.quasar.dev',
          icon: 'chat',
          link: 'https://chat.quasar.dev',
        },
        {
          title: this.$t('quasar.forum'),
          caption: 'forum.quasar.dev',
          icon: 'record_voice_over',
          link: 'https://forum.quasar.dev',
        },
        {
          title: this.$t('quasar.twitter'),
          caption: '@quasarframework',
          icon: 'rss_feed',
          link: 'https://twitter.quasar.dev',
        },
        {
          title: this.$t('quasar.facebook'),
          caption: '@QuasarFramework',
          icon: 'public',
          link: 'https://facebook.quasar.dev',
        },
        {
          title: this.$t('quasar.title'),
          caption: this.$t('quasar.caption'),
          icon: 'favorite',
          link: 'https://awesome.quasar.dev',
        },
      ];
    },
  },
});

export type MainLayoutStore = ReturnType<typeof useMainLayoutStore>;
export default useMainLayoutStore;

export function useMainLayoutState(store?: Pinia) {
  const mainLayoutStore = useMainLayoutStore(store);
  return storeToRefs(mainLayoutStore);
}
