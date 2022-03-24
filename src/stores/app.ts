import { defineStore } from 'pinia';
import { Cookies } from 'quasar';

export const appStoreName = 'app';
const useAppStore = defineStore(appStoreName, {
  state: () => ({
    locale: 'en-US',
    dark: true,
  }),
  persist: Cookies,
});

export type AppStore = ReturnType<typeof defineStore>;
export default useAppStore;
