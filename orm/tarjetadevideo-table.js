const {Sequelize, DataTypes, Model} = require('sequelize');
const config = require('../config.json');
const MarcaTable = require('./marca-table');
const UsersTable = require('./users-table');
const FuncionTable = require('./funcion-table');
const TipoTable = require('./tipos-table');

const db = new Sequelize(config.db.database, config.db.user, config.db.password, {
    host: config.db.host,
    dialect: config.db.dialect
});

class TarjetaTable extends Model {};

TarjetaTable.init({
    id_tar: {
        type: DataTypes.BIGINT(11),
        autoIncrement: true,
        primaryKey: true,
        unique: true
    },
    name_tar: {
        type: DataTypes.STRING,
        allowNull: false
    },
    codigo_tar: {
        type: DataTypes.STRING,
        allowNull: false
    }
}, {
    db,
    sequelize: db,
    modelName: 'TarjetaTable',
    tableName: 'tarjeta'
});

TarjetaTable.Marca = TarjetaTable.belongsTo(MarcaTable);
TarjetaTable.User = TarjetaTable.belongsTo(UsersTable);
TarjetaTable.Funcion = TarjetaTable.belongsTo(FuncionTable);
TarjetaTable.TiposTable = TarjetaTable.belongsTo(TipoTable);

TarjetaTable.sync();

module.exports = TarjetaTable;