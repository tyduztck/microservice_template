import express, {
  Express,
  Request,
  Response,
  NextFunction,
  json,
} from 'express';
import Config from "./lib/config";
import { getUserData } from './interactor/micro_interactor';
import {
  ApiError,
  List
} from './lib/api_errors';

const app: Express = express();
app.use(json()); 

// Middleware
const authenticateToken = async (req: Request, res: Response, next: NextFunction) => {
  next();
}

// Routes
app.get('/posts/:username', async (req: Request, res: Response) => {
  const username = req.params.username;
  const userData = await getUserData(username);
  res.json(userData);
});

// Error Handling
app.use((req: Request, res: Response, next: NextFunction) => {
  next(List.METHOD_NOT_FOUND);
});

app.use((err: number, req: Request, res: Response, next: NextFunction) => {  
  const errorCode = new ApiError(err);
  res.json({
    name: errorCode.name,
    code: errorCode.code
  })
});

app.listen(Config.get('port'));
// eslint-disable-next-line eol-last
console.log(`Microservice 1 is running on port ${Config.get('port')}.`);