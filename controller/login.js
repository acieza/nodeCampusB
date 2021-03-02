const Usuario = require('../models/usuario');
const bcrypt = require('bcryptjs');
const {generarJWT} =  require('../helpers/jwt');


const login = async (req,res) => {
    const {email,password} = req.body;

    try{
                                                //Comprobar Email//

         const usuarioLogin = await Usuario.findOne({email});

         if( !usuarioLogin ){
             return res.status(400).json({
                 ok:false,
                 msg:["Correo o Contraseña Incorrectos"]
             });
         }

                                            //Verificar contraseña//

         const validarPassword = bcrypt.compareSync(password,usuarioLogin.password);

         if(!validarPassword){
             return res.status(500).json({
                 ok:false,
                 msg:["Correo o Contraseña Incorrectos"]
             });
         }


                                                //Generar TOKEN//

         const token = await generarJWT(usuarioLogin._id, usuarioLogin.role, usuarioLogin.nombre, usuarioLogin.img, usuarioLogin.cursos);


         res.json({
             ok:true,
             usuarioLogin,
             msg:["Usuario Validado correctamente"],
             token
         })
    }catch(error){
        res.status(500).json({
            ok:false,
            msg:["Error de Servicio técnico"]
    });
 }

                                                
}
                                                //RENOVAR TOKEN //

 const renewToken = async(req,res) =>{

    const id = req._id;


   

    //CARGAR VALORES DE USUARIO//

    const usuario = await Usuario.findById(id)

     //GENERA TOKEN//

     const token = await generarJWT(usuario.id, usuario.role, usuario.nombre, usuario.img, usuario.cursos);
    //const usuarioLogin = await Usuario.findOne({email});
    res.json({
        ok:true,
        usuario,
        token,
       
    })
 }


module.exports = {
    login,
    renewToken
}
