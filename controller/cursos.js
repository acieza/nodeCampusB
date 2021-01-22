const express = require('express');
const Curso = require('../models/curso');
const {validationResult} = require('express-validator');

const getCursos = async (req,res)=>{
    try{
        const curso = await Curso.find();
        res.json(curso);
    }catch(err){
        res.send("Error" + err)
    }
}

const crearCursos = async(req,res)=>{

//     // const{email, password} = req.body;
  
 const errores = validationResult(req) ;
    if(!errores.isEmpty()){
       return res.status(500).json({
            ok:false,
            error: errores.mapped()
    });
}
    
  
    try{
        
        //Comprobar Email//

        // const hayEmail = await Usuario.findOne({email});

        // if( hayEmail ){
        //     return res.status(400).json({
        //         ok:false,
        //         msg:"El correo ya existe"
        //     });
        // }

        //Guardar el Usuario//

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

module.exports = {
    getCursos,
    crearCursos,
}