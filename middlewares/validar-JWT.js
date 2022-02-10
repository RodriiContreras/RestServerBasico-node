const { response } = require('express')
const jwt = require('jsonwebtoken')
const Usuario = require('../models/usuario')



const validarJWT =  async ( req , res = response,next)=>{
    const token = req.header('Authorization')

    if(!token){
        return res.status(401).json({
            msg:'No hay token'
        })
    }

    try {
        const {uid} = jwt.verify(token,process.env.SecretKey)

        const usuarioAutenticado = await Usuario.findById(uid)


        if(!usuarioAutenticado){
            return res.status(401).json({
                msg:'No existe el usuario'
            })
        }
  
        if(!usuarioAutenticado.state){
            return res.status(401).json({
                msg:'Token no valido'
            })
        }
  
        req.uid= usuarioAutenticado;    



        next()
    } 
    catch (error) {
        console.log(error)
        res.status(401).json({
            msg:'Token no valido'
        })
    }
    console.log(token)
    
    
}

module.exports={validarJWT}