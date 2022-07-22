import { Request, Response, NextFunction } from "express";
const authenticateToken = async (req: Request, res: Response, next: NextFunction) => {
    next();
}

export default authenticateToken;