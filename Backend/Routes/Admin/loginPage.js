const express = require('express');
const router = express.Router();

const {checkAdmin} = require('../../Controllers/Admin/loginPageController');

router.use(express.json());

router.get('/',(req,res)=>{
    res.send("Hi this is adminloginpage api endpoint");
})

router.post('/',async (req,res)=>{
    const {username,password} = req.body;

    let response = await checkAdmin(username);
    console.log("The response for admin login is :",response );

    if(response == "Server busy"){
        let result = {
            adminStatus: "Server busy"
        }
        res.status(200).json(result);
    }else if(response == "username not found"){
        let result = {
            adminStatus: "username not found invalid user"
        }
        res.status(200).json(result);
    }else{
        if(response.password == password){
            let result = {
                adminDept: response.dept,
                adminStatus: "valid user correct password"
            }
            console.log("The admin details are ",result);
            res.status(200).json(result);
        }else{
            let result = {
                adminDept : response.dept,
                adminStatus: "valid user incorrect password"
            }
            res.status(200).json(result);
        }
    }
})

module.exports = router;