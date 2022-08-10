import { Request, Response, NextFunction } from 'express';

const error = (error: any, request: Request, response: Response, next: NextFunction) => {
    let status = error.status || 500;
    response.status(status).json({
        status: 0,
        error: error.message + ''
    })
}
export default error;