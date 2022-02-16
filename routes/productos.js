const {Router} = require('express');
const { check } = require('express-validator');
const { validarCamposs } = require('../middlewares/validarCampos');
const {validarJWT} = require('../middlewares/validar-JWT')
const {crearProducto,obtenerProductos,obtenerProductoId,actualizarProducto,borrarProducto} = require('../controladores/productos')
const {existeCategoriaId} = require('../helpers/dbValidators')


const router = Router();

router.get('/',[],obtenerProductos)




router.get('/:id',[
      check('id', 'No es un ID aceptado por MongoDB').isMongoId(),
      check('id').custom(existeCategoriaId),
     validarCamposs
],obtenerProductoId)



router.post('/',[
     validarJWT,
     check('name','El nombre es obligatorio').not().isEmpty(),
     check('categoria','La categoria no es aceptada por Mongo').isMongoId(),
     check('categoria').custom(existeCategoriaId),
     validarCamposs

     ] ,crearProducto)




router.put('/:id', [
     validarJWT,
     check('categoria','La categoria no es aceptada por Mongo').isMongoId(),
     check('id').custom(existeCategoriaId),
],actualizarProducto)



router.delete('/:id',[
     validarJWT,
     check('id', 'No es un ID aceptado por MongoDB').isMongoId(),
     check('id').custom(existeCategoriaId),
     validarCamposs
     
]
,borrarProducto)

module.exports= router;