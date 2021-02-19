const express = require('express');
const router = express.Router();
const Usuario = require('../models/usuario');
const {getUsuarios, crearUsuarios, getUsuariosPopulate, modificarUsuario, borrarUser, buscarProfesor, buscarUser, modificarUsuariorole} = require('../controller/usuarios');
const { paginarUsuarios, paginarUsuariosM, getUnUser, cargadeUsuarios, getUsuariosPopulateId, putUsuariosPopulateId } = require ('../controller/usuarios');
const { check } = require('express-validator');
const { validarCampo } = require('../middleware/validarCampo');
const { validarJWT } = require('../middleware/validarJWT');
const multer = require('multer');
const upload = multer({dest: 'public/file/'});


router.get('/', validarJWT , getUsuarios);

router.get('/total', validarJWT, getUsuariosPopulate);

router.get('/total/:id', getUsuariosPopulateId);

// router.put('/total/:id', putUsuariosPopulateId);

router.get('/user/:id', validarJWT, getUnUser);

// MODIFICAR USUARIO //

router.put('/:id',[
    validarJWT, 
    check('nombre',' El campo nombre es requerido').not().isEmpty(),
    check('email',' El campo email es requerido').not().isEmpty(),
   
    validarCampo,
   
], modificarUsuario );

router.patch('/:id',[
    validarJWT, 
    check('nombre',' El campo nombre es requerido').not().isEmpty(),
    check('email',' El campo email es requerido').not().isEmpty(),
   
    validarCampo,
   
], modificarUsuario );
router.put('/user/:id',[
    validarJWT, 
    check('nombre',' El campo nombre es requerido').not().isEmpty(),
    check('email',' El campo email es requerido').not().isEmpty(),
    check('role',' El campo role es requerido').not().isEmpty(),
    validarCampo,
   
], modificarUsuariorole );


// BUSCAR FILTRANDO POR ROLE //

router.delete('/:id', validarJWT, borrarUser);
router.get('/profesor', validarJWT, buscarProfesor);
router.get('/user', validarJWT, buscarUser);

// PPAGINAR DESDE EL SERVIDOR //

router.get('/paginas', paginarUsuarios);

router.get('/paginasM', paginarUsuariosM);



// AÑADIR USUARIO //

router.post('/',[
    check('nombre',' El campo nombre es requerido').not().isEmpty(),
    check('email',' El campo email es requerido').not().isEmpty(),
    check('password',' El campo password es requerido').not().isEmpty(),
    validarCampo,
],crearUsuarios);

//CARGA MASIVA//

router.post('/cargarUsuarios', upload.single('archivo'), cargadeUsuarios)

module.exports = router