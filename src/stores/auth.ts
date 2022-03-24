import { defineStore } from 'pinia';
import jwtDecode, { JwtPayload } from 'jwt-decode';

export const authStoreName = 'auth';
const useAuthStore = defineStore(authStoreName, {
  state: () => ({
    token: '',
  }),
  actions: {
    async initialize() {
      if (this.$oidc.authenticated) {
        this.token = this.$oidc.token || '';
        await this.sendTokens();
      }
    },
    isLogged(): boolean {
      const now = new Date();
      if (!this.expireAt) {
        return false;
      }
      return this.expireAt > now;
    },
    async sendTokens() {
      await this.$api.post('/refresh', {
        token: this.$oidc.refreshToken,
      });
    },
  },
  getters: {
    decoded(state) {
      if (!state.token) {
        return undefined;
      }
      return jwtDecode<JwtPayload>(state.token);
    },
    expireAt(): Date | undefined {
      if (!this.decoded?.exp) {
        return undefined;
      }
      const expiration = this.decoded.exp * 1000;
      return new Date(expiration);
    },
  },
});

export type AuthStore = ReturnType<typeof defineStore>;
export default useAuthStore;
