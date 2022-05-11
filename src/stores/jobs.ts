import { Pinia } from 'pinia';
import { useJobsApiStore } from './jobs/api';
import { useJobsRtdbStore } from './jobs/rtdb';
import { Cookies } from 'quasar';

export const useJobsStore = function (pinia?: Pinia) {
  if (process.env.CLIENT) {
    const rtdb = Cookies.get<boolean | undefined>('pwa_enabled')
    if (rtdb) {
      return useJobsRtdbStore(pinia);
    }
  }
  return useJobsApiStore(pinia);
}
