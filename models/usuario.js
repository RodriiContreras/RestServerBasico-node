const {Schema,model} = require('mongoose')


const UsuarioSchema = Schema({
   name:{
       type:String,
       required:[true,'El nombre es Obligatorio'],
   },  
   email:{
    type:String,
    required:[true,'El Email es Obligatorio'],
    unique:true
    },
    password:{
        type:String,
        required:[true,'La contraseña es Obligatoria'],
    },
    img:{
        type:String,
    },
    role:{
        type:String,
        required:true,
        enum:['ADMIN_ROLE' , 'USER_ROLE']
    },
    state:{
        type:Boolean,
        default:true
    },
    google:{
        type:Boolean,
        default:false
    }
})


module.exports = model('Usuario',UsuarioSchema);