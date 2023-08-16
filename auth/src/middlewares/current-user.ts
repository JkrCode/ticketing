import { Request, Response, NextFunction} from 'express';
import jwt from 'jsonwebtoken';


interface UserPayload {
    id: string;
    email: string
}


//ensure, that TS understands that the Request object has UserPayload as a field
declare global {
    namespace Express {
        interface Request {
            currentUser?: UserPayload
        }
    }
}

export const currentUser = (
    req:Request,
    res:Response,
    next: NextFunction
) => {
    if(!req.session?.jwt) {
        return next();
    }



    try {
        const payload = jwt.verify(req.session.jwt, process.env.JWT_KEY!) as UserPayload
        req.currentUser = payload;
    } catch (err) {}
    next()
};