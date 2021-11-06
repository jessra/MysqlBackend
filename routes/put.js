const express = require('express');
const CapacidadTable = require('../orm/capacidad-table');
const FuncionTable = require('../orm/funcion-table');
const MarcaTable = require('../orm/marca-table');
const TipoTable = require('../orm/tipos-table');
const UsersTable = require('../orm/users-table');
const collector = express.Router();

collector.put('/:user?/:password?', function(req, res, next) {
    if (req.params.user !== undefined && req.params.password !== undefined){
        if (req.body !== {}) {
            async function MessageE (User, Password, NewUser, NewPassword, NewName) {
            const messages = await editarCuenta(User, Password, NewUser, NewPassword, NewName);
                res.send(messages);
            }
            MessageE (req.params.user, req.params.password, req.body.user, req.body.password, req.body.name);
        } else {
            res.send('Recuerda enviar los cambios que deseas');
        }
    } else {
      res.send('Recuerda ingresar tu user y contraseña');
    }
  })
  collector.put('/:especificacion?/:id?/:user?/:password?', function(req, res, next) {
    if (req.params.user !== undefined && req.params.password !== undefined){
        if (req.body !== {}) {
            if (req.params.especificacion === 'marca') {
                async function MessageMar (User, Password, Id, NewName) {
                const messages = await editarMarca(User, Password, Id, NewName);
                    res.send(messages);
                }
                MessageMar (req.params.user, req.params.password, req.params.id, req.body.name);
            } else if (req.params.especificacion === 'tipo') {
                async function MessageTi (User, Password, Id, NewName) {
                const messages = await editarTipo(User, Password, Id, NewName);
                    res.send(messages);
                }
                MessageTi (req.params.user, req.params.password, req.params.id, req.body.name);
            } else if (req.params.especificacion === 'capacidad') {
                async function MessageCa (User, Password, Id, NewNivel) {
                const messages = await editarCapacidad(User, Password, Id, NewNivel);
                    res.send(messages);
                }
                MessageCa (req.params.user, req.params.password, req.params.id, req.body.nivel);
            } else if (req.params.especificacion === 'funcion') {
                async function MessageFun (User, Password, Id, NewTipo) {
                const messages = await editarFuncion(User, Password, Id, NewTipo);
                    res.send(messages);
                }
                MessageFun (req.params.user, req.params.password, req.params.id, req.body.tipo);
            } else {
                res.send('Este tipo de especificación no está disponible por el momento');
            }
        } else {
            res.send('Recuerda enviar los cambios que deseas');
        }
    } else {
      res.send('Recuerda ingresar tu user y contraseña');
    }
  })

  //Funciones

async function validarUser (User, Password) {
    const idUser = await UsersTable.findOne({
      where : {user : User, password: Password}
    })
    return idUser;
  }
async function validarMarca (Id) {
    const idMar = await MarcaTable.findOne({
      where : {id_mar: Id}
    })
    return idMar;
  }
async function validarCapacidad (Id) {
    const idCa = await CapacidadTable.findOne({
      where : {id_ca: Id}
    })
    return idCa;
  }
async function validarFuncion (Id) {
    const idFun = await FuncionTable.findOne({
      where : {id_fun: Id}
    })
    return idFun;
  }
async function validarTipo (Id) {
    const idTipo = await TipoTable.findOne({
      where : {id_tipo: Id}
    })
    return idTipo;
  }
  async function editarCuenta (User, Password, NewUser, NewPassword, NewName) {
    try {
        const user = await validarUser(User, Password);
        if (user === null) return error;
        
        if (NewUser !== undefined) {
            await UsersTable.update({ user: NewUser },{
                where : {id_user: user.id_user}
            })
        }
        if (NewPassword !== undefined) {
            await UsersTable.update({ password: NewPassword },{
                where : {id_user: user.id_user}
            })
        }
        if (NewName !== undefined) {
            await UsersTable.update({ name: NewName },{
                where : {id_user: user.id_user}
            })
        }

        const message = 'Se han realizado los cambios correspondientes con éxito';
    
        return message;
      } catch (error) {
        return 'Ha ocurrido un problema: ' + error.message;
      }
  }
  async function editarMarca (User, Password, Id, NewName) {
    try {
        const user = await validarUser(User, Password);
        if (user === null) return error;
        const idMar = await validarMarca(Id);
        if (idMar === null) return error;
        
        await MarcaTable.update({ name_mar: NewName },{
            where : {id_mar: idMar.id_mar}
        })

        const message = 'Se han realizado los cambios correspondientes con éxito';
    
        return message;
      } catch (error) {
        return 'Ha ocurrido un problema: ' + error.message;
      }
  }
  async function editarCapacidad (User, Password, Id, NewNivel) {
    try {
        const user = await validarUser(User, Password);
        if (user === null) return error;
        const idCa = await validarCapacidad(Id);
        if (idCa === null) return error;
        
        await CapacidadTable.update({ nivel_ca: NewNivel },{
            where : {id_ca: idCa.id_ca}
        })

        const message = 'Se han realizado los cambios correspondientes con éxito';
    
        return message;
      } catch (error) {
        return 'Ha ocurrido un problema: ' + error.message;
      }
  }
  async function editarFuncion (User, Password, Id, NewTipo) {
    try {
        const user = await validarUser(User, Password);
        if (user === null) return error;
        const idFun = await validarFuncion(Id);
        if (idFun === null) return error;
        
        await FuncionTable.update({ tipo_fun: NewTipo },{
            where : {id_fun: idFun.id_fun}
        })

        const message = 'Se han realizado los cambios correspondientes con éxito';
    
        return message;
      } catch (error) {
        return 'Ha ocurrido un problema: ' + error.message;
      }
  }
  async function editarTipo (User, Password, Id, NewName) {
    try {
        const user = await validarUser(User, Password);
        if (user === null) return error;
        const idTipo = await validarTipo(Id);
        if (idTipo === null) return error;
        
        await TipoTable.update({ name_tipo: NewName },{
            where : {id_tipo: idTipo.id_tipo}
        })

        const message = 'Se han realizado los cambios correspondientes con éxito';
    
        return message;
      } catch (error) {
        return 'Ha ocurrido un problema: ' + error.message;
      }
  }

module.exports = collector;