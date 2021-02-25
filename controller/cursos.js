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
const leerUser = async(req,res)=>{
    try{
        const curso = await Curso.findById(req.params.id);
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

const getCursosPopulateId = async (req, res) => {
    
    try{
         const curso = await Curso.findById(req.params.id)
        .select("_id titulo descripcion")
        .populate("clases", "nombre temas.nombreTema temas.link temas.detalle")
        .exec()
        .then()
    res.json(curso);
    }catch(err){
        res.send("Error" + err)
    }
}

const borrarCurso = async (req, res)=>{
    try{
        const curso = await Curso.findById(req.params.id)
        const c1 = await curso.deleteOne()
        res.json(c1)
    }catch (error){
        res.send('Error')
    }
    }

    const modificarCurso = async(req,res) =>{
        try{
            const {titulo} =req.body
            
            const curso = await Curso.findById(req.params.id);
    
            if(curso.titulo != req.body.titulo){
               
          
                 const haytitulo = await Curso.findOne({titulo});
    
                if( haytitulo ){
                        return res.status(400).json({
                            ok:false,
                            msg:"El titulo ya existe"
                        });
            }
        }
            curso.titulo = req.body.titulo
            curso.titulo2 = req.body.titulo2
            curso.imagen = req.body.imagen
            curso.imagen2 = req.body.imagen2
            curso.descripcion = req.body.descripcion
            curso.descripcionGeneral = req.body.descripcionGeneral
            curso.precio = req.body.precio
            curso.tiempo = req.body.tiempo
            curso.oferta = req.body.oferta
    
            const curso1 = await curso.save();
    
            res.json({
                ok:true,
                curso
            })
            //res.json(usuario1);
        }catch (err){
            res.send("Error " + err);
        }
    }

    




module.exports = {
    getCursos,
    crearCursos,
    getCursosPopulate,
    borrarCurso,
    modificarCurso,
    leerUser,
    getCursosPopulateId
}