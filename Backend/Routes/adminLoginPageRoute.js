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
        let result = {
            status: "Server busy"
        }
        res.status(200).json(result);
    }else if(response == "username not found"){
        let result = {
            status: "username not found invalid user"
        }
        res.status(200).json(result);
    }else{
        if(response.password == password){
            let result = {
                dept: response.dept,
                status: "valid user correct password"
            }
            res.status(200).json(result);
        }else{
            let result = {
                dept : response.dept,
                status: "valid user incorrect password"
            }
            res.status(200).json(result);
        }
    }
})


module.exports = router;