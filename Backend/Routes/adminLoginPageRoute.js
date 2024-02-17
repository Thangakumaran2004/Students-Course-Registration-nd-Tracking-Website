const express = require('express');
const router = express.Router();

const {checkAdmin} = require('../Controllers/adminLoginPageController');

router.use(express.json());

router.get('/',(req,res)=>{
    res.send("Hi this is adminloginpage api endpoint");
})

router.post('/',async (req,res)=>{
    const {username,password} = req.body;

    let response = await checkAdmin(username);

    if(response == "Server busy"){
        res.status(200).json("Server busy");
    }else if(response == "username not found"){
        res.status(200).json("invalid user");
    }else{
        if(response.password == password){
            res.status(200).json("valid user correct password");
        }else{
            res.status(200).json("valid user incorrect password");
        }
    }
})


module.exports = router;