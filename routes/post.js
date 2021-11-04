const express = require('express');
const MarcaTable = require('../orm/marca-table');
const ProcessorsTable = require('../orm/processors-table');
const UsersTable = require('../orm/users-table');
const collector = express.Router();

// Registrarse
collector.post('/registrarse', function(req, res, next) {
  if (req.body !== {}) {
    res.send(agregarUser(req.body.name, req.body.user, req.body.password))
  } else {
    res.send('Ingrese los datos')
  }
});
collector.post('/procesador', function(req, res, next) {
  if (req.body !== {}) {
    res.send(agregarProcesador(req.body.name, req.body.codigo, req.body.nucleos, req.body.marca, req.body.user))
  }
});

//Clases
class Registro {
  constructor(name, user, password) {
    this.name = name;
    this.user = user;
    this.password = password;
  }
}
class Procesador {
  constructor(name, codigo, nucleos, marca, user) {
    this.name = name;
    this.codigo = codigo;
    this.nucleos = nucleos;
    this.marca = marca;
    this.user = user;
  }
}

//Funciones
async function agregarUser (Name, User, Password) {
  try {
    const user = await new Registro(Name, User, Password)
    await UsersTable.create({
      name : user.name,
      user : user.user,
      password : user.password
    })
    const message = 'Te has registrado satisfactoriamente, ' + user.name
    return message
  } catch (error) {
    return 'Ha ocurrido un problema: ' + error.message
  }
}
async function agregarProcesador (Name, Codigo, Nucleos, Marca, User) {
  try {
    const procesador = await new Procesador(Name, Codigo, Nucleos, Marca, User)
    const idUser = await UsersTable.findOne({
      where : {user : procesador.user}
    })
    let idMar = await MarcaTable.findOne({
      where : {name_mar : procesador.marca}
    })
    if (idMar === null) {
      await MarcaTable.create({
        name_mar : procesador.marca
      })
      idMar = await MarcaTable.findOne({
        where : {name_mar : procesador.marca}
      })
    }
    await ProcessorsTable.create({
    name_pro : procesador.name,
    codigo_pro : procesador.codigo,
    nucleos_pro : procesador.nucleos,
    MarcaTableIdMar : idMar.id_mar,
    UsersTableIdUser : idUser.id_user
    })
  } catch (error) {
    return 'Ha ocurrido un problema: ' + error.message
  }
}
module.exports = collector;