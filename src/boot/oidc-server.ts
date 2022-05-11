import { boot } from 'quasar/wrappers';
import { Cookies } from 'quasar';
import axios from 'axios';
import useAuthStore from 'src/stores/auth';
import { storeToRefs } from 'pinia';

export default boot(async ({ store, ssrContext }) => {
  const cookies = Cookies.parseSSR(ssrContext);
  const refreshToken = cookies.get('REFRESH_TOKEN');

  console.log('refresh: ', refreshToken);
  if (refreshToken) {
    const url =
      'https://oidc.tobiasmesquita.dev/auth/realms/quasar-rxdb-realm/protocol/openid-connect/token';
    const body = `client_id=quasar-rxdb-app&grant_type=refresh_token&refresh_token=${refreshToken}`;

    try {
      const { data } = await axios.post<{
        access_token: string;
        refresh_token: string;
      }>(url, body, {
        headers: {
          'content-type': 'application/x-www-form-urlencoded',
        },
      });

      cookies.set('REFRESH_TOKEN', data.refresh_token, {
        path: '/',
        httpOnly: true,
        secure: true,
        sameSite: 'Lax',
      });

      const authStore = useAuthStore(store);
      const authState = storeToRefs(authStore);
      authState.token.value = data.access_token || '';
      console.log('token: ', authState.token.value)
    } catch {
      cookies.remove('REFRESH_TOKEN');
    }
  }
});
