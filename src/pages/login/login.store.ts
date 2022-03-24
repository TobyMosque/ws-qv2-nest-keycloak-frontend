import { defineStore, storeToRefs } from 'pinia';
import useAuthStore from 'src/stores/auth';
import { log } from 'src/utils/console';

export const loginPageStoreName = 'loginPage';
const useLoginPageStore = defineStore(loginPageStoreName, {
  state: () => ({
    username: '',
    password: '',
  }),
  actions: {
    forget() {
      log('forget: not implemented yet');
    },
    async login() {
      const authStore = useAuthStore();
      const authState = storeToRefs(authStore);

      authState.token.value =
        'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiIxMjM0NTY3ODkwIiwibmFtZSI6IkpvaG4gRG9lIiwiaWF0IjoxNTE2MjM5MDIyfQ.SflKxwRJSMeKKF2QT4fwpMeJf36POk6yJV_adQssw5c';
      await this.$router.push('/home');
      log(authStore.decoded);
    },
  },
});

export type LoginPageStore = ReturnType<typeof useLoginPageStore>;
export default useLoginPageStore;
