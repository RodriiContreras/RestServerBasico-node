const { response } = require('express');
const { subirArchivo } = require('../helpers/subir-archivo');
const {Usuario,Producto} = require('../models')
const path = require('path');
const fs = require('fs')
const cloudinary = require('cloudinary').v2
cloudinary.config(process.env.CLOUDINARY_URL)

const cargarArchivos = async ( req , res=response)=>{

    if (!req.files || Object.keys(req.files).length === 0) {
      res.status(400).json('No hay archivos');
      return;
    }

    try {
  
      const pathCompleto = await subirArchivo(req.files,undefined,'imgs') 
      res.json(pathCompleto)
    } catch (error) {
       res.status(400).json({
         msg:error
       })
    }
}


const actualizarArchivos = async ( req , res=response ) =>{
const { id, coleccion} = req.params 
let modelo;


switch (coleccion) {
  case 'usuarios':
    modelo = await Usuario.findById(id);
    if(!modelo) {
      return res.status(400).json({
        msg:'no existe'
      })
    }
    break;
  case 'productos':
    modelo = await Producto.findById(id);
    if(!modelo) {
      return res.status(400).json({
        msg:'no existe'
      })
    }
      break;
  default:
    return  res.status(500).json({msg:'Se me olvido hacer esto'})
}

if(modelo.picture){
  const pathImagen = path.join(__dirname,'../uploads',coleccion,modelo.picture)
  if(fs.existsSync(pathImagen)){
    fs.unlinkSync(pathImagen)
  }
}


const name = await subirArchivo(req.files,undefined,coleccion) 
modelo.picture=name;

await modelo.save()
res.json(modelo)
}



const actualizarArchivosCloudinary = async ( req , res=response ) =>{
  const { id, coleccion} = req.params 
  let modelo;
  
  
  switch (coleccion) {
    case 'usuarios':
      modelo = await Usuario.findById(id);
      if(!modelo) {
        return res.status(400).json({
          msg:'no existe'
        })
      }
      break;
    case 'productos':
      modelo = await Producto.findById(id);
      if(!modelo) {
        return res.status(400).json({
          msg:'no existe'
        })
      }
        break;
    default:
      return  res.status(500).json({msg:'Se me olvido hacer esto'})
  }
  
  if(modelo.picture){
 const nombreArray = modelo.picture.split('/')
 const nombre = nombreArray[nombreArray.length - 1 ]
 const [public_id] = nombre.split('.')
 cloudinary.uploader.destroy(public_id)

  }





  const {tempFilePath} = req.files.archivo
  const {secure_url} = await cloudinary.uploader.upload(tempFilePath)
   modelo.picture=secure_url;
  
  // await modelo.save()
  res.json(modelo)
  }






const mostrarImagen =  async( req , res =  response) =>{
  const { id, coleccion} = req.params 


let modelo;


switch (coleccion) {
  case 'usuarios':
    modelo = await Usuario.findById(id);
    if(!modelo) {
      return res.status(400).json({
        msg:'no existe'
      })
    }
    break;
  case 'productos':
    modelo = await Producto.findById(id);
    if(!modelo) {
      return res.status(400).json({
        msg:'no existe'
      })
    }
      break;
  default:
    return  res.status(500).json({msg:'Se me olvido hacer esto'})
}

if(modelo.picture){
  const pathImagen = path.join(__dirname,'../uploads',coleccion,modelo.picture)
  if(fs.existsSync(pathImagen)){
     return res.sendFile(pathImagen)
  }
}

const pathNoImage = path.join(__dirname,'../assets/no-image.jpg')

res.json(pathNoImage)
   

}


module.exports= {
    cargarArchivos,
    actualizarArchivos,
    mostrarImagen,
    actualizarArchivosCloudinary
}