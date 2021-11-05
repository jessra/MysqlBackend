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
//Equipos de computación
collector.post('/:equipo?', function(req, res, next) {
  if (req.params.equipo === 'procesador') {
    if (req.body !== {}) {
      res.send(agregarProcesador(req.body.name, req.body.codigo, req.body.nucleos, req.body.marca, req.body.user, req.body.password))
    }
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
  constructor(name, codigo, nucleos, marca, user, password) {
    this.name = name;
    this.codigo = codigo;
    this.nucleos = nucleos;
    this.marca = marca;
    this.user = user;
    this.password = password;
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
async function validarUser (User, Password) {
  const idUser = await UsersTable.findOne({
    where : {user : User, password: Password}
  })
  return idUser
}
async function agregarProcesador (Name, Codigo, Nucleos, Marca, User, Password) {
  try {
    const procesador = await new Procesador(Name, Codigo, Nucleos, Marca, User, Password)
    const user = await validarUser(procesador.user, procesador.password)
    if (user === null) return error
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
    UsersTableIdUser : user.id_user
    })
  } catch (error) {
    console.log(error.message)
    return 'Ha ocurrido un problema: ' + error.message
  }
}
module.exports = collector;