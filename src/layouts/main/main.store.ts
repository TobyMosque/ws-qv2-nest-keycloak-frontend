import { defineStore, Pinia, storeToRefs } from 'pinia';
import { error } from 'src/utils/console';

interface EssentiaLink {
  title: string;
  caption?: string;
  icon: string;
  to: string;
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
        await this.$authApi.logout();
      } catch (err) {
        error(err);
      }
      window.location.href = this.logoutUrl;
    },
    oidcUrls() {
      const route = this.$router.resolve('/auth');
      const redirectUri = new URL(route.href, window.location.origin).href
      this.logoutUrl = this.$oidc.createLogoutUrl({
        redirectUri
      });
    },
    initialize () {
      requestAnimationFrame(() => {
        this.oidcUrls();
      });
    }
  },
  getters: {
    essentialLinks(): EssentiaLink[] {
      return [
        {
          title: this.$t('home.title'),
          icon: 'school',
          to: this.$router.resolve('/home').fullPath,
        },
        {
          title: this.$t('jobs.title'),
          icon: 'code',
          to: this.$router.resolve('/jobs').fullPath,
        },
        {
          title: this.$t('companies.title'),
          icon: 'chat',
          to: this.$router.resolve('/companies').fullPath,
        },
        {
          title: this.$t('people.title'),
          icon: 'record_voice_over',
          to: this.$router.resolve('/people').fullPath,
        }
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
