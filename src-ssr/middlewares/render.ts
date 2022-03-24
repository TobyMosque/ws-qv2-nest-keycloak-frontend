import configure from 'backend';
import { ssrMiddleware } from 'quasar/wrappers';
import { RenderError } from '@quasar/app-webpack';

// This middleware should execute as last one
// since it captures everything and tries to
// render the page with Vue

export default ssrMiddleware(async ({ app, render, serve }) => {
  const nest = await configure({
    app,
    prefix: 'api',
    async render({ req, res }) {
      res.setHeader('Content-Type', 'text/html');
      try {
        const html = await render({ req, res });
        res.send(html);
      } catch (error) {
        const err = error as RenderError;
        if (err.url) {
          if (err.code) {
            res.redirect(err.code, err.url);
          } else {
            res.redirect(err.url);
          }
        } else if (err.code === 404) {
          res.status(404).send('404 | Page Not Found');
        } else if (process.env.DEV) {
          serve.error({ err, req, res });
        } else {
          res.status(500).send('500 | Internal Server Error');
        }
      }
    },
  });
  await nest.init();
});
