import { Sequelize } from "sequelize";
import dotenv from 'dotenv';

dotenv.config();

// Objeto de configuração base
const config = {
    host: process.env.DB_HOST,
    dialect: process.env.DB_DIALECT,
    logging: false
};

// Adiciona as opções de SSL APENAS em ambiente de produção (ex: no Render)
if (process.env.NODE_ENV === 'production') {
    config.dialectOptions = { // Corrigido de 'dialectOptyions' para 'dialectOptions'
        ssl: {
            require: true,
            rejectUnauthorized: false
        }
    };
}

const sequelize = new Sequelize(
    process.env.DB_NAME,
    process.env.DB_USER,
    process.env.DB_PASSWORD,
    config // Passa o objeto de configuração final
);

sequelize.authenticate().then(() => {
    console.log("Banco de dados conectado com sucesso!");
}) .catch ((err) => {
    console.error("Algo deu errado ao conectar ao banco de dados:", err)
});

export default sequelize;