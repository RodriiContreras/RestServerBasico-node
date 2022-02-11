const validaCamposs = require('../middlewares/validarCampos')
const validaJWT  = require('../middlewares/validar-JWT');
const validaRoles = require('../middlewares/validar-Rol');



module.exports={
...validaCamposs,
...validaJWT,
...validaRoles
}