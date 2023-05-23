import jwt from 'jsonwebtoken';
import Config from '../lib/config';
import { List } from '../lib/api_errors';

export const verifyTokenInteractor = async (token: string) => { 
    const verifyStatus = jwt.verify(token, Config.get('jwt:ACCESS_SECRET_TOKEN') as string, async (err: any, user: any) => {
        if (err) throw List.NO_ACCESS; 
        return user;
    });
    return verifyStatus;
}