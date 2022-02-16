const {Router} = require('express');
const { check } = require('express-validator');
const { validarCamposs } = require('../middlewares/validarCampos');
const {login,googleSign} = require('../controladores/auth');

const router = Router();

router.post('/login',[
    check('email','El E-Mail es obligatorio').isEmail(),
    check('password','La Contraseña es obligatoria').not().isEmpty(),
    validarCamposs
],login)



router.post('/google',[
    check('id_token','El Token de Google es obligatorio').not().isEmpty(),
    validarCamposs
],googleSign)





module.exports= router;