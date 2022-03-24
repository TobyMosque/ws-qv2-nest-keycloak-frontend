import { defineStore } from 'pinia';
import useAppStore from 'src/stores/app';
import { watch } from 'vue';

export const loginPageStoreName = 'loginPage';
const useLoginPageStore = defineStore(loginPageStoreName, {
  state: () => ({
    loginUrl: '#',
    registerUrl: '#',
  }),
  actions: {
    oidcUrls(locale: string) {
      this.loginUrl = this.$oidc.createLoginUrl({
        locale,
      });
      this.registerUrl = this.$oidc.createRegisterUrl({
        locale,
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
});

export type LoginPageStore = ReturnType<typeof useLoginPageStore>;
export default useLoginPageStore;
