const {response} = require('express')
const { Categoria, Producto } = require('../models')

const crearProducto = async (req, res = response)=>{
  const {state,usuario, ...rest} = req.body
  const {name } = rest
  const productoDB = await Producto.findOne({name})

  if(productoDB){
    return  res.status(400).json({
        msg:'Ya existe esta categoria'
    })
  }
  
  const data ={
      ...rest,
      name:rest.name,
      usuario:req.uid._id
  }

  const producto = new Producto(data)

  producto.save()


  res.status(201).json(producto)
}

 const actualizarProducto = async ( req,res=response)=>{
  const {id} = req.params
  const {state,usuario,...data} = req.body
    data.name =data.name.toUpperCase()
    data.usuario= req.uid.id

    const producto = await Producto.findOneAndUpdate(id,data,{new:true})

    res.json(producto)


 }


 const borrarProducto = async (req,res=response) =>{
   const {id} = req.params
   const categoriaBorrada = await Categoria.findByIdAndRemove(id)

   res.json(categoriaBorrada)
 }


const obtenerProductos = async (req,res=response) =>{
  const productos = await Producto.find({}).populate('usuario','name')
  .populate('categoria','nombre')
   
  if(!productos){
    return res.status(404).json({
      msg:'Actualmente no hay nada en las categorias'
    })
  }
  return res.status(201).json(
    productos
  )
}

const obtenerProductoId = async (req,res=response) =>{
  const {id} = req.params 
  const producto = await Producto.findById( id ) 
   
  if(!producto){
    return res.status(404).json({
      msg:'Actualmente no hay categoria con ese ID'
    })
  }
  return res.status(201).json(
    producto
  )
}







module.exports={
    crearProducto,
    actualizarProducto,
    borrarProducto,
    obtenerProductos,
    obtenerProductoId
}