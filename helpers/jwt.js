 const jwt = require('jsonwebtoken');


 
 const generarJWT= (uid='', nombre='') =>{
    return new Promise((resolve,reject )=>{
     const payload = {uid,nombre}

     jwt.sign(payload,process.env.SecretKey,{
   
        expiresIn:'24h'

     },(err,token ) =>{

         if(err){
             console.log(err)
           reject('No se pudo completar la operacion')       
            }

            else{
                resolve(token)
            }

     })
    })
 }


 module.exports={
     generarJWT
 }