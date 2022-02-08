const Role = require('../models/role')
const Usuario = require('../models/usuario')


  const roleValido = async(role = '') =>{
    const existeRole = await Role.findOne({role})
 
    if(!existeRole){
      throw new Error('No existe el Rol')
    }
   }

    const emailExiste = async(email = '')=>{
      const existeEmail = await Usuario.findOne({email})

      if(existeEmail){
        throw new Error('Ya existe este mail desde validator')
      }
    }

    const usuarioIdExiste = async(id)=>{
      const existeUsuarioId = await Usuario.findById(id)

      if(!existeUsuarioId){
        throw new Error('el usuario con ese ID no existe')
      }
    }


   module.exports= {
       roleValido,
       emailExiste,
       usuarioIdExiste
   }