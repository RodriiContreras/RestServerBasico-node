const {Router} = require('express');
const { check } = require('express-validator');
const {login} = require('../controladores/auth');
const { validarCamposs } = require('../middlewares/validarCampos');

const router = Router();

router.post('/login',[
    check('email','El E-Mail es obligatorio').isEmail(),
    check('password','La Contraseña es obligatoria').not().isEmpty(),
    validarCamposs
],login)






module.exports= router;