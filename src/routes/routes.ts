import express from 'express';


import auth from './api/authRouter';


const routes = express.Router()

routes.use('/user', auth);



export default routes;