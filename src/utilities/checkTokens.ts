
import jwt from 'jsonwebtoken';
import { Request, Response, NextFunction } from 'express';

const checkTokens = (request: Request | any, response: Response, next: NextFunction) => {
    const authHeader = request.headers["authorization"] || request.body.token || request.query.token;
    const token = authHeader && authHeader.split(' ')[1]; //to get token without Bearer
    if (!token) {
        let error = new Error("You must enter token");
        // error.status = 403;
        throw error;
    }
    try {
        jwt.verify(token, process.env.ACCESS_TOKEN_SECRET as string, (err: any, decoded: any) => {
            if (err) {
                throw new Error('invalid token');
            } else if (!decoded.is_verification) {
                throw new Error('You must verification email first')
            } else {
                request.user = decoded;
                next();
            }
        });
    } catch (err) {
        next(err);
    }
}

export default checkTokens;