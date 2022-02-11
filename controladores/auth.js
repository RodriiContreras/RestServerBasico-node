 const bcryptjs = require('bcryptjs');
const {response} = require('express');
 const Usuario = require('../models/usuario')
 const {generarJWT} = require('../helpers/jwt')
const {googleVerify} = require('../helpers/googleVerify')

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

 const googleSign= async (req , res=response) =>{
  const {id_token} =req.body

  try {
      const {name,email,picture} = await googleVerify( id_token)

      let usuario = await Usuario.findOne({email})
      console.log(usuario)

      if( !usuario ){
          const data = {
            name,
            email,
            password:'s',
            picture,
            google:true,
            role:'USER_ROLE'
          }

          usuario = new Usuario( data );
          await usuario.save()
      }

      if(!usuario.state){
          return res.status(401).json({
              msg:'Su cuenta esta dada de baja'
          })
      }

      const token = await generarJWT(usuario.id)
      res.json({
    usuario,
    token
    })
  } catch (error) {
      console.log(error)
  }
 }
 module.exports={
login,
googleSign
}