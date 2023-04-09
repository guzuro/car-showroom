import express, { Express, Request, Response } from 'express';
import dotenv from 'dotenv';
import { AppDataSource } from './config/data-source';

dotenv.config();


AppDataSource.initialize()
    .then(() => {
        console.log('DB STARTED');
    })
    .catch((error) => console.log(error))


const app: Express = express();
const port = process.env.PORT;

app.get('/', (req: Request, res: Response) => {
    res.send('hola');
});

app.listen(port, () => {
    console.log(`Server is running at http://localhost:${port}`);
});