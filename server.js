const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
require('dotenv').config();
const swaggerUI = require('swagger-ui-express');


const url = 'mongodb://localhost:27017/campus'

const app = express();

mongoose.connect(url, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useCreateIndex: true,
    useFindAndModify:false
})
const conexion = mongoose.connection;

conexion.on('open', ()=>{
    console.log('Conectado a la Base de Datos..');
})

app.use(cors());
app.use(express.static('public'));
app.use(express.json());

const RouterCurso = require('./routes/cursos');
app.use('/cursos', RouterCurso);

const clasesRouter = require('./routes/clases');
app.use('/clases', clasesRouter);

app.use('/usuarios', require('./routes/usuarios'))

const loginRouter = require('./routes/login');
app.use('/login', loginRouter);

const SubirRouter = require('./routes/subir');
app.use('/subir', SubirRouter);

const swaggerDoc = require('./doc/swagger.json');
app.use('/api-doc', swaggerUI.serve, swaggerUI.setup(swaggerDoc));
 
app.listen(3000, ()=>{
    console.log('SERVER ON');
})