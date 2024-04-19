const exceljs = require('exceljs');
const fs = require('fs');
const express = require('express');
const router = express.Router();

const {getAllStudentChoices,getAllStudents} = require('../../Controllers/Admin/viewStudentChoicesController');
const {getFaculties, getCourses} = require('../../Controllers/Admin/mainPageController');

router.use(express.json());
router.use(express.urlencoded({extended:true}));

router.post('/', async (req,res)=>{

    try{

        console.log("The frontend response for viewing student choices is , ", req.body);
        //const {studentDept, studentSem, studentBatch, course_id} = req.body;
        
            const studentDept = "ECE";
            const studentSem = 3;
            const studentBatch = 2025;
            const course_id = "23ECE303"; 
        
        const allStudentChoices = await getAllStudentChoices(studentDept,studentBatch,studentSem,course_id);

        if(allStudentChoices == 'Server Busy'){

            let response = {
                viewStudentChoicesStatus : "Server Busy"
            }
            res.json(response);
            return;

        }else if(allStudentChoices == 'No choices found till now'){

            let response = {
                viewStudentChoicesStatus : "No Choices found till now"
            }     
            res.json(response);
            return;

        }

        let facultySet = new Set();

        for(let i = 0; i < allStudentChoices.length ; i++){
            facultySet.add(allStudentChoices[i].faculty_id);
            if(facultySet.size == 3) break;
        }

        let facultyArray = Array.from(facultySet);

        let allFacultyDetails = await getFaculties(studentDept);

        if(allFacultyDetails.stat == `faculty not found for the ${studentDept} dept` || allFacultyDetails.stat == 'Server Busy'){
            let response = {
                viewStudentChoicesStatus : "Server Busy"
            }     
            res.json(response);
            return;
        }

        let facultiesList = allFacultyDetails.faculties;
        //console.log("The faculties list is : ",facultiesList);

        let facultyIdNameMap = {};

        for(let i =0;i < facultiesList.length;i++){
            facultyIdNameMap[facultiesList[i].id] = facultiesList[i].name;
        }

        //console.log("The values of facultyIdNameMap is ", facultyIdNameMap);

        let allStudentDetails = await getAllStudents(studentDept,studentBatch,studentSem);

        if(allStudentDetails == 'Server Busy'){
            let response = {
                viewStudentChoicesStatus : "Server Busy"
            }     
            res.json(response);
            return;
        }

        //console.log("The all student details are ",allStudentDetails);

        let studentRegnoNameMap = {};

        for(let i =0; i < allStudentDetails.length; i++){

            studentRegnoNameMap[allStudentDetails[i].regno] = allStudentDetails[i].name;
        }

        //console.log("The StudentRegnoNameMap is", studentRegnoNameMap);


        let allCourseDetails = await getCourses(studentDept, studentSem, studentBatch);

        if(allCourseDetails.stat == 'Server Busy' || allCourseDetails.stat =='No courses found for the provided details'){
            let response = {
                viewStudentChoicesStatus : "Server Busy"
            }     
            res.json(response);
            return;
        }

        //console.log("The all course details are : ", allCourseDetails);

        let coursesList = allCourseDetails.courses;
        
        let courseIdCodeNameMap = {};

        for(let i = 0; i< coursesList.length;i++){
            courseIdCodeNameMap[coursesList[i].id] = {code : coursesList[i].code, name : coursesList[i].name};
        }

        //console.log("The courseIdCodeNameMap is, ",courseIdCodeNameMap);



        let batch1 = [], batch2 = [], batch3 = [];

        for(let i = 0 ; i < facultyArray.length; i++){
            if(i==0){
                batch1 = allStudentChoices.filter((obj)=>obj.faculty_id == facultyArray[i]);
            }else if(i==1){
                batch2 = allStudentChoices.filter((obj)=>obj.faculty_id == facultyArray[i]);
            }else{
                batch3 = allStudentChoices.filter((obj)=>obj.faculty_id == facultyArray[i]);
            }

        }

        let studentChoicesExcelBook = new exceljs.Workbook();  

        console.log("batch1 ", batch1);
        //console.log("batch2", batch2);
        //console.log("batch3", batch3);

        if(batch1 != []){

            batch1 = batch1.map((obj)=>{
                let newObj = obj;
                newObj.course_name = courseIdCodeNameMap[obj.course_id].name;
                newObj.student_name = studentRegnoNameMap[obj.student_regno];
                newObj.faculty_name = facultyIdNameMap[obj.faculty_id];
                newObj.course_code = courseIdCodeNameMap[obj.course_id].code;
                return newObj;
            });

            console.log("New Batch1 ", batch1);


            let batch1Sheet = studentChoicesExcelBook.addWorksheet(`Batch1-${courseIdCodeNameMap[course_id].name}-${facultyIdNameMap[facultyArray[0]]}`);

            batch1Sheet.columns = [
                {header: "Sl no.", key: "sl_no", width: 5},
                {header: "Course Code", key : "course_code", width: 25},
                {header: "Course Name", key : "course_name", width : 50},
                {header : "Student RegNo", key : "student_regno", width: 25 },
                {header: "Student Name", key : "student_name", width: 50},
                {header : "Student Semester", key : "student_sem", width: 20},
                {header : "Faculty Name", key : "faculty_name", width : 50}
            ];

            //{name : obj.name, age : obj.age, profession : obj.profession}

            await batch1.map((obj,index)=>{
                //console.log("Index is , ", index);
                batch1Sheet.addRow({
                    sl_no : index+1,
                    course_code : obj.course_code,
                    course_name : obj.course_name,
                    student_regno : obj.student_regno,
                    student_name : obj.student_name,
                    student_sem : obj.student_sem,
                    faculty_name : obj.faculty_name
                });
            })
        }

        if(batch2 != []){

            batch2 = batch2.map((obj)=>{
                let newObj = obj;
                newObj.course_name = courseIdCodeNameMap[obj.course_id].name;
                newObj.student_name = studentRegnoNameMap[obj.student_regno];
                newObj.faculty_name = facultyIdNameMap[obj.faculty_id];
                newObj.course_code = courseIdCodeNameMap[obj.course_id].code;
                return newObj;
            });

            console.log("New Batch2 ", batch2);


            let batch2Sheet = studentChoicesExcelBook.addWorksheet(`Batch2-${courseIdCodeNameMap[course_id].name}-${facultyIdNameMap[facultyArray[0]]}`);

            batch2Sheet.columns = [
                {header: "Sl no.", key: "sl_no", width: 5},
                {header: "Course Code", key : "course_code", width: 25},
                {header: "Course Name", key : "course_name", width : 50},
                {header : "Student RegNo", key : "student_regno", width: 25 },
                {header: "Student Name", key : "student_name", width: 50},
                {header : "Student Semester", key : "student_sem", width: 20},
                {header : "Faculty Name", key : "faculty_name", width : 50}
            ];

            //{name : obj.name, age : obj.age, profession : obj.profession}

            await batch2.map((obj,index)=>{
                //console.log("Index is , ", index);
                batch2Sheet.addRow({
                    sl_no : index+1,
                    course_code : obj.course_code,
                    course_name : obj.course_name,
                    student_regno : obj.student_regno,
                    student_name : obj.student_name,
                    student_sem : obj.student_sem,
                    faculty_name : obj.faculty_name
                });
            })

        }

        if(batch3 != []){

            batch3 = batch3.map((obj)=>{
                let newObj = obj;
                newObj.course_name = courseIdCodeNameMap[obj.course_id].name;
                newObj.student_name = studentRegnoNameMap[obj.student_regno];
                newObj.faculty_name = facultyIdNameMap[obj.faculty_id];
                newObj.course_code = courseIdCodeNameMap[obj.course_id].code;
                return newObj;
            });

            console.log("New Batch3 ", batch3);


            let batch3Sheet = studentChoicesExcelBook.addWorksheet(`Batch3-${courseIdCodeNameMap[course_id].name}}-${facultyIdNameMap[facultyArray[0]]}`);

            batch3Sheet.columns = [
                {header: "Sl no.", key: "sl_no", width: 5},
                {header: "Course Code", key : "course_code", width: 25},
                {header: "Course Name", key : "course_name", width : 50},
                {header : "Student RegNo", key : "student_regno", width: 25 },
                {header: "Student Name", key : "student_name", width: 50},
                {header : "Student Semester", key : "student_sem", width: 20},
                {header : "Faculty Name", key : "faculty_name", width : 50}
            ];

            //{name : obj.name, age : obj.age, profession : obj.profession}

            await batch3.map((obj,index)=>{
                //console.log("Index is , ", index);
                batch3Sheet.addRow({
                    sl_no : index+1,
                    course_code : obj.course_code,
                    course_name : obj.course_name,
                    student_regno : obj.student_regno,
                    student_name : obj.student_name,
                    student_sem : obj.student_sem,
                    faculty_name : obj.faculty_name
                });
            })

        }


        res.setHeader(
            "Content-type",
            "application/vnd.openemlformats-officedocument.spreadsheetxml.sheet"
        )

        res.setHeader(
            "Content-Disposition",
            "attachment;filename=" + `StudentChoices-${courseIdCodeNameMap[course_id].name}-${studentBatch}.xlsx`
        )


        studentChoicesExcelBook.xlsx.write(res).then(()=>{
            console.log("Going to end");
            res.end();
        }).catch(err=>{
                console.log("Error occured in sending excel ",err)
                let response = {
                    viewStudentChoicesStatus : "Server Busy"
                }
        
                res.json(response);
            
        });

        //res.json("Good Work");

    }catch(e){

        console.log("Error occured in viewing student choices",e);

        let response = {
            viewStudentChoicesStatus : "Server Busy"
        }

        res.json(response);
        return;
    }
});

module.exports = router;