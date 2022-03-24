import { boot } from 'quasar/wrappers';
import axios, { AxiosRequestConfig } from 'axios';
import { InjectionKey } from 'vue';
import useAuthStore from 'src/stores/auth';
import { AuthApi, JobApi, CompanyApi, PersonApi } from 'api';

export const authApiKey: InjectionKey<AuthApi> = Symbol('auth-api-key');
export const jobApiKey: InjectionKey<JobApi> = Symbol('job-api-key');
export const companyApiKey: InjectionKey<CompanyApi> = Symbol('company-api-key');
export const personApiKey: InjectionKey<PersonApi> = Symbol('person-api-key');

declare module 'pinia' {
  // eslint-disable-next-line @typescript-eslint/no-unused-vars, no-unused-vars
  interface PiniaCustomProperties {
    $authApi: AuthApi;
  }
}

export default boot(({ app, store }) => {
  const baseURL = '/api';
  const api = axios.create({ baseURL });

  api.interceptors.request.use(
    function (config: AxiosRequestConfig) {
      const authStore = useAuthStore(store);
      const token = authStore.token;
      if (token) {
        // eslint-disable-next-line @typescript-eslint/no-unsafe-member-access
        config.headers.Authorization = `bearer ${token}`;
      }
      return config;
    },
    function (error) {
      // Do something with request error
      return Promise.reject(error);
    }
  );


  const authApi = new AuthApi(undefined, baseURL, api);
  const jobApi = new JobApi(undefined, baseURL, api);
  const companyApi = new CompanyApi(undefined, baseURL, api);
  const personApi = new PersonApi(undefined, baseURL, api);
  
  app.provide(authApiKey, authApi);
  app.provide(jobApiKey, jobApi);
  app.provide(companyApiKey, companyApi);
  app.provide(personApiKey, personApi);

  store.use(() => ({
    $authApi: authApi,
    $jobApi: jobApi,
    $companyApi: companyApi,
    $personApi: personApi,
  }));
});
