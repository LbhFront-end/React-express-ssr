import React from 'react';
import { StaticRouter, Route } from 'react-router-dom';
import { renderToString } from 'react-dom/server';
import { renderRoutes } from 'react-router-config';
import { Provider } from 'react-redux';
import { Helmet } from 'react-helmet';

export const render = (store, routes, req, context) => {
  const content = renderToString((
    <Provider store={store}>
      <StaticRouter location={req.path} context={context}>
        <div>
          {renderRoutes(routes)}
        </div>
      </StaticRouter>
    </Provider>
  ))
  // seo 服务端渲染
  const helmet = Helmet.renderStatic();
  // 服务器端渲染 css
  const cssStr = context.css.length ? context.css.join('\n') : '';
  return `
  <html>
    <head>
      ${helmet.title.toString()}
      ${helmet.meta.toString()}
      <style>${cssStr}</style>
      <body>
        <div id="root">${content}</div>
        <script>
            window.context = {
              state:${JSON.stringify(store.getState())}
            }
        </script>
        <script src="/index.js"></script>
      </body>
    </head>
  </html>
  `
}