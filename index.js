import express from 'express';

import * as handlers from './src';

const app = express();

app.get('/', (req, res) => res.json({ handlers }));

for (let handler in handlers) {
  app.get(`/${handler}`, (req, res) => handlers[handler](req.query));
}

app.listen(3000);
