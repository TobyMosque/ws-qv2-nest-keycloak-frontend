import { defineStore } from 'pinia';
import { useQuasar } from 'quasar';
import { log } from 'src/utils/console';

export const registerPageStoreName = 'RegisterPage';
const useRegisterPageStore = defineStore(registerPageStoreName, {
  state: () => ({
    username: '',
    confirmUsername: '',
    firstName: '',
    lastName: '',
    password: '',
    confirmPassword: '',
  }),
  actions: {
    async register() {
      log(this.$state);
      const quasar = useQuasar();
      quasar.notify({
        color: 'positive',
        message: this.$t('register.success'),
      });
      await this.$router.push('/auth');
    },
  },
});

export type RegisterPageStore = ReturnType<typeof useRegisterPageStore>;
export default useRegisterPageStore;
