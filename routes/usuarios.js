const {Router} = require('express');
const { check } = require('express-validator');
const {validarCamposs} = require('../middlewares/validarCampos')
const { usuariosGet, usuariosPut, usuariosPost, usuariosDelete } = require('../controladores/usuarios');
const { roleValido,emailExiste,usuarioIdExiste} = require('../helpers/dbValidators');
const { validarJWT } = require('../middlewares/validar-JWT');
const { validarRol } = require('../middlewares/validar-Rol');


const router = Router();


router.get('/',usuariosGet)

  router.put('/:id',[
    check('id','No es un ID valido').isMongoId(),
    check('id').custom(usuarioIdExiste),
    validarCamposs
  ],usuariosPut)

router.post('/',[
  check('email','El E-Mail no es valido').isEmail(),
  check('email').custom(emailExiste),
  check('name','El Nombre es obligatorio').not().isEmpty(),
  check('password','La Contraseña debe contener almenos 6 caracteres').isLength({min:6}),
  // check('role','No es un Rol Valido').isIn(['ADMIN_ROLE','USER_ROLE']),
  check('role').custom(roleValido),
  validarCamposs
],usuariosPost)
  
router.delete('/:id',[
   validarJWT,
   validarRol,
   check('id','No es un ID valido').isMongoId(),
   check('id').custom(usuarioIdExiste),
  validarCamposs
],usuariosDelete)





module.exports=router;