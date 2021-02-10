const express = require('express');
const router = express.Router();
const Usuario = require('../models/usuario');
const {getUsuarios, crearUsuarios, getUsuariosPopulate, modificarUsuario, borrarUser, buscarProfesor, buscarUser} = require('../controller/usuarios');
const { paginarUsuarios } = require ('../controller/usuarios');
const { check } = require('express-validator');
const { validarCampo } = require('../middleware/validarCampo');
const { validarJWT } = require('../middleware/validarJWT');

router.get('/', validarJWT , getUsuarios);

router.get('/total', validarJWT, getUsuariosPopulate);

// MODIFICAR USUARIO //

router.put('/:id',[
    validarJWT, 
    check('nombre',' El campo nombre es requerido').not().isEmpty(),
    check('email',' El campo email es requerido').not().isEmpty(),
    validarCampo,
   
], modificarUsuario );

// BUSCAR FILTRANDO POR ROLE //

router.delete('/:id', validarJWT, borrarUser);
router.get('/profesor', validarJWT, buscarProfesor);
router.get('/user', validarJWT, buscarUser);

// PPAGINAR DESDE EL SERVIDOR //

router.get('/paginas', paginarUsuarios);

// AÑADIR USUARIO //

router.post('/',[
    check('nombre',' El campo nombre es requerido').not().isEmpty(),
    check('email',' El campo email es requerido').not().isEmpty(),
    check('password',' El campo password es requerido').not().isEmpty(),
    validarCampo,
],crearUsuarios);

module.exports = router