const express = require('express');
const { resolve } = require('path');

const router = express.Router();

router.use(express.json());


router.post('/',async (req,res)=>{
    return new Promise((resolve,reject)=>{
        console.log(req.body);
        resolve(req.body);
    }).then(ress=>res.json(ress));
});


module.exports = router;