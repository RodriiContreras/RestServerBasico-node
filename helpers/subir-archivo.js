
const {v4 : uuidv4} = require('uuid')
const path = require('path')

const subirArchivo =(archivos , extensionesValidas = ['png','jpg','jpeg','gif'],  carpeta='') =>{

    return new Promise ((resolve,reject)=>{
        const { archivo }= archivos
        const modificarArchivo = archivo.name.split('.')
        const extension = modificarArchivo[modificarArchivo.length - 1 ]
    
         if  ( !extensionesValidas.includes( extension ) ) {
            return reject('Error en la Promise de Subir Archivo')
         }
    
         const nombreTemp = uuidv4() + '.' + extension;
        uploadPath = path.join( __dirname , '../uploads/',carpeta,nombreTemp) 

        archivo.mv(uploadPath, (err)  =>{
          if (err) {
           reject(err)
          }

          resolve(uploadPath)   
    })

    })
}


module.exports={
    subirArchivo
}