const express = require('express');
const router = express.Router();

const {insertToDb,getAllCourses} = require('../../Controllers/Student/selectedFacultiesController');

//router.use(express.urlencoded({extended:true}));

router.use(express.json());

router.post('/',async (req,res)=>{
    let frontendData = req.body;
    console.log("The frontend data is,",frontendData);
    
    let {studentBatch,studentDept,studentSemester,studentYear,studentRegno} =  frontendData;

    studentRegno = 2111093;

    delete frontendData.studentBatch;
    delete frontendData.studentDept;
    delete frontendData.studentSemester;
    delete frontendData.studentYear;

    let precheck = await insertToDb(studentRegno, studentSemester, studentDept, studentYear, studentBatch, frontendData);
    console.log("Precheck is ", precheck);
    if(precheck.status == 'Server Busy'){
        res.json({status:"Server Busy"});
    }else if(precheck.status == 'Successfully added All entries'){
        res.json({status : "Successfully added all choices to db"})
    }else if(precheck.status == 'Partially updated'){

        let remainingCoursesId = precheck.coursesToBeSelected;
        let remainingCoursesNames = [];

        let allCourses = await getAllCourses(studentSemester,studentBatch,studentDept);

        if(allCourses == 'Server Busy'){
            res.json({status : "Server Busy"});
        }else{
            console.log("The all courses are ",allCourses);
            console.log("The remaining Courses are ",remainingCoursesId);
            console.log("The size of array is", remainingCoursesId.length);
            for(let i = 0;i<remainingCoursesId.length;i++){
                for(let j = 0;j<allCourses.length;j++){
                    console.log("The course id and course id is", remainingCoursesId[i], allCourses[j].course_id)
                    if(remainingCoursesId[i] == allCourses[j].course_id){
                        remainingCoursesNames.push(allCourses[j].name);
                    }
                }
            }
            console.log("The remaining courses are",remainingCoursesNames);
            res.json({status : "partially filled", remainingCourse : remainingCoursesNames});
            
        }
    }

    //res.send("Success");
})

module.exports  = router;