const {Schema,model} = require('mongoose')


const CategoriaSchema = Schema({
   name:{
       type:String,
       required:[true,'El nombre es Obligatorio'],
       unique:true
   },  
    state:{
        type:Boolean,
        default:true,
        required:true
    },
    usuario:{
        type:Schema.Types.ObjectId,
        ref:'Usuario',
        required:true
    }
})

CategoriaSchema.methods.toJSON = function(){
    const {__v,state,...user} = this.toObject();
     user.uid=_id;
    return user
}


module.exports = model('Categoria',CategoriaSchema);