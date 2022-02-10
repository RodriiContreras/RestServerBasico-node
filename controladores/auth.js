 const bcryptjs = require('bcryptjs');
const {response} = require('express');
 const Usuario = require('../models/usuario')
 const {generarJWT} = require('../helpers/jwt')

 const login =  async(req,res = response)=>{
   const {email,password } = req.body;
    

   try {

    //
    const usuarioExiste =  await Usuario.findOne({email})

//verifico si existe 
    if(!usuarioExiste){
        return res.status(400).json({
            msg:'Este usuario no existe'
        })
    }

    //verifico si el estado del usuario esta en false
    if(!usuarioExiste.state){
        return res.status(400).json({
            msg:'Este usuario esta dado de baja'
        })
    }
  
    const validpassword =bcryptjs.compareSync(password,usuarioExiste.password)


    //token 
    const token = await generarJWT(usuarioExiste.id,usuarioExiste.nombre)
    if(!validpassword){
        return res.status(400).json({
            msg:'El Mail y/o Contraseña son incorrectas'
        })
    }
       
    res.json({
        usuarioExiste,
        token
    })
   }
    catch (error) {
        console.log(error)
      return res.status(500).json({
          msg:'Error en el server'
        })
   }

 }



 module.exports={
login
}