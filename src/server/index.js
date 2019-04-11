import React from 'react';
import express from 'express';
import { renderToString } from 'react-dom/server';

import Home from '../containers/Home'

const app = express();
app.use(express.static('public'));


const content = renderToString(<Home />)

app.get('/', (req, res) => {
  res.send(`
  <html>
    <head>
      <title>ssr</title>
      <body>
        <div id="root">${content}</div>
        <script src="/index.js"></script>
      </body>
    </head>
  </html>
  `)
})
const server = app.listen(3000);