const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');

const url = 'mongodb://localhost:27017/campus'

const app = express();

mongoose.connect(url, {useNewUrlParser: true})
const conexion = mongoose.connection;

conexion.on('open', ()=>{
    console.log('Conectado a la Base de Datos..');
})

app.use(cors());
//app.use(express.static('public'));
app.use(express.json());

const RouterCurso = require('./routes/cursos');
app.use('/cursos', RouterCurso);
 
app.listen(3000, ()=>{
    console.log('SERVER ON');
})