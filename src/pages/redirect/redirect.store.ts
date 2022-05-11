import { defineStore } from 'pinia';

export const redirectPageStoreName = 'redirectPage';
const useRedirectPageStore = defineStore(redirectPageStoreName, {});

export type RedirectPageStore = ReturnType<typeof useRedirectPageStore>;
export default useRedirectPageStore;
