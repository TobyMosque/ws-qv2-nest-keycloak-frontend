import { boot } from 'quasar/wrappers';
import Keycloak, { KeycloakConfig } from 'keycloak-js';
import { InjectionKey } from 'vue';
import { discard, error, log } from 'src/utils/console';
import useAuthStore from 'src/stores/auth';
import { storeToRefs } from 'pinia';

type OidcInstance = ReturnType<typeof Keycloak>;
declare module 'pinia' {
  // eslint-disable-next-line @typescript-eslint/no-unused-vars, no-unused-vars
  interface PiniaCustomProperties {
    $oidc: OidcInstance;
  }
}
export const oidcKey: InjectionKey<OidcInstance> = Symbol('oidcKey');
export default boot(async ({ app, store }) => {
  const options: KeycloakConfig = {
    url: 'https://oidc.tobiasmesquita.dev/auth/',
    realm: 'quasar-rxdb-realm',
    clientId: 'quasar-rxdb-app',
  };

  const oidc = Keycloak(options);
  await oidc.init({
    onLoad: 'check-sso',
    silentCheckSsoRedirectUri: window.location.origin + '/silent-check-sso.html'
  });
  
  async function refreshToken() {
    const refreshed = await oidc.updateToken(60);
    if (refreshed) {
      const authStore = useAuthStore(store);
      const authState = storeToRefs(authStore);
      authState.token.value = oidc.token || '';
      if (authState.token.value) {
        log(oidc.refreshToken);
      }
    }
  }
  
  store.use(() => ({
    $oidc: oidc,
  }));
  app.provide(oidcKey, oidc);

  try {
    const authStore = useAuthStore(store);
    await authStore.initialize();
  } catch (err) {
    error(err);
  }

  setInterval(() => {
    const task = refreshToken();
    discard(task);
  }, 6000);
});
