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

class DiscoTable extends Model {};

DiscoTable.init({
    id_dis: {
        type: DataTypes.BIGINT(11),
        autoIncrement: true,
        primaryKey: true,
        unique: true
    },
    name_dis: {
        type: DataTypes.STRING,
        allowNull: false
    },
    codigo_dis: {
        type: DataTypes.STRING,
        allowNull: false
    }
}, {
    db,
    sequelize: db,
    modelName: 'DiscoTable',
    tableName: 'discoDuro'
});

DiscoTable.Marca = DiscoTable.belongsTo(MarcaTable);
DiscoTable.User = DiscoTable.belongsTo(UsersTable);
DiscoTable.Funcion = DiscoTable.belongsTo(FuncionTable);
DiscoTable.TiposTable = DiscoTable.belongsTo(TipoTable);

DiscoTable.sync();

module.exports = DiscoTable;