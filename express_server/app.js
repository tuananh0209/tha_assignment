import express, { json, urlencoded } from 'express';
import cookieParser from 'cookie-parser';
import helmet from 'helmet';
import cors from 'cors';
import logger from "morgan";

import route from './routes/index.js';
import sequelize from './database.js';
import { PORT } from './utils/constants.js';

function app() {
    const app = express();
    app.use(cors());
    app.use(helmet());
    app.use(json({ limit: "5mb" }));
    app.use(urlencoded({ extended: true }));
    app.use(cookieParser());
    app.use(logger("dev"));

    route(app);
    app.listen(PORT, () => {
        console.log(`Server listening on port ${PORT}`);
    });
}

sequelize.sync({ logging: false }).then(() => {
    console.log('Connect DB successfully');
    app();
});
