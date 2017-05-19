import express from 'express';
import bodyParser from 'body-parser';
import cors from 'cors';
import handlers from './src';
export default handlers;

const { PORT = 3000 } = process.env;

const app = express()
  .use(bodyParser.json())
  .use(bodyParser.urlencoded({ extended: true }))
  .use(cors());

const listHandlers = (req, res) => res.json({ handlers });
const getHandler = ({ params: { handler }, query }, res) => invokeHandler(res, handler, query);
const invokeHandler = (res, handler, data = {}) => (handlers[handler]
  ? handlers[handler](data, null, (err, result) => result
    ? res.send(result)
    : res.send(err)
  )
  : res.send(`${handler} is not a valid handler`)
);

const postHandler = ({ params: { handler, uri }, body, method, headers }, res) => (
  invokeHandler(res, handler, Object.assign(
    {},
    { uri, method },
    (headers['content-type'] === 'application/x-www-form-urlencoded'
    ? { form: body }
    : { body })
  ))
);

app.get('/', listHandlers);
app.get('/:handler', getHandler);
app.put('/:handler', postHandler);
app.post('/:handler', postHandler);
app.get('/:handler/:uri', getHandler);
app.put('/:handler/:uri', postHandler);
app.post('/:handler/:uri', postHandler);
app.options('/', listHandlers);

app.listen(PORT, () => console.info('Server started on port', PORT));
