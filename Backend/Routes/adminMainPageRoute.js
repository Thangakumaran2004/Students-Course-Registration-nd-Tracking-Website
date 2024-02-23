const express = require('express');
const router = express.Router();
const {getFaculties,getCourses} = require('../Controllers/adminMainPageController');

router.use(express.json());


router.post('/',async (req,res)=>{
    let faculties;
    const frontendData = req.body;
    console.log("The frontend data is", frontendData);

    let facultiesResponse = await getFaculties('ECE');
    console.log("The result of getFaculties is ", facultiesResponse );
    if(facultiesResponse == "Server Busy"){
        let response = {
            getCourseAndFacultyStatus: "Server Busy"
        }
        res.status(200).json(response);
    }else if(facultiesResponse.stat == 'faculty found successfully'){
        faculties = facultiesResponse.faculties;
    }else{
        let response ={
            getCourseAndFacultyStatus: "Faculty not found for the given department"
        }
        res.status(200).json(response);
    }
    
    let coursesResponse = await getCourses('ECE',3);
    
    if(coursesResponse == "Server Busy"){
        console.log("Either error or no courses found in db");
        let response = {
            getCourseAndFacultyStatus : "Server Busy"
        }
        res.status(200).json(response);
    }else{
        console.log("The courses are,", coursesResponse);
        let response = {
            getCourseAndFacultyStatus : "successfully fetched courses and faculty",
            faculties : faculties,
            courses : coursesResponse
        }
        res.status(200).json(response);
    }

});

module.exports = router;