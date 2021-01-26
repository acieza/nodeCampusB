const jwt = require('jsonwebtoken');




const validarJWT = (req,res,next)=>{
    //Leer my token//

    const token = req.header('mytoken');

    if(!token) {
        return res.status(401).json({
            ok: false,
            msg:'No tenemos token en la petición'
        });
    }

    try {

        const {_id} = jwt.verify(token, process.env.JWT_SECRET);
        
        next();

    }catch(err){

        return res.status(401).json({
            ok: false,
            msg: 'Token no valido'
        })

    }
}

module.exports = {
    validarJWT
}