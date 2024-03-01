const express = require('express');
const router = express.Router();
const {addDataToDB} = require('../Controllers/adminAllotFacultyController');

router.use(express.json());

router.post('/',async (req,res)=>{
    const frontendData = req.body;
    console.log("The frontend data is",frontendData);
    const deptSemBatchDetails = JSON.parse(frontendData.deptSemBatch);
    const {dept,year,semester,batch} = deptSemBatchDetails;
    console.log("the destructured deptSemBatch details is,",dept,year,semester,batch);
    const response = await addDataToDB(frontendData,dept,semester,batch);
    if(response=="Server Busy"){
        let result = {
            addAllotedFacultiesToDBStatus : "Server Busy"
        }
    }else{
        let result = {
            addAllotedFacultiesToDBStatus : "Successfully added allotted faculties to database"
        }
        res.json(result);
    }

});

module.exports = router;