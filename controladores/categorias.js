
const {response} = require('express')
const { Categoria } = require('../models')

const crearCategoria = async (req, res = response)=>{
  const {name} = req.body
  const categoriaDB = await Categoria.findOne({name})

  if(categoriaDB){
    return  res.status(400).json({
        msg:'Ya existe esta categoria'
    })
  }
  
  const data ={
      name,
      usuario:req.uid._id
  }

  const categoria = new Categoria(data)

  categoria.save()


  res.status(201).json(categoria)
}

 const actualizarCategoria = async ( req,res=response)=>{
  const {id} = req.params
  const {state,usuario,...data} = req.body
    data.name =data.name.toUpperCase()
    data.usuario= req.uid.id

    const categoria = await Categoria.findOneAndUpdate(id,data,{new:true})

    res.json(categoria)


 }


 const borrarCategoria = async (req,res=response) =>{
   const {id} = req.params
   const categoriaBorrada = await Categoria.findByIdAndRemove(id)

   res.json(categoriaBorrada)
 }

const obtenerCategorias = async (req,res=response) =>{
  const categorias = await Categoria.find({}).populate('usuario','name')
   
  if(!categorias){
    return res.status(404).json({
      msg:'Actualmente no hay nada en las categorias'
    })
  }
  return res.status(201).json(
    categorias
  )
}

const obtenerCategoriaId = async (req,res=response) =>{
  const {id} = req.params 
  const categoria = await Categoria.findById( id ) 
   
  if(!categoria){
    return res.status(404).json({
      msg:'Actualmente no hay categoria con ese ID'
    })
  }
  return res.status(201).json(
    categoria
  )
}







module.exports={
    crearCategoria,
    obtenerCategorias,
    obtenerCategoriaId,
    actualizarCategoria,
    borrarCategoria
}