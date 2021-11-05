const {Sequelize, DataTypes, Model} = require('sequelize');
const config = require('../config.json');
const MarcaTable = require('./marca-table');
const UsersTable = require('./users-table');
const CapacidadTable = require('./capacidad-table');
const TipoTable = require('./tipos-table');

const db = new Sequelize(config.db.database, config.db.user, config.db.password, {
    host: config.db.host,
    dialect: config.db.dialect
});

class MemoriaTable extends Model {}

MemoriaTable.init({
    id_me: {
        type: DataTypes.BIGINT(11),
        autoIncrement: true,
        primaryKey: true,
        unique: true
    },
    name_me: {
        type: DataTypes.STRING,
        allowNull: false
    },
    codigo_me: {
        type: DataTypes.STRING,
        allowNull: false
    }
}, {
    db,
    sequelize: db,
    modelName: 'MemoriaTable',
    tableName: 'memorias'
});

MemoriaTable.Marca = MemoriaTable.belongsTo(MarcaTable)
MemoriaTable.User = MemoriaTable.belongsTo(UsersTable)
MemoriaTable.Capacidad = MemoriaTable.belongsTo(CapacidadTable)
MemoriaTable.TiposTable = MemoriaTable.belongsTo(TipoTable)

MemoriaTable.sync();

module.exports = MemoriaTable;