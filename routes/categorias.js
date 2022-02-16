const {Router} = require('express');
const { check } = require('express-validator');
const { validarCamposs } = require('../middlewares/validarCampos');
const {validarJWT} = require('../middlewares/validar-JWT')
const {crearCategoria,obtenerCategorias,obtenerCategoriaId,actualizarCategoria,borrarCategoria} = require('../controladores/categorias')
const {existeCategoriaId} = require('../helpers/dbValidators')


const router = Router();

router.get('/',[],obtenerCategorias)



router.get('/:id',[
      check('id', 'No es un ID aceptado por MongoDB').isMongoId(),
      check('id').custom(existeCategoriaId),
     validarCamposs
],obtenerCategoriaId)


router.post('/',[
     validarJWT
     ,check('name','El nombre es obligatorio').not().isEmpty(),
     validarCamposs
     ] ,crearCategoria)

router.put('/:id', [
     validarJWT,
     check('name','El nombre es obligatorio').not().isEmpty(),
     check('id').custom(existeCategoriaId)
],actualizarCategoria)

router.delete('/:id',[
     validarJWT,
     check('id', 'No es un ID aceptado por MongoDB').isMongoId(),
     check('id').custom(existeCategoriaId),
     validarCamposs
     
]
,borrarCategoria)

module.exports= router;