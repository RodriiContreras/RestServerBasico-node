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


module.exports={validarRol}