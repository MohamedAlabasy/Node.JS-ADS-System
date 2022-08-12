import express from 'express';


import auth from './api/authRouter';
import ads from './api/adsRouter';


const routes = express.Router()

routes.use('/user', auth);
routes.use('/ads', ads);



export default routes;