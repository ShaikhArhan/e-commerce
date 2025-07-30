import express from 'express';
import bodyParser from 'body-parser';
import cors from 'cors';
import chalk from 'chalk';

require('dotenv').config();
const app = express();
const PORT: string = process.env.PORT!;

//middlewares
app.use(express.json());
app.use(
  cors({
    origin: 'http://localhost:5173',
    credentials: true,
    methods: ['GET', 'POST', 'PATCH', 'PUT', 'DELETE'],
    allowedHeaders: ['Content-Type', 'Authorization'],
  })
);
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

const combineRoute = require('./route/combineRoute');
app.use('/api', combineRoute);

//server
app.listen(PORT, () => {
  console.log(chalk.bgBlue(` Server is running on port ${PORT} `));
});
