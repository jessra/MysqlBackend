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

// Registrarse
collector.post('/registrarse', function(req, res, next) {
  if (req.body !== {}) {
    async function MenssageRe (Name, User, Password) {
      const message = await agregarUser(Name, User, Password);
      res.send(message);
    };
    MenssageRe (req.body.name, req.body.user, req.body.password);
  } else {
    res.send('Ingrese los datos');
  };
});
//Equipos de computación
collector.post('/:equipo?', function(req, res, next) {
  if (req.params.equipo === 'procesador') {
    if (req.body !== {}) {
      async function MenssagePro (Name, Codigo, Nucleos, Marca, User, Password) {
        const message = await agregarProcesador(Name, Codigo, Nucleos, Marca, User, Password);
        res.send(message);
      }
      MenssagePro (req.body.name, req.body.codigo, req.body.nucleos, req.body.marca, req.body.user, req.body.password);
    } else {
      res.send('Ingrese los datos');
    };
  } else if (req.params.equipo === 'placa') {
    if (req.body !== {}) {
      async function MenssagePla (Name, Codigo, Ranuras, Marca, User, Password) {
        const message = await agregarPlaca(Name, Codigo, Ranuras, Marca, User, Password);
        res.send(message);
      };
      MenssagePla (req.body.name, req.body.codigo, req.body.ranuras, req.body.marca, req.body.user, req.body.password);
    } else {
      res.send('Ingrese los datos');
    };
  } else if (req.params.equipo === 'memoria') {
    if (req.body !== {}) {
      async function MenssageMe (Name, Codigo, Capacidad, Tipo, Marca, User, Password) {
        const message = await agregarMemoria(Name, Codigo, Capacidad, Tipo, Marca, User, Password);
        res.send(message);
      };
      MenssageMe (req.body.name, req.body.codigo, req.body.capacidad, req.body.tipo, req.body.marca, req.body.user, req.body.password);
    } else {
      res.send('Ingrese los datos');
    };
  } else if (req.params.equipo === 'disco') {
    if (req.body !== {}) {
      async function MenssageDis (Name, Codigo, Funcion, Tipo, Marca, User, Password) {
        const message = await agregarDisco(Name, Codigo, Funcion, Tipo, Marca, User, Password);
        res.send(message);
      };
      MenssageDis (req.body.name, req.body.codigo, req.body.funcion, req.body.tipo, req.body.marca, req.body.user, req.body.password);
    } else {
      res.send('Ingrese los datos');
    };
  } else if (req.params.equipo === 'tarjeta') {
    if (req.body !== {}) {
      async function MenssageTar (Name, Codigo, Funcion, Tipo, Marca, User, Password) {
        const message = await agregarTarjeta(Name, Codigo, Funcion, Tipo, Marca, User, Password);
        res.send(message);
      };
      MenssageTar (req.body.name, req.body.codigo, req.body.funcion, req.body.tipo, req.body.marca, req.body.user, req.body.password);
    } else {
      res.send('Ingrese los datos');
    };
  } else {
    res.send('Este tipo de equipo no está disponible por el momento');
  };
});

//Clases
class Registro {
  constructor(name, user, password) {
    this.name = name;
    this.user = user;
    this.password = password;
    this.message = 'Te has registrado satisfactoriamente,' + this.user;
  };
};
class Procesador {
  constructor(name, codigo, nucleos, marca, user, password) {
    this.name = name;
    this.codigo = codigo;
    this.nucleos = nucleos;
    this.marca = marca;
    this.user = user;
    this.password = password;
    this.message = this.user + ', se ha almacenado correctamente un procesador';
  };
};
class Placa {
  constructor(name, codigo, ranuras, marca, user, password) {
    this.name = name;
    this.codigo = codigo;
    this.ranuras = ranuras;
    this.marca = marca;
    this.user = user;
    this.password = password;
    this.message = this.user + ', se ha almacenado correctamente una placa';
  };
};
class Memoria {
  constructor(name, codigo, capacidad, tipo, marca, user, password) {
    this.name = name;
    this.codigo = codigo;
    this.capacidad = capacidad;
    this.tipo = tipo;
    this.marca = marca;
    this.user = user;
    this.password = password;
    this.message = this.user + ', se ha almacenado correctamente una memoria';
  };
};
class Disco {
  constructor(name, codigo, funcion, tipo, marca, user, password) {
    this.name = name;
    this.codigo = codigo;
    this.funcion = funcion;
    this.tipo = tipo;
    this.marca = marca;
    this.user = user;
    this.password = password;
    this.message = this.user + ', se ha almacenado correctamente un disco';
  };
};
class Tarjeta {
  constructor(name, codigo, funcion, tipo, marca, user, password) {
    this.name = name;
    this.codigo = codigo;
    this.funcion = funcion;
    this.tipo = tipo;
    this.marca = marca;
    this.user = user;
    this.password = password;
    this.message = this.user + ', se ha almacenado correctamente una tarjeta';
  };
};

