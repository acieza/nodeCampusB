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
        const {email} =req.body
        
        const usuario = await Usuario.findById(req.params.id);

        if(usuario.email != req.body.email){
           
      
            const hayEmail = await Usuario.findOne({email});

            if( hayEmail ){
                    return res.status(400).json({
                        ok:false,
                        msg:"El correo ya existe"
                    });
        }
    }
        usuario.email = req.body.email
        usuario.img = req.body.img
        usuario.nombre = req.body.nombre
      

        const usuario1 = await usuario.save();

        res.json({
            ok:true,
            usuario
        })
        //res.json(usuario1);
    }catch (err){
        res.send("Error " + err);
    }
}

const borrarUser = async (req, res)=>{
    try{
        const user = await Usuario.findById(req.params.id)
        const u1 = await user.deleteOne()
        res.json(u1)
    }catch (error){
        res.send('Error')
    }
    }

    const buscarProfesor = async(req,res)=>{
        try{
            const profe = await Usuario.find({role: "profesor"});
            res.json(profe);
        }catch{
            res.send("Error " + err);
        }
    }

    const buscarUser = async(req,res)=>{
        try{
            const user = await Usuario.find({role: "user"});
            res.json(user);
        }catch{
            res.send("Error " + err);
        }
    }

    const paginarUsuarios = async(req, res)=>{
        const page = parseInt(req.query.page)
        const limit = parseInt(req.query.limit)

        const startIndex = (page -1)* limit
        const endIndex = page * limit

        const results = {}
        const numRegistros = await Usuario.countDocuments().exec()

        const paginas = parseFloat(numRegistros/ limit)
        const fin = Math.ceil(paginas)
        araryFin = [];
        for (x=1; x<=fin; x++){
            araryFin.push(x)
        }
    
        results.todo = {
            paginas: araryFin,
            limite: limit
        }

        if(endIndex < await Usuario.countDocuments().exec()){
            results.fin = {
                paginas : page + 1,
                limite : limit 
            }
        }

        if(startIndex > 0){
            results.inicio = {
                paginas : page - 1,
                limite : limit 
            }
        }

        try{
            results.result = await Usuario.find().limit(limit).skip(startIndex).exec()

            res.json({
                ok:true,
                msg: '**** Lista de Usuarios devueltos ****',
                nDocumentos: numRegistros,
                results
            })
        }catch (err){
            res.status(500).json({
                ok:false,
                msg: 'error de servidor'
            })
        }
    }


module.exports = {
    getUsuarios,
    crearUsuarios,
    getUsuariosPopulate,
    modificarUsuario,
    borrarUser,
    buscarProfesor,
    buscarUser,
    paginarUsuarios
}