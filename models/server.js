const express = require('express')
const cors = require('cors')
class Server{
  constructor(){
    this.app = express();
    this.port=process.env.PORT;
    this.usuariosPathing= '/api/usuarios'


    //Middlewares
    this.middlewares();


    //rutas de mi app   
    this.routes()
  }
  middlewares(){
    this.app.use(cors())
    
    this.app.use(express.json())
    
    //middleware que lleva al public
    this.app.use(express.static('public'));
  }
  routes(){
   this.app.use( this.usuariosPathing,require('../routes/usuarios'));
  }
  listen(){
    this.app.listen(this.port)
  }

}


module.exports=Server