import { Request, Response, NextFunction } from "express";
import { verifyTokenInteractor } from '../interactor/token_interactor';
import { List } from '../lib/api_errors';

export const authenticateToken = async (req: Request, res: Response, next: NextFunction) => {
  try { 
    const authHeader = req.headers.authorization;
    const token:any = authHeader && authHeader.split(' ')[1];
    if (token == null) next(List.NOT_AUTHORIZED);

    const verifiedToken = await verifyTokenInteractor(token);
    req.user = verifiedToken;
    next();
  }catch (err: any){
    next(err);
  }
}