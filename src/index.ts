

require('dotenv').config();
import express, { NextFunction, Request, Response } from 'express'
import { AppDataSource } from './data-source'
// import redisClient from './utils/connectRedis';
import userRouter from './router/user.router'
import allotmentRouter from './router/allotment.router'
import alotteeRouter from './router/alottee.router'
import mediaRouter from './router/media.router'


AppDataSource.initialize()

    .then(async () => {

        const app = express();
        // MIDDLEWARE

        // 1. Body parser
        app.use(express.json({ limit: '30mb' }));

        // 2. Logger
        // if (process.env.NODE_ENV === 'development') app.use(morgan('dev'));

        // 3. Cookie Parser
        // app.use(cookieParser());

        // 4. Cors
        // app.use(
        //   cors({
        //     origin: config.get<string>('origin'),
        //     credentials: true,
        //   })
        // );


        // ROUTES
        app.use('/api/user', userRouter);
        app.use('/api/allotment', allotmentRouter);
        app.use('/api/alottee', alotteeRouter);
        app.use('/api/media', mediaRouter);


        // UNHANDLED ROUTE
        app.all('*', (req: Request, res: Response, next: NextFunction) => {
            res.status(404).json({ success: false, code: 404, data: {}, message: `Route ${req.originalUrl} not found` })
        });


        const port = process.env.PORT || 4000;
        app.listen(port);

        console.log(`Server started on port: ${port}`);
    })
    .catch((error) => console.log(error));

