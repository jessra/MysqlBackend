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
const collector = express.Router();

// GET
collector.get('/', function(req, res, next) {
  res.send("Bienvenido! Este servidor te permite mantener un registro de diferentes equipos de computación. Para más información dirígete a /informacion");
});

collector.get('/informacion',
  function(req, res, next) {
  res.write("<p> /get </p>");
  next();
  },
  function(req, res, next) {
  res.write("<p>1. Asegurate de estar registrado para poder utilizar el programa, para ello debes dirigirte a /post/registrarse </p>");
  next();
  },
  function(req, res, next) {
  res.write("<p>2. Para visualizar tus equipos almacenados dirígete a /misequipos/ + tu user + / + tu contraseña. </p>");
  next();
  },
  function(req, res, next) {
  res.write("<p>3. Para visualizar un equipo en específico almacenado dirígete a / + el equipo que desees buscar + / + tu user + / + tu contraseña. </p>");
  next();
  },
  function(req, res, next) {
  res.write("<p>4. Para visualizar una especificación en especial dirígete a /espe/ + la especificación que desees buscar + / + tu user + / + tu contraseña. </p>");
  next();
  },
  function(req, res, next) {
  res.write("<p> /post </p>");
  next();
  },
  function(req, res, next) {
  res.write("<p>4. Para almacenar algún equipo dirígete a / + el nombre del equipo que desees almacenar. </p>");
  next();
  },
  function(req, res, next) {
  res.write("<p> /delete </p>");
  next();
  },
  function(req, res, next) {
  res.write("<p>5. Para eliminar una cuenta dirígete a / + el user + / + el contraseña. </p>");
  next();
  }
);

collector.get('/misequipos/:user?/:password?', function(req, res, next) {
  if (req.params.user !== undefined && req.params.password !== undefined){
    async function MessageE (User, Password) {
    const misequipos = await buscarEquipos(User, Password)
    console.log(misequipos)
    res.send(misequipos)
    }
    MessageE (req.params.user, req.params.password)
  } else {
    res.send('Recuerda ingresar tu user y contraseña')
  }
})
collector.get('/:equipo?/:user?/:password?', function(req, res, next) {
  if (req.params.user !== undefined && req.params.password !== undefined){
    if (req.params.equipo === 'procesador') {
      async function MenssagePro (User, Password) {
        const message = await buscarProcesador(User, Password);
        res.send(message)
      }
      MenssagePro(req.params.user, req.params.password)
    } else if (req.params.equipo === 'tarjeta') {
      async function MenssageTar (User, Password) {
        const message = await buscarTarjeta(User, Password);
        res.send(message)
      }
      MenssageTar(req.params.user, req.params.password)
    } else if (req.params.equipo === 'placa') {
      async function MenssagePla (User, Password) {
        const message = await buscarPlaca(User, Password);
        res.send(message)
      }
      MenssagePla(req.params.user, req.params.password)
    } else if (req.params.equipo === 'memoria') {
      async function MenssageMe (User, Password) {
        const message = await buscarMemoria(User, Password);
        res.send(message)
      }
      MenssageMe(req.params.user, req.params.password)
    } else if (req.params.equipo === 'disco') {
      async function MenssageMe (User, Password) {
        const message = await buscarDisco(User, Password);
        res.send(message)
      }
      MenssageMe(req.params.user, req.params.password)
    } else {
      res.send('Este tipo de equipo no está disponible por el momento')
    }
  }
})
collector.get('/espe/:especificacion?/:user?/:password?', function(req, res, next) {
  if (req.params.user !== undefined && req.params.password !== undefined){
    if (req.params.especificacion === 'marca') {
      async function MessageMar (User, Password) {
        const message = await buscarMarca(User, Password)
        res.send(message)
      }
      MessageMar (req.params.user, req.params.password)
    } else if (req.params.especificacion === 'funcion') {
      async function MessageFun (User, Password) {
        const message = await buscarFuncion(User, Password)
        res.send(message)
      }
      MessageFun (req.params.user, req.params.password)
    } else if (req.params.especificacion === 'capacidad') {
      async function MessageCa (User, Password) {
        const message = await buscarCapacidad(User, Password)
        res.send(message)
      }
      MessageCa (req.params.user, req.params.password)
    } else if (req.params.especificacion === 'tipo') {
      async function MessageTi (User, Password) {
        const message = await buscarTipo(User, Password)
        res.send(message)
      }
      MessageTi (req.params.user, req.params.password)
    } else {
      res.send('Este tipo de equipo no está disponible por el momento')
    }
  }
})