//Funciones
async function agregarUser (Name, User, Password) {
  try {
    const user = new Registro(Name, User, Password);
    console.log(user);
    console.log(user.name);
    await UsersTable.create({
      name : user.name,
      user : user.user,
      password : user.password
    });
    return user.message;
  } catch (error) {
    return 'Ha ocurrido un problema: ' + error.message;
  };
};
async function validarUser (User, Password) {
  const idUser = await UsersTable.findOne({
    where : {user : User, password: Password}
  });
  return idUser;
};
async function agregarProcesador (Name, Codigo, Nucleos, Marca, User, Password) {
  try {
    const procesador = new Procesador(Name, Codigo, Nucleos, Marca, User, Password);
    const user = await validarUser(procesador.user, procesador.password);
    if (user === null) return error;
    let idMar = await MarcaTable.findOne({
      where : {name_mar : procesador.marca}
    });
    if (idMar === null) {
      await MarcaTable.create({
        name_mar : procesador.marca
      });
      idMar = await MarcaTable.findOne({
        where : {name_mar : procesador.marca}
      });
    };
    await ProcessorsTable.create({
      name_pro : procesador.name,
      codigo_pro : procesador.codigo,
      nucleos_pro : procesador.nucleos,
      MarcaTableIdMar : idMar.id_mar,
      UsersTableIdUser : user.id_user
    });
    return procesador.message;
  } catch (error) {
    return 'Ha ocurrido un problema: ' + error.message;
  };
};
async function agregarPlaca (Name, Codigo, Ranuras, Marca, User, Password) {
  try {
    const placa = new Placa(Name, Codigo, Ranuras, Marca, User, Password);
    const user = await validarUser(placa.user, placa.password);
    if (user === null) return error;
    let idPla = await MarcaTable.findOne({
      where : {name_mar : placa.marca}
    });
    if (idPla === null) {
      await MarcaTable.create({
        name_mar : placa.marca
      });
      idPla = await MarcaTable.findOne({
        where : {name_mar : placa.marca}
      });
    };
    await PlacaTable.create({
      name_pla : placa.name,
      codigo_pla : placa.codigo,
      ranuras_pla : placa.ranuras,
      MarcaTableIdMar : idPla.id_mar,
      UsersTableIdUser : user.id_user
    });
    return placa.message;
  } catch (error) {
    return 'Ha ocurrido un problema: ' + error.message;
  };
};
async function agregarMemoria (Name, Codigo, Capacidad, Tipo, Marca, User, Password) {
  try {
    const memoria = new Memoria(Name, Codigo, Capacidad, Tipo, Marca, User, Password);
    const user = await validarUser(memoria.user, memoria.password);
    if (user === null) return error;
    let idMar = await MarcaTable.findOne({
      where : {name_mar : memoria.marca}
    });
    if (idMar === null) {
      await MarcaTable.create({
        name_mar : memoria.marca
      });
      idMar = await MarcaTable.findOne({
        where : {name_mar : memoria.marca}
      });
    };
    let idCa = await CapacidadTable.findOne({
      where : {nivel_ca : memoria.capacidad}
    });
    if (idCa === null) {
      await CapacidadTable.create({
        nivel_ca : memoria.capacidad
      });
      idCa = await CapacidadTable.findOne({
        where : {nivel_ca : memoria.capacidad}
      });
    };
    let idTipo = await TipoTable.findOne({
      where : {name_tipo : memoria.tipo}
    });
    if (idTipo === null) {
      await TipoTable.create({
        name_tipo : memoria.tipo
      });
      idTipo = await TipoTable.findOne({
        where : {name_tipo : memoria.tipo}
      });
    };
    await MemoriaTable.create({
      name_me : memoria.name,
      codigo_me : memoria.codigo,
      CapacidadTableIdCa : idCa.id_ca,
      TipoTableIdTipo : idTipo.id_tipo,
      MarcaTableIdMar : idMar.id_mar,
      UsersTableIdUser : user.id_user
    });
    return memoria.message;
  } catch (error) {
    return 'Ha ocurrido un problema: ' + error.message;
  };
};
async function agregarDisco (Name, Codigo, Funcion, Tipo, Marca, User, Password) {
  try {
    const disco = new Disco(Name, Codigo, Funcion, Tipo, Marca, User, Password);
    const user = await validarUser(disco.user, disco.password);
    if (user === null) return error;
    let idMar = await MarcaTable.findOne({
      where : {name_mar : disco.marca}
    });
    if (idMar === null) {
      await MarcaTable.create({
        name_mar : disco.marca
      });
      idMar = await MarcaTable.findOne({
        where : {name_mar : disco.marca}
      });
    };
    let idFun = await FuncionTable.findOne({
      where : {tipo_fun : disco.funcion}
    });
    if (idFun === null) {
      await FuncionTable.create({
        tipo_fun : disco.funcion
      });
      idFun = await FuncionTable.findOne({
        where : {tipo_fun : disco.funcion}
      });
    };
    let idTipo = await TipoTable.findOne({
      where : {name_tipo : disco.tipo}
    });
    if (idTipo === null) {
      await TipoTable.create({
        name_tipo : disco.tipo
      });
      idTipo = await TipoTable.findOne({
        where : {name_tipo : disco.tipo}
      });
    };
    await DiscoTable.create({
      name_dis : disco.name,
      codigo_dis : disco.codigo,
      FuncionTableIdFun : idFun.id_fun,
      TipoTableIdTipo : idTipo.id_tipo,
      MarcaTableIdMar : idMar.id_mar,
      UsersTableIdUser : user.id_user
    });
    return disco.message;
  } catch (error) {
    return 'Ha ocurrido un problema: ' + error.message;
  }
}
async function agregarTarjeta (Name, Codigo, Funcion, Tipo, Marca, User, Password) {
  try {
    const tarjeta = new Tarjeta(Name, Codigo, Funcion, Tipo, Marca, User, Password);
    const user = await validarUser(tarjeta.user, tarjeta.password);
    if (user === null) return error;
    let idMar = await MarcaTable.findOne({
      where : {name_mar : tarjeta.marca}
    });
    if (idMar === null) {
      await MarcaTable.create({
        name_mar : tarjeta.marca
      });
      idMar = await MarcaTable.findOne({
        where : {name_mar : tarjeta.marca}
      });
    };
    let idFun = await FuncionTable.findOne({
      where : {tipo_fun : tarjeta.funcion}
    });
    if (idFun === null) {
      await FuncionTable.create({
        tipo_fun : tarjeta.funcion
      });
      idFun = await FuncionTable.findOne({
        where : {tipo_fun : tarjeta.funcion}
      });
    };
    let idTipo = await TipoTable.findOne({
      where : {name_tipo : tarjeta.tipo}
    });
    if (idTipo === null) {
      await TipoTable.create({
        name_tipo : tarjeta.tipo
      });
      idTipo = await TipoTable.findOne({
        where : {name_tipo : tarjeta.tipo}
      });
    };
    await TarjetaTable.create({
      name_tar : tarjeta.name,
      codigo_tar : tarjeta.codigo,
      FuncionTableIdFun : idFun.id_fun,
      TipoTableIdTipo : idTipo.id_tipo,
      MarcaTableIdMar : idMar.id_mar,
      UsersTableIdUser : user.id_user
    });
    return tarjeta.message;
  } catch (error) {
    return 'Ha ocurrido un problema: ' + error.message;
  };
};
module.exports = collector;