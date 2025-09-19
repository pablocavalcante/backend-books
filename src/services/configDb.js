import { Sequelize } from "sequelize";
import dotenv from 'dotenv';

dotenv.config();

const sequelize = new Sequelize(
    process.env.DB_NAME,
    process.env.DB_USER,
    process.env.DB_PASSWORD,
    {
        host: process.env.DB_HOST,
        dialect: process.env.DB_DIALECT,
        logging: false
    }
);

sequelize.authenticate().then(() => {
    console.log("Banco de dados conectado com sucesso!");
}) .catch ((err) => {
    console.error("Algo deu errado", err)
});

export default sequelize;