const { Categoria } = require('../models')
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


    const existeCategoriaId = async (id) =>{
      const categoriaExisteId = await Categoria.findById(id)

      if(!categoriaExisteId){
        throw new Error('el usuario con ese ID no existe')
      }
    }

    const coleccionesPermitidas =(coleccion ='', colecciones=[]) =>{
     const incluido = colecciones.includes(coleccion)

     if(!incluido){
       throw new Error('coleccion no permitida')
     }

     return true
    }

   module.exports= {
       roleValido,
       emailExiste,
       usuarioIdExiste,
       existeCategoriaId,
       coleccionesPermitidas
   }