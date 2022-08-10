import express from 'express';
import 'dotenv/config'
import body_parser from 'body-parser';
import cors from 'cors';

import morganMiddleware from './middleware/morganMiddleware';
import notFoundMiddleware from './middleware/notFoundMiddleware';
import errorMiddleware from './middleware/errorMiddleware';

import routes from './routes/routes';

const app = express();
// #=======================================================================================#
// #			                        connect mongoose                                   #
// #=======================================================================================#
app.listen(process.env.PORT || 8888, () => {
    console.log(`App Run to http://${process.env.HOST}:${process.env.PORT || 8888}`);
});
// #=======================================================================================#
// #			                            body_parse                                     #
// #=======================================================================================#
app.use(body_parser.json());
app.use(body_parser.urlencoded({ extended: false }));
// #=======================================================================================#
// #			                     add header or use cors                                #
// #=======================================================================================#
app.use(cors());
// #=======================================================================================#
// #			                            router                                         #
// #=======================================================================================#
app.use('', morganMiddleware, routes);
// #=======================================================================================#
// #			                      not Found middleware                                 #
// #=======================================================================================#
app.use(notFoundMiddleware);
// #=======================================================================================#
// #			                          middleware                                       #
// #=======================================================================================#
app.use(errorMiddleware);


export default app;