import express, { Express, json } from 'express';
import Config from "./lib/config";
import routes from "./routes";
import errorHandler from './utils/error_handler';
import swaggerDoc from './utils/swagger';

const app: Express = express();
app.use(json()); 

app.listen(Config.get('port'), async() => {
  console.log(`Microservice 1 is running on port ${Config.get('port')}.`);
  routes(app);
  swaggerDoc(app, Config.get('port'));
  errorHandler(app);
});