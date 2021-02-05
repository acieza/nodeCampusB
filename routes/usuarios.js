const express = require('express');
const router = express.Router();
const Usuario = require('../models/usuario');
const {getUsuarios, crearUsuarios, getUsuariosPopulate, modificarUsuario} = require('../controller/usuarios');
const { check } = require('express-validator');
const { validarCampo } = require('../middleware/validarCampo');
const { validarJWT } = require('../middleware/validarJWT');

router.get('/', validarJWT , getUsuarios);

router.get('/total', validarJWT, getUsuariosPopulate);

router.put('/:id',[
    validarJWT, 
    check('nombre',' El campo nombre es requerido').not().isEmpty(),
    check('email',' El campo email es requerido').not().isEmpty(),
    validarCampo,
   
], modificarUsuario );
 

router.post('/',[
    check('nombre',' El campo nombre es requerido').not().isEmpty(),
    check('email',' El campo email es requerido').not().isEmpty(),
    check('password',' El campo password es requerido').not().isEmpty(),
    validarCampo,
],crearUsuarios);

module.exports = router