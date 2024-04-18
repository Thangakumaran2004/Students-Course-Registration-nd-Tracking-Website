const express = require('express');
const router = express.Router();
const {addDataToDB} = require('../../Controllers/Admin/allotFacultyController');
const {checkIfAlreadyPresentInAllotedFaculties} = require('../../Controllers/Admin/mainPageController');

router.use(express.json());
router.use(express.urlencoded({extended:true}));

router.post('/',async (req,res)=>{
    const frontendData = req.body;
    console.log("The frontend data of the choice of facutties alloted by the admins and deptsembatch details is",frontendData);


    const deptSemBatchDetails = JSON.parse(frontendData.deptSemBatch)
    const {dept,year,semester,batch} = deptSemBatchDetails;
    //console.log("the destructured deptSemBatch details is,",dept,year,semester,batch);

    const precheckIfAlreadySameDataPresent = await checkIfAlreadyPresentInAllotedFaculties(semester,batch,dept);
    //console.log("The result of prechecking if data already present in allotedbyadnmins table is, ",precheckIfAlreadySameDataPresent);

    if(precheckIfAlreadySameDataPresent == 'Server Busy'){
        let result = {
            addAllotedFacultiesToDBStatus : "Server Busy"
        }
        res.json(result);
        return;
    }else if(precheckIfAlreadySameDataPresent != 'You have not yet alloted'){
        let result = {
            addAllotedFacultiesToDBStatus : "Successfully added allotted faculties to database"
        }
        res.json(result);
        return;
    }


    const response = await addDataToDB(frontendData,dept,semester,batch);
    

    if(response=="Server Busy"){
        let result = {
            addAllotedFacultiesToDBStatus : "Server Busy"
        }
        res.json(result);
        return;
    }else{
        let result = {
            addAllotedFacultiesToDBStatus : "Successfully added allotted faculties to database"
        }
        res.json(result);
        return;

    }

});

module.exports = router;