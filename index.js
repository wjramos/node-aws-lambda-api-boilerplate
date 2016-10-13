import express from 'express';
import handlers from './src';

const PORT = process.env.PORT || 3000;

const app = express();

console.log('Server started on port', PORT);
app.get('/', (req, res) => res.json({ handlers }));

for (let handler in handlers) {
  app.get(`/${handler}`, (req, res) => handlers[handler](req.query, null, (err, result) => res.json(result)));
  app.post(`/${handler}`, (req, res) => handlers[handler](req.body, null, (err, result) => res.json(result)));
}

app.listen(PORT);
