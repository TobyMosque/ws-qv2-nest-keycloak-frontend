import { defineStore } from 'pinia';

export const homePageStoreName = 'HomePage';
const useHomePageStore = defineStore(homePageStoreName, {
  getters: {
    isDeveloper (): boolean {
      return false
    }
  }
});

export type HomePageStore = ReturnType<typeof useHomePageStore>;
export default useHomePageStore;