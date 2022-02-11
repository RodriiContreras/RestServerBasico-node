const { response } = require("express")


const validarRol = (res=response,req,next)=>{
    if(!req.usuarioAutenticado){
        return res.status(500).json({
            msg:'Se quiere verificar el role sin validar el tocken primero'
        })
    }

    const {role,nombre} = req.usuarioAutenticado

    if(!role === 'ADMIN_ROLE'){
        return res.status(401).json({
            msg:'No tienes los permisos para hacer esto'
        })
    }
    next()
}

const tieneRole = (...rest)=>{

    return( req , res ,next) =>{
         console.log(rest)


         if(!req.usuarioAutenticado){
            return res.status(500).json({
                msg:'Se quiere verificar el role sin validar el tocken primero'
            })
        }

        if(!rest.includes(req.usuario.rol)){
            return res.status(401).json({
                msg:'El servicio requiere alguno de estos roles'
            })
        }


        next()
    }
}


module.exports={
    validarRol,
    tieneRole}