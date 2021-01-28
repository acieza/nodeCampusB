const mongoose  = require('mongoose');

const usuarioSchema = new mongoose.Schema({

    nombre:{
        type:String,
        required: true
    },
    email:{
        type:String,
        required: true,
        unique: true
    },
    password:{
        type:String,
        required: true
    },
    img:{
        type:String
    },
    role:{
        type:String,
        
        default: "user"
    }

})

 usuarioSchema.method('toJSON', function(){
     const{__v, password, _id, ...object} = this.toObject();
    
    return object;
 })

module.exports = mongoose.model("Usuario", usuarioSchema);