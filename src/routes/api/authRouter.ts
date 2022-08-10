import { Router, Request, Response, NextFunction } from 'express';
import { body, param } from 'express-validator';


// import checkTokens from '../../utilities/checkTokens';


const auth: Router = Router()




auth.get('/login', (request: Request, response: Response, next: NextFunction) => {
    response.status(200).send('hello world')
});


export default auth;