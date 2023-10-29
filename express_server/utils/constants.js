import env from 'dotenv';

env.config({ path: ".env" });

const PORT = process.env.PORT || 3000;

const DB_HOST = process.env.DB_HOST;

const PREFIX_URL = "/api/v1";

export {
    PORT,
    DB_HOST,
    PREFIX_URL
}