const {validationResult} = require('express-validator');


const validarCampo = (req,res,next) => {
    

    const errorFormatter = ({msg}) => {
        // Build your resulting errors however you want! String, object, whatever - it works!
        return `${msg}`;
      };
      const errores = validationResult(req).formatWith(errorFormatter) ;



    if(!errores.isEmpty()){
       return res.status(400).json({
            ok:false,
            msg: errores.array()
    });
}

    next();
}


module.exports = {
    validarCampo
}