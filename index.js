import express from 'express';
import bodyParser from 'body-parser';
import handlers from './src';
export default handlers;

const { PORT = 3000 } = process.env;

const app = express().use(bodyParser.json());

const listHandlers = (req, res) => res.json({ handlers });
const getHandler = ({ params: { handler }, query }, res) => invokeHandler(res, handler, query);
const invokeHandler = (res, handler, data = {}) => (
  handlers[handler] ?
  handlers[handler](data, null, (err, result) => result ? res.send(result) : res.send(err)) :
  res.send(`${handler} is not a valid handler`)
);
const postHandler = ({ params: { handler }, body, query }, res) => (
  invokeHandler(res, handler, Object.assign({}, body, query))
);

app.get('/', listHandlers);
app.get('/:handler', getHandler);
app.post('/:handler', postHandler);
app.options('/', listHandlers);

app.listen(PORT, () => console.info('Server started on port', PORT));
