const express = require('express');
const router = express.Router();
const multer = require('multer');
const upload = multer({dest:'public/img'});
const uploadCurso = multer({dest:'public/imgCurso'});

const fs = require('fs');
const { send } = require('process');

router.post('/', upload.single('imagen'), async (req,res)=>{
    console.log(req.file);

    try{
    fs.renameSync(req.file.path, req.file.path + '.' + req.file.mimetype.split('/')[1]);
    
   
    res.json({
        ok:true,
        msg:"Imagen subida con éxito",
        nombreImg: req.file.filename + '.' + req.file.mimetype.split('/')[1]
})
    }catch(err){
        res.status(500).json({
            ok:false,
            msg:("Error de Servidor")
        })
    }
})

router.post('/imgCurso', uploadCurso.single('imagen'), async (req,res)=>{
    console.log(req.file);

    try{
    fs.renameSync(req.file.path, req.file.path + '.' + req.file.mimetype.split('/')[1]);
    
   
    res.json({
        ok:true,
        msg:"Imagen subida con éxito",
        nombreImg: req.file.filename + '.' + req.file.mimetype.split('/')[1]
})
    }catch(err){
        res.status(500).json({
            ok:false,
            msg:("Error de Servidor")
        })
    }
})



router.post('/multi', [upload.array('imagenes', 2)], async (req,res)=>{

    try{
    console.log(req.files);
    console.log(req.files.length);

    for(i = 0; i < req.files.length; i++){
        fs.renameSync(req.files[i].path, req.files[i].path + '.' + req.files[i].mimetype.split('/')[1]);
    }

    res.send('Imagenes Subidas');

    } catch (err){

        res.send('El Error es ' + err );
    }
});

module.exports = router;