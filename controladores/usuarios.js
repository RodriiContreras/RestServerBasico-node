const {response} = require('express')
const Usuario = require('../models/usuario')
const bcrypt= require('bcryptjs');
const { validationResult } = require('express-validator');


const usuariosGet =async (req, res=response) =>{
    const {limit = 5 ,desde=0} = req.query;
    const [total,respuesta] = await Promise.all([
        Usuario.countDocuments({state : true}),
     Usuario.find({state : true})
     .skip(desde)
    .limit(limit)
    ])
    res.json({
        total,
        respuesta
    })
  }

  const usuariosPut = async (req, res) =>{
    const {id} =req.params;
    const {_id,password,google,email,...restoBody} = req.body

    if(password){
        const salt = bcrypt.genSaltSync();
        restoBody.password= bcrypt.hashSync(password, salt);
    }
 const usuario = await Usuario.findByIdAndUpdate(id,restoBody)
    res.json(usuario)
}


 const usuariosPost=  async (req, res) =>{

    const errors = validationResult(req)
    if(!errors.isEmpty()){
        return res.status(400).json(errors)
    }
     const {name,email,password,role}= req.body;
    const usuario = new Usuario({name,email,password,role})
    //verificar si correo existe
    //encriptar contraseña
    const salt = bcrypt.genSaltSync();
    usuario.password= bcrypt.hashSync(password, salt);
     await usuario.save();
    res.json({
        usuario
    })
}

const usuariosDelete= async (req, res) =>{

    const {id} = req.params;

    const usuario = await Usuario.findByIdAndDelete(id);
    res.json({
        usuario
    })
}

module.exports={
    usuariosGet,
    usuariosPut,
    usuariosPost,
    usuariosDelete
}

