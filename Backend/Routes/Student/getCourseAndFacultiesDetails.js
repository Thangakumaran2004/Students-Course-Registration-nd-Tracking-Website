const express = require('express');
const router = express.Router();
router.use(express.json());
const {getAllotedFacultiesAndCourses,getAllFaculties,setFacultyDetails,getAllCourses,setCourseDetails,formatToRender,getCountTrackerDetails, formatTrackerDetails} = require('../../Controllers/Student/getCourseAndFacultiesDetailsContoller');


router.post('/',async (req,res)=>{
    let frontendData = req.body;
    let {studentSemester,studentYear,studentBatch,studentDept} = req.body;
    //console.log("The data received from frontend about the student is : ", frontendData);

    let allotedFacultiesForCourses = await getAllotedFacultiesAndCourses(studentSemester,studentDept,studentBatch);

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
        //console.log("Alloted faculties for courses are, ",allotedFacultiesForCourses);
    }


    let allFaculties = await getAllFaculties(studentDept);

    if(allFaculties == 'Server Busy'){
        let response = {
            getAllotedFacultiesAndCoursesStatus : "Server Busy"
        };

        res.json(response);
        return;
    }

    //console.log("The all faculties are, ",allFaculties);

    let facultyDetails = await setFacultyDetails(allFaculties);

    if(facultyDetails == 'Server Busy'){
        let response = {
            getAllotedFacultiesAndCoursesStatus : "Server Busy"
        };

        res.json(response);
        return;
    }

    //console.log("The formatted facutlties details are ", facultyDetails);

    let allCourses = await getAllCourses(studentSemester,studentDept,'R2023');

    if(allCourses == 'Server Busy'){
        let response = {
            getAllotedFacultiesAndCoursesStatus : "Server Busy"
        };

        res.json(response);
        return;
    }

    //console.log("The all courses are, ",allCourses);

    let courseDetails = await setCourseDetails(allCourses);

    if(courseDetails == 'Server Busy'){
        let response = {
            getAllotedFacultiesAndCoursesStatus : "Server Busy"
        };

        res.json(response);
        return;
    }

    //console.log("The formated Course details are, ",courseDetails);

    let formattedCourseAndFaculties = await formatToRender(allotedFacultiesForCourses,facultyDetails,courseDetails);

    if(formattedCourseAndFaculties == 'Server Busy'){
        let response = {
            getAllotedFacultiesAndCoursesStatus : "Server Busy"
        };

        res.json(response);
        return;
    }else{
        //console.log("formattedCourseAndFaculties is",formattedCourseAndFaculties);
    }

    let countTrackerDetails = await getCountTrackerDetails(studentSemester,studentBatch,studentDept);
    //console.log("The details of count tracker table is ",countTrackerDetails);

    if(countTrackerDetails == 'Server Busy'){
        let response = {
            getAllotedFacultiesAndCoursesStatus : "Server Busy"
        };

        res.json(response);
        return;
    }

    let formattedTrackerTableDetails = await formatTrackerDetails(countTrackerDetails , courseDetails, facultyDetails);

    //console.log("The tracker table details are ,", formattedTrackerTableDetails);

    console.log("Details of faculties more zoomly seen , ");
    for(let i = 0;i<formattedTrackerTableDetails.length;i++){
        console.log(formattedTrackerTableDetails[i].faculty);
    }


    let response = {
        getAllotedFacultiesAndCoursesStatus : "successfully got",
        tableDetails : formattedCourseAndFaculties.tabledetails,
        facultyDescription : formattedCourseAndFaculties.facultyDesc,
        trackerTableDetails : formattedTrackerTableDetails
    };

    

    res.json(response);

});



module.exports = router;