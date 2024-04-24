const express = require('express');
const router = express.Router();

router.post('/',async (req,res)=>{

    console.log("The frontend Data for getNotSelectedStudents is : ", req.body);

    let studentSem = req.body.sem;
    let studentDept = req.body.dept;
    let studentBatch = req.body.batch;
    let course_id = req.body.course_id;

    

    res.send("Good Work");
})



module.exports = router;