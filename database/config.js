const mongoose = require('mongoose')




const dbConnection = async () =>{
    try {
         await mongoose.connect(process.env.MONGODB_ATLAS,{
             useNewUrlParser:true,
             useUnifiedTopology:true,
            //  useCreateIndex:true,
            //  useFindAndModify:false
         })
     console.log('Db Conectada')
        }

    catch (error) {
        console.log(error)
    }
}


module.exports={
    dbConnection
}