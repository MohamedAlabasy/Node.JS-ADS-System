import morgan from 'morgan';
// import { Request, Response, NextFunction } from 'express';

// const logger = ((request: Request, response: Response, next: NextFunction) => {
//     console.log(request.method, request.url);
//     next()
// })

const logger = morgan('tiny');

export default logger
