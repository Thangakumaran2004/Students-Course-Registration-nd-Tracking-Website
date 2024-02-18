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
    let result;

    if(response == "Server Busy"){
        result = {
            status: "Server Busy"
        }
        res.status(408).json(result);
    }else if(response == "student not found"){
        result = {
            status: "Student not found invalid user"
        }
        res.status(200).json(result);
    }else{
        if(password == response.password){
            result = {
                status: "valid user correct password",
                regno: response.regno,
                dept: response.dept
            }
            res.status(200).json(result);
        }else{
            result = {
                status: "valid user incorrect password",
                regno: response.regno,
                dept: response.dept
            }
            res.status(200).json(result);
        }
    }
    
})

module.exports = router;