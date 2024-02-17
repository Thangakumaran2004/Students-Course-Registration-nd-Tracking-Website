const express = require('express');
const router = express.Router();

const {checkStudent} = require('../Controllers/studentLoginPageController');


router.use(express.json());

router.get('/',(req,res)=>{
    res.send("Hi this is studentloginpage api endpoint");
})


router.post('/',async (req,res)=>{
    const {username,password} = req.body;
    console.log(username,password);
    let response = await checkStudent(username,password);
    console.log("The response for checkStudent function is : ", response);

    if(response == "Server Busy"){
        res.status(408).json("Server Busy");
    }else if(response == "student not found"){
        res.status(200).json("invalid user");
    }else{
        if(password == response.password){
            res.status(200).json("valid user with correct password");
        }else{
            res.status(200).json("valid user wrong password");
        }
    }
    
})

module.exports = router;