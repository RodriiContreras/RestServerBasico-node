const express = require('express')
const cors = require('cors');
const { dbConnection } = require('../database/config');
class Server{
  constructor(){
    this.app = express();
    this.port=process.env.PORT;
    this.usuariosPathing= '/api/usuarios'
    this.authPath = '/api/auth'

     this.conexionDB()

    //Middlewares
    this.middlewares();


    //rutas de mi app   
    this.routes()
  }
async conexionDB(){
 await dbConnection()
  }
  middlewares(){
    this.app.use(cors())
    
    this.app.use(express.json())
    
    //middleware que lleva al public
    this.app.use(express.static('public')); 
  }
  routes(){
   this.app.use( this.authPath,require('../routes/auth'));
   this.app.use( this.usuariosPathing,require('../routes/usuarios'));
  }
  listen(){
    this.app.listen(this.port)
    console.log(`Servidor corriendo en : localhost:${this.port}`)
  }

}


module.exports=Server