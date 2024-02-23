const express = require('express');
const router = express.Router();
const {deleteFacultyFromDB} = require('../Controllers/deleteFacultyController');

router.use(express.json());

router.post('/',async(req,res)=>{
    console.log("The frontend data is: ",req.body);
    const {facultyId,facultyDept} = req.body;
    //console.group("The facultyid and facultydept is",facultyId,facultyDept)
    const deleteStatus = await deleteFacultyFromDB(facultyId,facultyDept);
    //console.log("Result of delete faculty controller function is,",deleteStatus);
    if(deleteStatus == 'Server Busy'){
        let result = {
            deleteFacultyStatus : "Server Busy"
        }
        res.json(result);
    }else{
        let result = {
            deleteFacultyStatus : "Successfully deleted faculty from database"
        }
        res.json(result);
    }
})


module.exports = router;