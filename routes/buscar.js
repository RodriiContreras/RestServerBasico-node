const {Router} = require('express');
const { buscar } = require('../controladores/buscar');

const router = Router();

router.get('/:coleccion/:termino', buscar)
module.exports=router