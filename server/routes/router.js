const express = require('express');
const mutler = require('multer');
const fs = require('fs');
const upload = mutler({
    limits: { fieldSize: 5 * 1024 * 1024 }
  });
const router = express.Router();
router.post('/mediaupload',upload.fields([{name:'file',maxCount:1}]),(req,res) =>{
    let data = req.body.file;
    console.log(data.length);
    // fs.writeFile('./public/temp1.png',data,{encoding:"base64"},function(err){
    //     console.log(err);
    // })
    fs.writeFileSync('./public/temp3.mp4',data,{encoding:'base64',flag:'a'});
    if(data){
        res.status(200).send('ok');
    }
    else{
        res.status(404).send('no data in api');
    }
});

module.exports = router;