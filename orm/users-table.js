const {Sequelize, DataTypes, Model} = require('sequelize');
const config = require('../config.json')

const db = new Sequelize(config.db.database, config.db.user, config.db.password, {
    host: config.db.host,
    dialect: config.db.dialect
});

try {
    db.authenticate();
    console.log('La conexión se ha establecido correctamente');
} catch(error) {
    console.log('No ha sido posible establecer una conexión con la base de datos, ' + error);
}

class UsersTable extends Model {}

UsersTable.init({
    id_user: {
        type: DataTypes.BIGINT(11),
        autoIncrement: true,
        primaryKey: true,
        unique: true
    },
    name: {
        type: DataTypes.STRING,
        allowNull: false
    },
    user: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true
    },
    password: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true
    }
}, {
    db,
    sequelize: db,
    modelName: 'UsersTable',
    tableName: 'users'
});

UsersTable.sync();

module.exports = UsersTable;