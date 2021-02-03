const Usuario = require('../models/usuario');
const bcrypt = require('bcryptjs');
const {validationResult} = require('express-validator');

const getUsuarios = async (req,res)=>{
    try{
        const usuario = await Usuario.find();
        res.json(usuario);
    }catch(err){
        res.send("Error" + err)
    }
}

const crearUsuarios = async(req,res)=>{

    const{email, password} = req.body;
  
    const errores = validationResult(req) ;
    if(!errores.isEmpty()){
       return res.status(500).json({
            ok:false,
            error: errores.mapped()
    });
}
    
  
    try{
        
        //Comprobar Email//

        const hayEmail = await Usuario.findOne({email});

        if( hayEmail ){
            return res.status(400).json({
                ok:false,
                msg:"El correo ya existe"
            });
        }

        //Guardar el Usuario//

        const usuario = new Usuario(req.body)

        //Encriptar Contraseña de Usuario//

        const salt = bcrypt.genSaltSync();

        usuario.password = bcrypt.hashSync(password,salt);

        await usuario.save();

        res.json({
            ok:true,
            usuario
        })
    }catch(err){
        res.status(500).json({
            ok:false,
            msg:("Error de Servidor")
        })
}

}


const getUsuariosPopulate = async (req,res)=>{
    try{
        const usuario = await Usuario.find()
        .select("_id nombre email role")
        .populate("cursos","titulo titulo2 descripcion" )
        .exec()
        .then()
        res.json(usuario);
    }catch(err){
        res.send("Error" + err)
    }
}

const modificarUsuario = async(req,res) =>{
    try{
        // const hayEmail = await Usuario.findOne({email});

        // if( hayEmail ){
        //     return res.status(400).json({
        //         ok:false,
        //         msg:"El correo ya existe"
        //     });
        
        const usuario = await Usuario.findById(req.params.id);
        usuario.img = req.body.img
        usuario.nombre = req.body.nombre
        usuario.email = req.body.email
      

        const usuario1 = await usuario.save();

        res.json({
            ok:true,
            usuario
        })
        res.json(usuario1);
    }catch{
        res.send("Error " + err);
    }
}

module.exports = {
    getUsuarios,
    crearUsuarios,
    getUsuariosPopulate,
    modificarUsuario
}