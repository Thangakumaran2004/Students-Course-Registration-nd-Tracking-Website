const express = require('express');
const router = express.Router();
const {addDataToDB} = require('../Controllers/adminAllotFacultyController');

router.use(express.json());



router.post('/',async (req,res)=>{
    const frontendData = req.body;
    console.log("The frontend data is",frontendData);
    const response = await addDataToDB(frontendData,'ece',3,2025);
    let result = {
        status: "Just checking",
        resu : response
    }

    res.send(result);

});



module.exports = router;