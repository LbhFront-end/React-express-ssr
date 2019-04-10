import React from 'react';
import express from 'express';
import { renderToString } from 'react-dom/server';

import Home from './containers/Home'

const app = express();
const content = renderToString(<Home />)

app.get('/', (req, res) => {
  res.send(`
  <html>
    <head>
      <title>ssr</title>
      <body>
        ${content}
      </body>
    </head>
  </html>
  `)
})
const server = app.listen(3000);