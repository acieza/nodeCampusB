const jwt = require('jsonwebtoken');
const router = require('../routes/login');

const generarJWT = ( _id ) =>{
    return new Promise((resolve, reject)=>{
        const payload = {
            _id,
            
        }

        jwt.sign(payload, process.env.JWT_SECRET, {
            expiresIn: '1h'
        },(err, token) =>{
            if(err){
                console.log(err);
                reject('no se puede generar el JWT');
            }else{
                resolve(token);
            }
        });
    });
}

module.exports = {
    generarJWT
}