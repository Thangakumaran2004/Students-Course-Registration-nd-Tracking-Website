const express = require('express');
const router = express.Router();
const {getFaculties,getCourses} = require('../Controllers/adminMainPageController');

router.use(express.json());


router.post('/',async (req,res)=>{
    let faculties;
    const {semester,year,batch} = req.body;
    console.log("The frontend data is", req.body);

    let facultiesResponse = await getFaculties('ECE');
    console.log("The result of getFaculties is ", facultiesResponse );
    if(facultiesResponse.stat == "Server Busy"){
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
    
    let coursesResponse = await getCourses('ECE',semester);
    
    if(coursesResponse.stat == "Server Busy"){
        console.log("Either error or no courses found in db");
        let response = {
            getCourseAndFacultyStatus : "Server Busy"
        }
        res.status(200).json(response);
    }else if(coursesResponse.stat == 'Courses found successfully'){
        console.log("The courses are,", coursesResponse);
        let response = {
            getCourseAndFacultyStatus : "successfully fetched courses and faculty",
            faculties : faculties,
            courses : coursesResponse.courses
        }
        res.status(200).json(response);
    }else{
        let response = {
            getCourseAndFacultyStatus : "No courses found for the provided details"
        }
        res.status(200).json(response);
    }

});

module.exports = router;