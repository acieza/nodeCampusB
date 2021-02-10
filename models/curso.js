const mongoose  = require('mongoose');

const cursoSchema = new mongoose.Schema({

    imagen:{
        type:String,
        
    },
    imagen2:{
        type:String,
       
    },
    titulo:{
        type:String,
        required: true,
        unique:true
    },
    titulo2:{
        type:String
    },
    descripcion:{
        type:String,
        required:true,      
    },
    descripcionGeneral:{
        type:String
    },
    link:{
        type:String,
    },
    precio:{
        type:Number,
        required:true
    },
    tiempo:{
        type:Number,
        required:true,      
    },
    oferta:{
        type:Boolean,
        default:false
    },
    clases: [{ 
        type: mongoose.Schema.Types.ObjectId,
        ref: "Clase"
    }]

})

//  cursoSchema.method('toJSON', function(){
//      const{__v, _id, ...object} = this.toObject();
//      object.identificador = _id;
//      return object;
//  })

module.exports = mongoose.model("Curso", cursoSchema);