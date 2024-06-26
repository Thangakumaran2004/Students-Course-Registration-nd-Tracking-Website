const express = require('express');
const router = express.Router();

const {checkStudent} = require('../../Controllers/Student/loginPageController');


router.use(express.json());
router.use(express.urlencoded({extended:true}));

/*router.get('/',(req,res)=>{
    res.send("Hi this is studentloginpage api endpoint");
})*/


router.post('/',async (req,res)=>{

    // Getting student's username and password from frontend..
    const {username,password} = req.body;
    //console.log("The Student name and password received from frontend of student login page is : ",username,password);

    // This function checks if student username is valid, passwords matching are not and all kinda stuffs..
    let response = await checkStudent(username,password);
    //console.log("The response for checkStudent function of student login page is : ", response);
    let result;

    if(response == "Server Busy"){
        result = {
            studentStatus: "Server Busy"
        }
        res.status(408).json(result);
    }else if(response == "student not found"){
        result = {
            studentStatus: "Student not found invalid user"
        }
        res.status(200).json(result);
    }else{
        if(password == response.password){
            result = {
                studentStatus: "valid user correct password",
                regno: response.regno,
                dept: response.dept,
                name: response.name,
                year: response.year,
                sem: response.sem,
                batch: response.batch,
                totalCredits: response.totalCredits,
                mainCourseCredits: response.mainCourseCredits,
                programElectiveCredits: response.programElectiveCredits,
                openElectiveCredits: response.openElectiveCredits
            }
            res.status(200).json(result);
        }else{
            result = {
                studentStatus: "valid user incorrect password",
                regno: response.regno,
                dept: response.dept
            }
            res.status(200).json(result);
        }
    }
    
})

module.exports = router;