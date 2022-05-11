import { Pinia } from 'pinia';
import { useCompaniesApiStore } from './companies/api';
import { useCompaniesRtdbStore } from './companies/rtdb';
import { Cookies } from 'quasar';

export const useJobsStore = function (pinia: Pinia) {
  if (process.env.CLIENT) {
    const rtdb = Cookies.get<boolean | undefined>('pwa_enabled')
    if (rtdb) {
      return useCompaniesRtdbStore(pinia);
    }
  }
  return useCompaniesApiStore(pinia);
}
