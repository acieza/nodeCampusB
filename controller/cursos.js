const express = require('express');
const Curso = require('../models/curso');
const {validationResult} = require('express-validator');
const clase = require('../models/clase');

const getCursos = async (req,res)=>{
    try{
        const curso = await Curso.find();
        res.json(curso);
    }catch(err){
        res.send("Error" + err)
    }
}

const crearCursos = async(req,res)=>{

      const{titulo} = req.body;

    try{
        
        //Comprobar Titulo//

         const hayCurso = await Curso.findOne({titulo});

        if( hayCurso ){
            return res.status(400).json({
                ok:false,
                msg:"El curso ya existe"
            });
        }

        //Guardar el Curso//

        const curso = new Curso(req.body)

        await curso.save();

        res.json({
            ok:true,
            curso
        })
    }catch(err){
        res.status(500).json({
            ok:false,
            msg:("Error de Servidor")
        })
}

}

const getCursosPopulate = async (req,res)=>{
    try{
        const curso = await Curso.find()
        .select("_id titulo descripcion")
        .populate("clases","nombre temas.nombreTema temas.link temas.detalle" )
        .exec()
        .then()
        res.json(curso);
    }catch(err){
        res.send("Error" + err)
    }
}




module.exports = {
    getCursos,
    crearCursos,
    getCursosPopulate
}