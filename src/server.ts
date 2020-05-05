import express from 'express';
import routes from './routes';
// ts-dev-server is used for tsc and node

const app = express();

app.use(express.json());
app.use(routes);

app.listen(3333, () => {
  console.log('Server started on port 3333...');
});
