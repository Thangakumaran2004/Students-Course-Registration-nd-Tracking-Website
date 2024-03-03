const express = require('express');
const router = express.Router();

const {addFacultyToDB} = require('../../Controllers/Admin/addNewFacultyController');

router.use(express.json());


router.post('/',async (req,res)=>{
    const {facultyDescription,facultyId,facultyDept,facultyName,facultyDesignation} = req.body;
    const addStatus = await addFacultyToDB(facultyDescription,facultyId,facultyDept,facultyName,facultyDesignation);
    console.log("The Result of add Facutly controller function is,",addStatus);
    if(addStatus == 'Successfully added faculty to db'){
        let result = {
            facultyAddStatus : "Successfully added faculty to db"
        }
        res.status(200).json(result);
    }else{
        let result = {
            facultyAddStatus : "Server Busy"
        }
        res.json(result);
    }
});

module.exports = router;


