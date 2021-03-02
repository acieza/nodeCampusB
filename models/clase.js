
const mongoose  = require('mongoose');

const claseSchema = new mongoose.Schema({

 

    nombre: {
        type: String,
        required:true
    },       
    temas: [{
        nombreTema: {
            type: String,
            required:true
        },       
        link:{
            type: String,
            required:true
        },
        detalle:{
            type: String
        }
    }]
    
    


});

module.exports = mongoose.model("Clase", claseSchema);