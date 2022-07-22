import { Express, Request, Response, NextFunction } from "express"; 
import { ApiError, List } from '../lib/api_errors';

function errorHandler(app: Express) {
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
}

export default errorHandler;