import { boot } from 'quasar/wrappers';
import { Cookies } from 'quasar';
import axios from 'axios';
import { InjectionKey } from 'vue';
import { log } from 'src/utils/console';

export const serverTokenKey: InjectionKey<string> = Symbol('server-token-key');
export default boot(async ({ app, ssrContext }) => {
  const cookies = Cookies.parseSSR(ssrContext);
  const refreshToken = cookies.get('REFRESH_TOKEN');
  if (refreshToken) {
    const url = 'https://oidc.tobiasmesquita.dev/auth/realms/quasar-rxdb-realm/protocol/openid-connect/token'
    const body = `client_id=quasar-rxdb-app&grant_type=refresh_token&refresh_token=${refreshToken}`;

    const { data } = await axios.post<{ access_token: string, refresh_token: string }>(url, body, {
      headers: {
        'content-type': 'application/x-www-form-urlencoded'
      }
    });

    cookies.set('REFRESH_TOKEN', data.refresh_token, {
      path: '/',
      httpOnly: true,
      secure: true,
      sameSite: 'Lax'
    })
    log(__dirname, ssrContext?.req?.originalUrl)
    app.provide(serverTokenKey, data.access_token)
  }
});
