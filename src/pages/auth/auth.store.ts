import { defineStore } from 'pinia';

export const loginPageStoreName = 'loginPage';
const useLoginPageStore = defineStore(loginPageStoreName, {
  state: () => ({
    loginUrl: '',
    registerUrl: ''
  }),
  actions: {
    initialize (locale: string) {
      this.loginUrl = this.$oidc.createLoginUrl({
        locale
      });
      this.registerUrl = this.$oidc.createRegisterUrl({
        locale
      });
    }
  }
});

export type LoginPageStore = ReturnType<typeof useLoginPageStore>;
export default useLoginPageStore;