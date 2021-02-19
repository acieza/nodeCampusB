const Usuario = require('../models/usuario');
const bcrypt = require('bcryptjs');
const {validationResult} = require('express-validator');
const emailer = require('../helpers/emailer');
const fs = require('fs');
const csv = require('csv-parser');
const { pipeline } = require('stream');

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
  
//     const errores = validationResult(req) ;
//     if(!errores.isEmpty()){
//        return res.status(500).json({
//             ok:false,
//             error: errores.mapped()
//     });
// }
    
  
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
        //enviar correo de confirmación//

        emailer.sendMail(usuario);

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

const getUsuariosPopulateId = async (req,res)=>{
    try{
        const usuario = await Usuario.findById(req.params.id)
        .select("nombre email role img")
        .populate("cursos","titulo titulo2 descripcion" )
        .exec()
        .then()
        res.json(usuario);
    }catch(err){
        res.send("Error" + err)
    }
}

const getUnUser = async (req, res) =>{
    try{
        const user = await Usuario.findById(req.params.id);
        res.json(user);
    }catch(err){
        res.send("Error" + err)
    }
}

const putUsuariosPopulateId = async(req,res) =>{
    try{
        const {email} =req.body
        
        const usuario = await Usuario.findById(req.params.id);
 
        usuario.role = req.body.role
        usuario.cursos = req.body.cursos._id

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
    if(req.body.img){
        usuario.img = req.body.img
    }
        usuario.email = req.body.email       
        usuario.nombre = req.body.nombre
        //usuario.role = req.body.role
      

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

const modificarUsuariorole = async(req,res) =>{
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
        usuario.nombre = req.body.nombre
        usuario.role = req.body.role
        usuario.cursos= req.body.cursos
      

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
    /*************************PAGINAR USUARIOS MOVIL******************************/

    const paginarUsuariosM = async(req, res)=>{
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
            res.json(await Usuario.find().limit(limit).skip(startIndex).exec());
        }catch (err){
            res.status(500).json({
                ok:false,
                msg: 'error de servidor'
            })
        }
    }

    //CARGA MASIVA//

    const cargadeUsuarios = async (req,res) =>{
        try{
            var contador = 0;
            const result = [];
            console.log(req.file);
            //CONVERTIR EL ARCHIVO A CSV COMO ERA ORIGINALMENTE//
            fs.renameSync(req.file.path, req.file.path + '.' + req.file.mimetype.split('/')[1]);
            
            //RUTA PARA PODER ACCEDER A LOS FICHEROS//
            var nombreArchivo = "public/file/" + req.file.filename + "." + req.file.mimetype.split('/')[1];

            console.log(nombreArchivo);
            //LEER ARCHIVO//
            fs.createReadStream(nombreArchivo)
                .pipe(csv({separator: ","}))
                .on("data", (data) =>result.push(data))
                .on("end", ()=>{
                    console.log(result);
                    //GUARDAR EN LA BASE DE DATOS//
                    result.map(async (user) => {

                        //Comprobar Email//
                        const email = user.email;

                        const hayEmail = await Usuario.findOne({ email });

                        if (!hayEmail) {
                            var usuario = new Usuario();
                            usuario.nombre = user.nombre;
                            usuario.email = user.email;
                            //Encriptar Contraseña de Usuario//
                            const salt = bcrypt.genSaltSync();
                            usuario.password = bcrypt.hashSync(user.password, salt);
                            usuario.role = user.role;
                            usuario.save();
                            contador++;
                        }

                    })
                })

            res.json({
                ok: true,
                msg:`${contador} Archivos subidos correctamente`
            })
        }catch(err){
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
    paginarUsuarios,
    paginarUsuariosM,
    modificarUsuariorole,
    getUnUser,
    cargadeUsuarios,
    getUsuariosPopulateId,
    putUsuariosPopulateId
}