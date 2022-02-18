const express = require('express')
const cors = require('cors');
const { dbConnection } = require('../database/config');
const fileUpload = require('express-fileupload')

class Server{
  constructor(){
    this.app = express();
    this.port= process.env.PORT;

    this.paths={
      auth:'/api/auth',
      usuariosPathing:'/api/usuarios',
      categorias:'/api/categorias',
      productos:'/api/productos',
      buscar:'/api/buscar',
      uploads:'/api/uploads'
    }
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

    this.app.use(fileUpload({
      useTempFiles : true,
      tempFileDir : '/tmp/',
      createParentPath:true
    }));
  }

  routes(){
   this.app.use( this.paths.auth,              require('../routes/auth'));
   this.app.use( this.paths.categorias,        require('../routes/categorias'));
   this.app.use( this.paths.usuariosPathing,   require('../routes/usuarios'));
   this.app.use( this.paths.productos,         require('../routes/productos'));
   this.app.use( this.paths.buscar,            require('../routes/buscar'));
   this.app.use( this.paths.uploads,         require('../routes/uploads'));
  }

  listen(){
    this.app.listen(this.port)
    console.log(`Servidor corriendo en : localhost:${this.port}`)
  }

}


module.exports=Server