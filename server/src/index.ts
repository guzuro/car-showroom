import express, { Express, Request, Response } from 'express';
import dotenv from 'dotenv';
import { AppDataSource } from './config/data-source';
import authRouter from './routes/auth.routes';
import carsRouter from './routes/cars.routes';
import wishlistRouter from './routes/wishList.routes';
import wishRouter from './routes/wish.routes';
import errorMiddleware from './middlewares/errorMiddleware';
const cors = require('cors');

dotenv.config();

AppDataSource.initialize()
    .then(() => {
        console.log('DB STARTED');
    })
    .catch((error) => console.log(error))


const app: Express = express();
const port = process.env.PORT;

app.use(cors())
app.use(express.json());
app.use('/api/auth', authRouter);
app.use('/api/wishlist', wishlistRouter);
app.use('/api/wish', wishRouter);
app.use('/api', carsRouter);

app.get('/', (_: Request, res: Response) => {
    res.send('hola');
});

app.listen(port, () => {
    console.log(`Server is running at http://localhost:${port}`);
});

app.use(errorMiddleware)