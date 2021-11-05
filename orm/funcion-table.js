const {Sequelize, DataTypes, Model} = require('sequelize');
const config = require('../config.json')

const db = new Sequelize(config.db.database, config.db.user, config.db.password, {
    host: config.db.host,
    dialect: config.db.dialect
});

class FuncionTable extends Model {}

FuncionTable.init({
    id_fun: {
        type: DataTypes.BIGINT(11),
        autoIncrement: true,
        primaryKey: true,
        unique: true
    },
    tipo_fun: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true
    }
}, {
    db,
    sequelize: db,
    modelName: 'FuncionTable',
    tableName: 'funcion'
});

FuncionTable.sync();

module.exports = FuncionTable;