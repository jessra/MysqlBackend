const express = require('express');
const CapacidadTable = require('../orm/capacidad-table');
const DiscoTable = require('../orm/discoduro-table');
const FuncionTable = require('../orm/funcion-table');
const MarcaTable = require('../orm/marca-table');
const MemoriaTable = require('../orm/memorias-table');
const PlacaTable = require('../orm/placasmadre-table');
const ProcessorsTable = require('../orm/processors-table');
const TarjetaTable = require('../orm/tarjetadevideo-table');
const TipoTable = require('../orm/tipos-table');
const UsersTable = require('../orm/users-table');
const collector = express.Router();

// DELETE
collector.delete('/:user?/:password?', function(req, res, next) {
    if (req.params.user !== undefined && req.params.password !== undefined){
        async function MessageCu (User, Password) {
            try{
                const message = await eliminarCuenta(User, Password);
            console.log(message);
            res.send(message);
            } catch (error) {
                console.log(error);
            };
        };
        MessageCu (req.params.user, req.params.password);
      } else {
        res.send('Recuerda ingresar tu user y contraseña');
      };
  });
collector.delete('/:equipo?/:user?/:password?', function(req, res, next) {
    if (req.params.user !== undefined && req.params.password !== undefined){
        if (req.params.equipo === 'procesadores') {
            async function MenssagePro (User, Password) {
              const message = await eliminarProcesador(User, Password);
              res.send(message);
            };
            MenssagePro(req.params.user, req.params.password);
          } else if (req.params.equipo === 'tarjetas') {
            async function MenssageTar (User, Password) {
              const message = await eliminarTarjeta(User, Password);
              res.send(message);
            };
            MenssageTar(req.params.user, req.params.password);
          } else if (req.params.equipo === 'placas') {
            async function MenssagePla (User, Password) {
              const message = await eliminarPlaca(User, Password);
              res.send(message);
            };
            MenssagePla(req.params.user, req.params.password);
          } else if (req.params.equipo === 'memorias') {
            async function MenssageMe (User, Password) {
              const message = await eliminarMemoria(User, Password);
              res.send(message);
            };
            MenssageMe(req.params.user, req.params.password);
          } else if (req.params.equipo === 'discos') {
            async function MenssageMe (User, Password) {
              const message = await eliminarDisco(User, Password);
              res.send(message);
            };
            MenssageMe(req.params.user, req.params.password);
          } else {
            res.send('Este tipo de equipo no está disponible por el momento');
          };
      } else {
        res.send('Recuerda ingresar tu user y contraseña');
      };
  });
  collector.delete('/:equipo?/:id?/:user?/:password?', function(req, res, next) {
    if (req.params.user !== undefined && req.params.password !== undefined){
        if (req.params.equipo === 'procesador') {
            async function MenssagePro (User, Password, Id) {
              const message = await eliminarProcesador(User, Password, Id);
              res.send(message);
            };
            MenssagePro(req.params.user, req.params.password, req.params.id);
          } else if (req.params.equipo === 'tarjeta') {
            async function MenssageTar (User, Password, Id) {
              const message = await eliminarTarjeta(User, Password, Id);
              res.send(message);
            };
            MenssageTar(req.params.user, req.params.password, req.params.id);
          } else if (req.params.equipo === 'placa') {
            async function MenssagePla (User, Password, Id) {
              const message = await eliminarPlaca(User, Password, Id);
              res.send(message);
            };
            MenssagePla(req.params.user, req.params.password, req.params.id);
          } else if (req.params.equipo === 'memoria') {
            async function MenssageMe (User, Password, Id) {
              const message = await eliminarMemoria(User, Password, Id);
              res.send(message);
            };
            MenssageMe(req.params.user, req.params.password, req.params.id);
          } else if (req.params.equipo === 'disco') {
            async function MenssageMe (User, Password, Id) {
              const message = await eliminarDisco(User, Password, Id);
              res.send(message);
            };
            MenssageMe(req.params.user, req.params.password, req.params.id);
          } else {
            res.send('Este tipo de equipo no está disponible por el momento');
          };
      } else {
        res.send('Recuerda ingresar tu user y contraseña');
      };
  });
  collector.delete('/espe/:especificacion?/:id?/:user?/:password?', function(req, res, next) {
    if (req.params.user !== undefined && req.params.password !== undefined){
      if (req.params.especificacion === 'marca') {
        async function MessageMar (User, Password, Id) {
          const message = await eliminarMarca(User, Password, Id);
          res.send(message);
        };
        MessageMar (req.params.user, req.params.password, req.params.id);
      } else if (req.params.especificacion === 'funcion') {
        async function MessageFun (User, Password, Id) {
          const message = await eliminarFuncion(User, Password, Id);
          res.send(message);
        };
        MessageFun (req.params.user, req.params.password, req.params.id);
      } else if (req.params.especificacion === 'capacidad') {
        async function MessageCa (User, Password, Id) {
          const message = await eliminarCapacidad(User, Password, Id);
          res.send(message);
        };
        MessageCa (req.params.user, req.params.password, req.params.id);
      } else if (req.params.especificacion === 'tipo') {
        async function MessageTi (User, Password, Id) {
          const message = await eliminarTipo(User, Password, Id);
          res.send(message);
        };
        MessageTi (req.params.user, req.params.password, req.params.id);
      } else {
        res.send('Este tipo de equipo no está disponible por el momento');
      };
    };
  });

//Funciones

