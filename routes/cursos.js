  
const express = require('express');
const router = express.Router();
const Curso = require('../models/curso');
//const {getUsuarios, crearUsuarios} = require('../controller/usuarios');
const { check } = require('express-validator');
const { getCursos, crearCursos, getCursosPopulate, borrarCurso, modificarCurso, leerUser, getCursosPopulateId } = require('../controller/cursos');
const { validarCampo } = require('../middleware/validarCampo');
const { validarJWT } = require('../middleware/validarJWT');

router.get('/',[],getCursos);

router.get('/total', getCursosPopulate);

router.get('/total/:id', getCursosPopulateId);

router.get('/:id', validarJWT, leerUser)
router.delete('/:id', validarJWT, borrarCurso);

router.put('/:id',[
    validarJWT, 
    check('titulo',' El campo titulo es requerido').not().isEmpty(),
    check('titulo2',' El campo titulo2 es requerido').not().isEmpty(),
    check('imagen',' El campo imagen es requerido').not().isEmpty(),
    check('imagen2',' El campo imagen2 es requerido').not().isEmpty(),
    check('descripcion',' El campo descripcion es requerido').not().isEmpty(),
    check('descripcionGeneral',' El campo descripcionGeneral es requerido').not().isEmpty(),
    check('precio',' El campo precio es requerido').not().isEmpty(),
    check('tiempo',' El campo tiempo es requerido').not().isEmpty(),
    validarCampo,   
], modificarCurso );

router.post('/',[
    validarJWT,
    check('titulo',' El campo titulo es requerido').not().isEmpty(),
    check('titulo2',' El campo titulo2 es requerido').not().isEmpty(),
    check('descripcion',' El campo descripcion es requerido').not().isEmpty(),
    check('descripcionGeneral',' El campo descripcionGeneral es requerido').not().isEmpty(),
    check('precio',' El campo precio es requerido').not().isEmpty(),
    check('tiempo',' El campo tiempo es requerido').not().isEmpty(),
    check('imagen',' El campo imagen es requerido').not().isEmpty(),
    check('imagen2',' El campo imagen2 es requerido').not().isEmpty(),
    validarCampo,
],crearCursos);

module.exports = router