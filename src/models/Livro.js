import { DataTypes } from 'sequelize';
import sequelize from '../services/configDb.js';

const Livro = sequelize.define('Livro', {
    titulo: {
        type: DataTypes.STRING,
        allowNull: false
    },
    autor: {
        type: DataTypes.STRING,
        allowNull: false
    },
    status: {
        type: DataTypes.STRING,
    }
}, {
    tableName: 'livros',
    timestamps: false
});

export default Livro;