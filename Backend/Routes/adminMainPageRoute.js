const express = require('express');
const router = express.Router();
const cors =require('cors');

router.use(express.json());



router.get('/',async (req,res)=>{
    let getPromise = new Promise((resolve,reject)=>{
        if(true){
            console.log("goodd");
            resolve("good");
        }else{
            reject("bad");
        }
    }).then(ress=>res.json(ress)).catch(err=>res.json(err));
});

router.post('/',async (req,res)=>{
    console.log("Formdata is",req.body);



    res.send("okay");
});

module.exports = router;