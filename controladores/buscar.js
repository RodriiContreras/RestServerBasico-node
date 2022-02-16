const {response} = require('express');
const { ObjectId } = require('mongoose').Types;
const {Usuario,Producto,Categoria,Role} = require('../models')


const coleccionesPermitidas=[
    'usuarios',
    'categoria',
    'productos'
];


const buscarUsuarios = async  (termino= '' , res=response) =>{
    const isMongoID = ObjectId.isValid(termino)

   if(isMongoID){
       const usuario =  await Usuario.findById(termino);
       res.json({
          results: (usuario) ? [usuario] : []  
       })
   }

    const regExp = new RegExp(termino,'i')


   const usuarios = await Usuario.find({
       $or:[{name: regExp}, {email:regExp}]   
    })

     res.json({
     results: usuarios
     })

}


const buscarCategorias = async  (termino= '' , res=response) =>{
    const isMongoID = ObjectId.isValid(termino)

   if(isMongoID){
       const categoria =  await Categoria.findById(termino);
       res.json({
          results: (categorias) ? [categorias] : []  
       })
   }

    const regExp = new RegExp(termino,'i')


   const categorias = await Categoria.find({name: regExp,state:true})

     res.json({
     results: categorias
     })

}

const buscarProductos = async (termino= '',res=response) =>{
    const isMongoID = ObjectId.isValid(termino)

   if(isMongoID){
       const producto =  await Producto.findById(termino);
       res.json({
          results: (producto) ? [producto] : []  
       })
   }

    const regExp = new RegExp(termino,'i')


   const productos = await Producto.find({name: regExp,state:true})

     res.json({
     results: productos
     })

}



const buscar= ( req , res=response)=>{

    const {coleccion,termino}=req.params


    if(!coleccionesPermitidas.includes(coleccion)){
        return res.status(400).json({
            msg:'No existe esta coleccion en nuestro DB'
        })
    }

    switch(coleccion){
        case 'usuarios':
            buscarUsuarios(termino,res)
        break;
 
        case 'categoria':
            buscarCategorias(termino,res)
        break;

        case 'productos':
            buscarProductos(termino,res)
        break;

       default:
           res.status(500).json({
               msg:'Error DB'
           })

    }

    res.json({
        coleccion,
        termino
    })
}




module.exports={
  buscar}