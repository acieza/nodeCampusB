const express = require('express');
const router = express();

const {login, renewToken} = require('../controller/login');
const {check} = require('express-validator');
const {validarCampo} = require('../middleware/validarCampo');
const { validarJWT } = require('../middleware/validarJWT');

router.post('/',[
    check('email',' El campo email es requerido').not().isEmpty(),
    check('password',' El campo password es requerido').not().isEmpty(),
   validarCampo,
],login);

router.get('/renew',
validarJWT,
renewToken
)

module.exports = router