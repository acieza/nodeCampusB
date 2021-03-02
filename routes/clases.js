const express = require('express');
const router = express.Router();
const Clase = require('../models/clase');
//const {getUsuarios, crearUsuarios} = require('../controller/usuarios');
const { check } = require('express-validator');
const { getClases, crearClases } = require('../controller/clases');
const { validarCampo } = require('../middleware/validarCampo');
const { validarJWT } = require('../middleware/validarJWT');

router.get('/',getClases);

router.post('/',[
    validarJWT,
    check('nombre','El campo nombre es requerido').not().isEmpty(),
    // check('nombreTema','El campo nombreTema es requerido').not().isEmpty(),
    // check('link','El campo link es requerido').not().isEmpty(),
    validarCampo,
],crearClases);

module.exports = router