//Clases
class Equipo {
  constructor (procesador, tarjeta, placa, memoria, disco) {
    this.procesadores = procesador,
    this.tarjetas = tarjeta,
    this.placas = placa,
    this.memorias = memoria,
    this.discos = disco
  }
}
//Funciones

async function validarUser (User, Password) {
  const idUser = await UsersTable.findOne({
    where : {user : User, password: Password}
  })
  return idUser
}
async function Pro (User) {
  let pro = await ProcessorsTable.findAll({
    where : {UsersTableIdUser : User}
  })
  if (!Pro.length) {
    pro = 'No tienes procesadores almacenados'
  }
  return pro
}
async function Tar (User) {
  let tar = await TarjetaTable.findAll({
    where : {UsersTableIdUser : User}
  })
  if (!tar.length) {
    tar = 'No tienes tarjetas almacenadas'
  }
  return tar
}
async function Pla (User) {
  let pla = await PlacaTable.findAll({
    where : {UsersTableIdUser : User}
  })
  if (!pla.length) {
    pla = 'No tienes placas almacenadas'
  }
  return pla
}
async function Me (User) {
  let me = await MemoriaTable.findAll({
    where : {UsersTableIdUser : User}
  })
  if (!me.length) {
    me = 'No tienes memorias almacenadas'
  }
  return me
}
async function Dis (User) {
  let dis = await DiscoTable.findAll({
    where : {UsersTableIdUser : User}
  })
  if (!dis.length) {
    dis = 'No tienes discos almacenados'
  }
  return dis
}
async function buscarEquipos(User, Password) {
  try {
    const user = await validarUser(User, Password)
    if (user === null) return error
    const procesador = await Pro(user.id_user)
    const tarjeta = await Tar(user.id_user)
    const placa = await Pla(user.id_user)
    const memoria = await Me(user.id_user)
    const disco = await Dis(user.id_user)

    const equipo = new Equipo(procesador, tarjeta, placa, memoria, disco)

    return equipo
  } catch (error) {
    return 'Ha ocurrido un problema: ' + error.message 
  }
}
async function buscarProcesador (User, Password) {
  try {
    const user = await validarUser(User, Password)
    if (user === null) return error
    const procesador = await Pro(user.id_user)
    return procesador
  } catch (error) {
    return 'Ha ocurrido un problema: ' + error.message 
  }
}
async function buscarTarjeta (User, Password) {
  try {
    const user = await validarUser(User, Password)
    if (user === null) return error
    const tarjeta = await Tar(user.id_user)
    return tarjeta
  } catch (error) {
    return 'Ha ocurrido un problema: ' + error.message 
  }
}
async function buscarPlaca (User, Password) {
  try {
    const user = await validarUser(User, Password)
    if (user === null) return error
    const placa = await Pla(user.id_user)
    return placa
  } catch (error) {
    return 'Ha ocurrido un problema: ' + error.message 
  }
}
async function buscarMemoria (User, Password) {
  try {
    const user = await validarUser(User, Password)
    if (user === null) return error
    const memoria = await Me(user.id_user)
    return memoria
  } catch (error) {
    return 'Ha ocurrido un problema: ' + error.message 
  }
}
async function buscarDisco (User, Password) {
  try {
    const user = await validarUser(User, Password)
    if (user === null) return error
    const disco = await Dis(user.id_user)
    return disco
  } catch (error) {
    return 'Ha ocurrido un problema: ' + error.message 
  }
}
async function buscarMarca (User, Password) {
  try {
    const user = await validarUser(User, Password)
    if (user === null) return error
    const marca = await MarcaTable.findAll();
    return marca
  } catch (error) {
    return 'Ha ocurrido un problema: ' + error.message 
  }
}
async function buscarFuncion (User, Password) {
  try {
    const user = await validarUser(User, Password)
    if (user === null) return error
    const funcion = await FuncionTable.findAll();
    return funcion
  } catch (error) {
    return 'Ha ocurrido un problema: ' + error.message 
  }
}
async function buscarCapacidad (User, Password) {
  try {
    const user = await validarUser(User, Password)
    if (user === null) return error
    const capacidad = await CapacidadTable.findAll();
    return capacidad
  } catch (error) {
    return 'Ha ocurrido un problema: ' + error.message 
  }
}
async function buscarTipo (User, Password) {
  try {
    const user = await validarUser(User, Password)
    if (user === null) return error
    const tipo = await TipoTable.findAll();
    return tipo
  } catch (error) {
    return 'Ha ocurrido un problema: ' + error.message 
  }
}

module.exports = collector;
