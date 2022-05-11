import { Pinia } from 'pinia';
import { usePeopleApiStore } from './people/api';
import { usePeopleRtdbStore } from './people/rtdb';
import { Cookies } from 'quasar';

export const usePeopleStore = function (pinia: Pinia) {
  if (process.env.CLIENT) {
    const rtdb = Cookies.get<boolean | undefined>('pwa_enabled')
    if (rtdb) {
      return usePeopleRtdbStore(pinia);
    }
  }
  return usePeopleApiStore(pinia);
}
