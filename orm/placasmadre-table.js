const {Sequelize, DataTypes, Model} = require('sequelize');
const config = require('../config.json');
const MarcaTable = require('./marca-table');
const UsersTable = require('./users-table');

const db = new Sequelize(config.db.database, config.db.user, config.db.password, {
    host: config.db.host,
    dialect: config.db.dialect
});

class PlacaTable extends Model {};

PlacaTable.init({
    id_pla: {
        type: DataTypes.BIGINT(11),
        autoIncrement: true,
        primaryKey: true,
        unique: true
    },
    name_pla: {
        type: DataTypes.STRING,
        allowNull: false
    },
    codigo_pla: {
        type: DataTypes.STRING,
        allowNull: false
    },
    ranuras_pla: {
        type: DataTypes.STRING,
        allowNull: false
    }
}, {
    db,
    sequelize: db,
    modelName: 'PlacaTable',
    tableName: 'placas'
});

PlacaTable.Marca = PlacaTable.belongsTo(MarcaTable);
PlacaTable.User = PlacaTable.belongsTo(UsersTable);

PlacaTable.sync();

module.exports = PlacaTable;