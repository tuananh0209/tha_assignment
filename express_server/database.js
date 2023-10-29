import { Sequelize } from 'sequelize';
import { DB_HOST } from './utils/constants.js'

const sequelize = new Sequelize({
    dialect: 'sqlite',
    host: DB_HOST,
    logging: false
});

export default sequelize