const express = require('express');
const router = express.Router();
const {getFaculties,getCourses,checkIfAlreadyPresentInAllotedFaculties} = require('../../Controllers/Admin/mainPageController');

router.use(express.json());


router.post('/',async (req,res)=>{
    let faculties;
    const {semester,year,batch,dept} = req.body;
    console.log("The frontend data is", req.body);

    const ifPresentAlreadyResponse = await checkIfAlreadyPresentInAllotedFaculties(semester,batch,dept);
    if(ifPresentAlreadyResponse == "Server Busy"){
        let response = {
            getCourseAndFacultyStatus: "Server Busy"
        }
        res.status(200).json(response);
        return;
    }else if(ifPresentAlreadyResponse=="You have already alloted faculties for the provided details"){

       // res.json("You have already alloted faculties for the provided details");
        let response ={
        getCourseAndFacultyStatus: "You have already alloted faculties for the provided details"
        }
        res.status(200).json(response);
        return;
    }

    let facultiesResponse = await getFaculties(dept);
    console.log("The result of getFaculties is ", facultiesResponse );
    if(facultiesResponse.stat == "Server Busy"){
        let response = {
            getCourseAndFacultyStatus: "Server Busy"
        }
        res.status(200).json(response);
        return;
    }else if(facultiesResponse.stat == 'faculty found successfully'){
        faculties = facultiesResponse.faculties;
    }else{
        let response ={
            getCourseAndFacultyStatus: "Faculty not found for the given department"
        }
        res.status(200).json(response);
        return;
    }
    
    let coursesResponse = await getCourses(dept,semester);
    
    if(coursesResponse.stat == "Server Busy"){
        console.log("Either error or no courses found in db");
        let response = {
            getCourseAndFacultyStatus : "Server Busy"
        }
        res.status(200).json(response);
        return;
    }else if(coursesResponse.stat == 'Courses found successfully'){
        console.log("The courses are,", coursesResponse);
        let response = {
            getCourseAndFacultyStatus : "successfully fetched courses and faculty",
            faculties : faculties,
            courses : coursesResponse.courses
        }
        res.status(200).json(response);
        return;
    }else{
        let response = {
            getCourseAndFacultyStatus : "No courses found for the provided details"
        }
        res.status(200).json(response);
        return;
    }

});

module.exports = router;