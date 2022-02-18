const {Router} = require('express');
const { check } = require('express-validator');
const { validarCamposs } = require('../middlewares/validarCampos');
const {cargarArchivos,actualizarArchivos,actualizarArchivosCloudinary,mostrarImagen} = require('../controladores/uploads');
const { coleccionesPermitidas } = require('../helpers/dbValidators');



const router = Router();

router.post('/',[

],cargarArchivos)


router.put('/:coleccion/:id',[
    check('id','El id debe ser aceptado por MongoDB').isMongoId(),
    check('coleccion').custom(c => coleccionesPermitidas (c , ['usuarios','productos'])),
    validarCamposs

],actualizarArchivosCloudinary)

router.get('/:coleccion/:id',[
    check('id','El id debe ser aceptado por MongoDB').isMongoId(),
    check('coleccion').custom(c => coleccionesPermitidas (c , ['usuarios','productos'])),
    validarCamposs
],mostrarImagen)





module.exports= router;