const {response} = require('express')
const Usuario = require('../models/usuario')


const usuariosGet = (req, res=response) =>{
    const parametros = req.query;
    res.json({
        msg:"get api",
        queryparams:parametros
    })
  }

  const usuariosPut = (req, res) =>{
      const id =req.params.id;
    res.json({
        msg:"put api",
        id:id
    })
}


 const usuariosPost=  async (req, res) =>{
     const body= req.body;
    const usuario = new Usuario(body)
     await usuario.save();
    res.json({
        usuario
    })
}

const usuariosDelete=  (req, res) =>{
    res.json({
        msg:"delete api"
    })
}

module.exports={
    usuariosGet,
    usuariosPut,
    usuariosPost,
    usuariosDelete
}

