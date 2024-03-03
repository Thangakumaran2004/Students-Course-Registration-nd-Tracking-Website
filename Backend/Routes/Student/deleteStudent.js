const express = require('express');
const router = express.Router();
const {deleteStudentFromDB} = require('../../Controllers/Student/deleteStudentController');

router.use(express.json());

router.post('/',async(req,res)=>{
    console.log("The frontend data is: ",req.body);
    const {studentRegno,studentName,studentDept} = req.body;
    //console.group("The facultyid and facultydept is",facultyId,facultyDept)
    const deleteStatus = await deleteStudentFromDB(studentRegno,studentName,studentDept);
    //console.log("Result of delete faculty controller function is,",deleteStatus);
    if(deleteStatus == 'Server Busy'){
        let result = {
            deleteStudentStatus : "Server Busy"
        }
        res.json(result);
    }else{
        let result = {
            deleteStudentStatus : "Successfully deleted student from database"
        }
        res.json(result);
    }
})


module.exports = router;