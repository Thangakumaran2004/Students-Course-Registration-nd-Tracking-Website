const express = require('express');
const router = express.Router();
const {addDataToDB} = require('../Controllers/adminAllotFacultyController');

router.post('/', async (req,res)=>{
    console.log(req.body);
    const frontendData = req.body;
    console.log("The frontend data is",frontendData);
    const response = await addDataToDB(frontendData,'ece',3,2025);
    let result = {
        status: "Just checking",
        resu : response
    }

    res.send(result);
    //res.send("Semma paa");
})

module.exports = router;