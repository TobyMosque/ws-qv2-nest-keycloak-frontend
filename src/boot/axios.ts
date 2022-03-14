import { boot } from 'quasar/wrappers';
import axios, { AxiosInstance, AxiosRequestConfig } from 'axios';
import { InjectionKey } from 'vue';
import useAuthStore from 'stores/auth';

export const apiKey: InjectionKey<AxiosInstance> = Symbol('api-key');
declare module 'pinia' {
  // eslint-disable-next-line @typescript-eslint/no-unused-vars, no-unused-vars
  interface PiniaCustomProperties  {
    $api: AxiosInstance
  }
}

export default boot(({ app, store }) => {
  const api = axios.create({ baseURL: '/api' });

  axios.interceptors.request.use(function (config: AxiosRequestConfig) {
    const authStore = useAuthStore(store);
    const token = authStore.token;
    if (token) {
      // eslint-disable-next-line @typescript-eslint/no-unsafe-member-access
      config.headers.Authorization = `bearer ${token}`;
    }
    return config;
  }, function (error) {
    // Do something with request error
    return Promise.reject(error);
  });
  app.provide(apiKey, api);
  store.use(() => ({
    $api: api
  }));
});
