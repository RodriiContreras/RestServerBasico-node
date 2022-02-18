const  dbvalidators = require('./dbValidators')
const  googleVerify = require('./googleVerify')
const  jwt = require('./jwt')
const  subirArchivos = require('./subir-archivo')






module.exports = {
    ...dbvalidators,
    ...googleVerify,
    ...jwt,
    ...subirArchivos
}