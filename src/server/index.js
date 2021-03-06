import express from 'express';
import proxy from 'express-http-proxy';
import { matchRoutes } from 'react-router-config';
import { getStore } from '../store'
import { render } from './utils'
import routes from '../Routes'

const app = express();
app.use(express.static('public'));
// node 中间层代理代理
/** 
 *  /api/news.json
 *  req.url = news.json
 *  proxyReqPathResolver：/ssr/api/news.json
 *  http://47.95.113.63 + proxyReqPathResolver() = http://47.95.113.63/ssr/api/news.json
 * */
app.use('/api', proxy('http://47.95.113.63', {
  proxyReqPathResolver: function (req) {
    return '/ssr/api' + req.url;
  }
}));

app.get('*', (req, res) => {
  const store = getStore(req);
  const matchedRoutes = matchRoutes(routes, req.path);
  const promises = [];
  matchedRoutes.forEach(item => {
    if (item.route.loadData) {
      const promise = new Promise((resolve, reject) => {
        // catch(resolve)
        item.route.loadData(store).then(resolve).catch(resolve)
      })
      promises.push(promise)
    }
  });
  Promise.all(promises).then(() => {
    const context = {
      css: []
    };
    const html = render(store, routes, req, context);
    if (context.action === 'REPLACE') {
      res.redirect(301, context.url);
    } else if (context.NOT_FOUNT) {
      res.status(404);
      res.send(html)
    } else {
      res.send(html)
    }
  })
})
app.listen(3000);