async function validarUser (User, Password) {
    const idUser = await UsersTable.findOne({
        where : {user : User, password: Password}
    });
    return idUser;
};
async function eliminarCuenta (User, Password) {
    try {
        const user = await validarUser(User, Password);
        if (user === null) return error;
        await UsersTable.destroy({
            where : {id_user : user.id_user}
        });
        const message = 'Se ha eliminado la cuenta correctamente';
        return message;
    } catch (error) {
        return 'Ha ocurrido un problema: ' + error.message;
    };
};
async function eliminarProcesador (User, Password, Id) {
    try {
      const user = await validarUser(User, Password);
      if (user === null) return error;

      if (Id !== undefined) {
        await ProcessorsTable.destroy({
        where : {UsersTableIdUser : user.id_user, id_pro : Id}
        });
        message = 'Se han eliminado el procesador en la posición ' + Id + ' correctamente';
      } else {
        await ProcessorsTable.destroy({
        where : {UsersTableIdUser : user.id_user}
        });
        message = 'Se ha eliminado los procesadores correctamente';
      };
      
      return message;
    } catch (error) {
      return 'Ha ocurrido un problema: ' + error.message;
    };
  };
  async function eliminarTarjeta (User, Password, Id) {
    try {
      const user = await validarUser(User, Password);
      if (user === null) return error;

      if (Id !== undefined) {
        await TarjetaTable.destroy({
        where : {UsersTableIdUser : user.id_user, id_tar : Id}
        });
        message = 'Se han eliminado la tarjeta en la posición ' + Id + ' correctamente';
    } else {
        await TarjetaTable.destroy({
        where : {UsersTableIdUser : user.id_user}
        });
        message = 'Se ha eliminado las tarjetas correctamente';
    };
      
      return message;
    } catch (error) {
      return 'Ha ocurrido un problema: ' + error.message;
    };
  };
  async function eliminarPlaca (User, Password, Id) {
    try {
      const user = await validarUser(User, Password);
      if (user === null) return error;

      if (Id !== undefined) {
        await PlacaTable.destroy({
        where : {UsersTableIdUser : user.id_user, id_pla : Id}
        });
        message = 'Se han eliminado la placa en la posición ' + Id + ' correctamente';
    } else {
        await PlacaTable.destroy({
          where : {UsersTableIdUser : user.id_user}
          });
        message = 'Se ha eliminado las placas correctamente';
    };
      
      return message;
    } catch (error) {
      return 'Ha ocurrido un problema: ' + error.message;
    };
  };
  async function eliminarMemoria (User, Password, Id) {
    try {
      const user = await validarUser(User, Password);
      if (user === null) return error;

      if (Id !== undefined) {
        await MemoriaTable.destroy({
        where : {UsersTableIdUser : user.id_user, id_me : Id}
        });
        message = 'Se han eliminado la memoria en la posición ' + Id + ' correctamente';
    } else {
        await MemoriaTable.destroy({
        where : {UsersTableIdUser : user.id_user}
        });
        message = 'Se ha eliminado las memorias correctamente';
    };
      return message;
    } catch (error) {
      return 'Ha ocurrido un problema: ' + error.message;
    };
  };
  async function eliminarDisco (User, Password, Id) {
    try {
      const user = await validarUser(User, Password);
      if (user === null) return error;

      if (Id !== undefined) {
        await DiscoTable.destroy({
            where : {UsersTableIdUser : user.id_user, id_dis : Id}
            });
        message = 'Se han eliminado el disco en la posición ' + Id + ' correctamente';
    } else {
        await DiscoTable.destroy({
          where : {UsersTableIdUser : user.id_user}
          });
        message = 'Se han eliminado los discos correctamente';
    };
      
      return message;
    } catch (error) {
      return 'Ha ocurrido un problema: ' + error.message;
    };
  };
  async function eliminarMarca (User, Password, Id) {
    try {
      const user = await validarUser(User, Password);
      if (user === null) return error;
      await MarcaTable.destroy({
        where : {id_mar : Id}
      });
     const message = 'Se han eliminado la marca en la posición ' + Id + ' correctamente';
      return message;
    } catch (error) {
      return 'Ha ocurrido un problema: ' + error.message;
    };
  };
  async function eliminarFuncion (User, Password, Id) {
    try {
        const user = await validarUser(User, Password);
        if (user === null) return error;
        await FuncionTable.destroy({
          where : {id_fun : Id}
        });
       const message = 'Se han eliminado la funcion en la posición ' + Id + ' correctamente';
        return message;
    } catch (error) {
      return 'Ha ocurrido un problema: ' + error.message;
    };
  };
  async function eliminarCapacidad (User, Password, Id) {
    try {
        const user = await validarUser(User, Password);
        if (user === null) return error;
        await CapacidadTable.destroy({
          where : {id_ca : Id}
        });
       const message = 'Se han eliminado la capacidad en la posición ' + Id + ' correctamente';
        return message;
    } catch (error) {
      return 'Ha ocurrido un problema: ' + error.message;
    };
  };
  async function eliminarTipo (User, Password, Id) {
    try {
        const user = await validarUser(User, Password);
        if (user === null) return error;
        await TipoTable.destroy({
          where : {id_tipo : Id}
        });
       const message = 'Se han eliminado el tipo en la posición ' + Id + ' correctamente';
        return message;
    } catch (error) {
      return 'Ha ocurrido un problema: ' + error.message;
    };
  };
module.exports = collector;