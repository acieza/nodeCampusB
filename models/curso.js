const mongoose  = require('mongoose');

const cursoSchema = new mongoose.Schema({

    imagen:{
        type:String,
        required: true
    },
    imagen2:{
        type:String,
        required: true,
    },
    titulo:{
        type:String,
        required: true
    },
    titulo2:{
        type:String
    },
    descripcion:{
        type:String,
        required:true,      
    },
    descripcion2:{
        type:String,
        required: true
    },
    descripcionGeneral:{
        type:String
    },
    link:{
        type:String,
        required:true,      
    },
    precio:{
        type:Number,
        required:true
    },
    tiempo:{
        type:Number,
        required:true,      
    }

})

 cursoSchema.method('toJSON', function(){
     const{__v, _id, ...object} = this.toObject();
     object.identificador = _id;
     return object;
 })

module.exports = mongoose.model("Curso", cursoSchema);