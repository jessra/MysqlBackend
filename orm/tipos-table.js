const {Sequelize, DataTypes, Model} = require('sequelize');
const config = require('../config.json')

const db = new Sequelize(config.db.database, config.db.user, config.db.password, {
    host: config.db.host,
    dialect: config.db.dialect
});

class TipoTable extends Model {}

TipoTable.init({
    id_tipo: {
        type: DataTypes.BIGINT(11),
        autoIncrement: true,
        primaryKey: true,
        unique: true
    },
    name_tipo: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true
    }
}, {
    db,
    sequelize: db,
    modelName: 'TipoTable',
    tableName: 'tipos'
});

TipoTable.sync();

module.exports = TipoTable;