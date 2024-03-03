const express = require('express');
const router = express.Router();
router.use(express.json());
const {getAllotedFacultiesAndCourses,getAllFaculties,setFacultyDetails,getAllCourses,setCourseDetails,formatToRender} = require('../../Controllers/Student/getCourseAndFacultiesDetailsContoller');


router.post('/',async (req,res)=>{
    let frontendData = req.body;
    console.log("The data received from frontend is : ", frontendData);

    let allotedFacultiesForCourses = await getAllotedFacultiesAndCourses(3,'ECE',2025);

    if(allotedFacultiesForCourses == "Server Busy"){
        let response = {
            getAllotedFacultiesAndCoursesStatus : "Server Busy"
        };

        res.json(response);
        return;
    }else if(allotedFacultiesForCourses == "Admin as not yet alloted any faculties for your courses"){
        let response = {
            getAllotedFacultiesAndCoursesStatus : "Admin as not yet alloted any faculties for your courses"
        }
        res.send(response);
        return;
    }else{
        console.log("Alloted faculties for courses are, ",allotedFacultiesForCourses);
    }


    let allFaculties = await getAllFaculties('ECE');

    if(allFaculties == 'Server Busy'){
        let response = {
            getAllotedFacultiesAndCoursesStatus : "Server Busy"
        };

        res.json(response);
        return;
    }

    console.log("The all faculties are, ",allFaculties);

    let facultyDetails = await setFacultyDetails(allFaculties);

    if(facultyDetails == 'Server Busy'){
        let response = {
            getAllotedFacultiesAndCoursesStatus : "Server Busy"
        };

        res.json(response);
        return;
    }

    let allCourses = await getAllCourses(3,"ECE",'R2023');

    if(allCourses == 'Server Busy'){
        let response = {
            getAllotedFacultiesAndCoursesStatus : "Server Busy"
        };

        res.json(response);
        return;
    }

    console.log("The all courses are, ",allCourses);

    let courseDetails = await setCourseDetails(allCourses);

    if(courseDetails == 'Server Busy'){
        let response = {
            getAllotedFacultiesAndCoursesStatus : "Server Busy"
        };

        res.json(response);
        return;
    }

    let formattedCourseAndFaculties = await formatToRender(allotedFacultiesForCourses,facultyDetails,courseDetails);

    if(formattedCourseAndFaculties == 'Server Busy'){
        let response = {
            getAllotedFacultiesAndCoursesStatus : "Server Busy"
        };

        res.json(response);
        return;
    }else{
        console.log("formattedCourseAndFaculties is",formattedCourseAndFaculties);
    }

    let response = {
        getAllotedFacultiesAndCoursesStatus : "successfully got",
        tableDetails : formattedCourseAndFaculties.tabledetails,
        facultyDescription : formattedCourseAndFaculties.facultyDesc
    };

    res.json(response);

});



module.exports = router;