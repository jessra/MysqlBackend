const {Sequelize, DataTypes, Model} = require('sequelize');
const config = require('../config.json')

const db = new Sequelize(config.db.database, config.db.user, config.db.password, {
    host: config.db.host,
    dialect: config.db.dialect
});

class MarcaTable extends Model {}

MarcaTable.init({
    id_mar: {
        type: DataTypes.BIGINT(11),
        autoIncrement: true,
        primaryKey: true,
        unique: true
    },
    name_mar: {
        type: DataTypes.STRING,
        allowNull: false
    }
}, {
    db,
    sequelize: db,
    modelName: 'MarcaTable',
    tableName: 'marca'
});

MarcaTable.sync();

module.exports = MarcaTable;