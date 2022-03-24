import { defineStore, Pinia, storeToRefs } from 'pinia';

export const authLayoutStoreName = 'authLayout';
const useAuthLayoutStore = defineStore(authLayoutStoreName, {});

export type MainLayoutStore = ReturnType<typeof useAuthLayoutStore>;
export default useAuthLayoutStore;

export function useAuthLayoutState(store?: Pinia) {
  const authLayoutStore = useAuthLayoutStore(store);
  return storeToRefs(authLayoutStore);
}
