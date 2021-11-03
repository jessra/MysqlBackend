const express = require('express');
const app = express();
const morgan = require('morgan');
const config = require('./config.json');
global.config = config;
const UsersTable = require('./orm/users-table');
global.UsersTable = UsersTable;

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(morgan('dev'));

const routesGet = require("./routes/get.js");
app.use('/get', routesGet);
const routesPost = require("./routes/post.js");
app.use('/post', routesPost);

module.exports = app;