const express = require('express');
const Clase = require('../models/clase');
const {validationResult} = require('express-validator');
const Curso = require('../models/curso');

const getClases = async (req,res)=>{
    try{
        const clase = await Clase.find();
        res.json(clase);
    }catch(err){
        res.send("Error" + err)
    }
}


const crearClases = async ( req,res)=>{
    
    const{nombre} = req.body;

    try{
        
        //Comprobar Titulo//

         const hayClase = await Clase.findOne({nombre});

        if( hayClase ){
            return res.status(400).json({
                ok:false,
                msg:"La clase ya existe"
            });
        }
        //Guardar el Curso//

        const clase = new Clase(req.body)

        await clase.save();

         const valorId = req.params.id;
        // / const valorClase = clase._id;
         const curso = await Curso.findById(valorId);

         curso.clases.push(clase.id);
        await curso.save();
        res.json({
            // valorClase,
            // valorId,
            // ok:true,
            clase
        })
    }catch(err){
        res.status(500).json({
            ok:false,
            msg:("Error de Servidor")
        })
}

}


module.exports = {
    getClases,
    crearClases
}