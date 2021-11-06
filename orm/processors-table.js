const {Sequelize, DataTypes, Model} = require('sequelize');
const config = require('../config.json');
const MarcaTable = require('./marca-table');
const UsersTable = require('./users-table');

const db = new Sequelize(config.db.database, config.db.user, config.db.password, {
    host: config.db.host,
    dialect: config.db.dialect
});

class ProcessorsTable extends Model {};

ProcessorsTable.init({
    id_pro: {
        type: DataTypes.BIGINT(11),
        autoIncrement: true,
        primaryKey: true,
        unique: true
    },
    name_pro: {
        type: DataTypes.STRING,
        allowNull: false
    },
    codigo_pro: {
        type: DataTypes.STRING,
        allowNull: false
    },
    nucleos_pro: {
        type: DataTypes.STRING,
        allowNull: false
    }
}, {
    db,
    sequelize: db,
    modelName: 'ProcessorsTable',
    tableName: 'processors'
});

ProcessorsTable.Marca = ProcessorsTable.belongsTo(MarcaTable);
ProcessorsTable.User = ProcessorsTable.belongsTo(UsersTable);

ProcessorsTable.sync();

module.exports = ProcessorsTable;