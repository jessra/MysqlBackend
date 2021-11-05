const express = require('express');
const app = express();
const morgan = require('morgan');
const config = require('./config.json');
global.config = config;
const UsersTable = require('./orm/users-table');
global.UsersTable = UsersTable;
const ProcessorsTable = require('./orm/processors-table');
global.ProcessorsTable = ProcessorsTable;
const MarcaTable = require('./orm/marca-table');
global.MarcaTable = MarcaTable;
const PlacaTable = require('./orm/placasmadre-table');
global.PlacaTable = PlacaTable;
const CapacidadTable = require('./orm/capacidad-table');
global.CapacidadTable = CapacidadTable;
const Memoria = require('./orm/memorias-table');
global.Memoria = Memoria;
const TipoTable = require('./orm/tipos-table');
global.TipoTable = TipoTable;
const FuncionTable = require('./orm/funcion-table');
global.FuncionTable = FuncionTable;
const DiscoTable = require('./orm/discoduro-table');
global.DiscoTable = DiscoTable;

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(morgan('dev'));

const routesGet = require("./routes/get.js");
app.use('/get', routesGet);
const routesPost = require("./routes/post.js");
app.use('/post', routesPost);

module.exports = app;