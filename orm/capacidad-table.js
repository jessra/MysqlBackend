const {Sequelize, DataTypes, Model} = require('sequelize');
const config = require('../config.json')

const db = new Sequelize(config.db.database, config.db.user, config.db.password, {
    host: config.db.host,
    dialect: config.db.dialect
});

class CapacidadTable extends Model {}

CapacidadTable.init({
    id_ca: {
        type: DataTypes.BIGINT(11),
        autoIncrement: true,
        primaryKey: true,
        unique: true
    },
    nivel_ca: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true
    }
}, {
    db,
    sequelize: db,
    modelName: 'CapacidadTable',
    tableName: 'capacidad'
});

CapacidadTable.sync();

module.exports = CapacidadTable;