const express = require('express');
const router = express.Router();

const {addStudentToDB,changeDOBFormat} = require('../../Controllers/Student/addNewStudentController');

router.use(express.json());


router.post('/', async (req,res)=>{
    let {studentRegno,studentDept,studentName,studentSem,studentYear,studentRegulation,studentDOB,studentBatch} = req.body;

    studentDOB = await changeDOBFormat(studentDOB);

    const addStatus = await addStudentToDB(studentRegno,studentDept,studentName,studentSem,studentYear,studentRegulation,studentDOB,studentBatch);
    console.log("The Result of add Student controller function is,",addStatus);
    if(addStatus == 'Successfully added student to db'){
        let result = {
            studentAddStatus : "Successfully added student to db"
        }
        res.status(200).json(result);
    }else{
        let result = {
            studentAddStatus : "Server Busy"
        }
        res.json(result);
    }
});

module.exports = router;


