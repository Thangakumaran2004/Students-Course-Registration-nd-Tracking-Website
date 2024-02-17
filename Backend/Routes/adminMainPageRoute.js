const express = require('express');
const router = express.Router();

router.get('/',async (req,res)=>{
    let getPromise = new Promise((resolve,reject)=>{
        if(true){
            console.log("goodd");
            resolve("good");
        }else{
            reject("bad");
        }
    }).then(ress=>res.json(ress)).catch(err=>res.json(err));
})

router.post('/',(req,res)=>{
    
   let bodyContent = req.body;
   res.json(bodyContent);
    
})


module.exports = router;