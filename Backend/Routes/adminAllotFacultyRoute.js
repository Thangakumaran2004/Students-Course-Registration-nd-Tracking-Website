const express = require('express');
const router = express.Router();
const {addDataToDB} = require('../Controllers/adminAllotFacultyController');

router.use(express.json());



router.post('/',async (req,res)=>{
    const frontendData = req.body;
    console.log("The frontend data is",frontendData);
    const response = await addDataToDB(frontendData,'ece',3,2025);
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