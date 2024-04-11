const db = require("../../databaseConnection");

const insertToDb = async (studentRegno, studentSemester, studentDept, studentYear, studentBatch, frontendData)=>{
    try {
        console.log("Inside Insert To DB, ",studentRegno, studentSemester, studentDept, studentYear, studentBatch, frontendData)
        let alreadySelectedChoices = [];
        let facultyLimitExceeded = [];
        let executionCount = 0;
        for (let courseId in frontendData) {
            let facultyId = frontendData[courseId];
            let preCheck = await checkIfPresentInFacultySelectedByStudentsTable(studentRegno, studentSemester, studentDept, studentYear, studentBatch, courseId);
            console.log(preCheck);
            if (preCheck == 'Server Busy') {
                return serverResponse(preCheck);
            } else if (preCheck == 'alreadyFound') {
              alreadySelectedChoices.push(courseId);  
            } else if (preCheck == 'noRecordFound') {
                let countCheckresponse = await checkFacaultyAvailability(facultyId,courseId,studentSemester,studentBatch,studentDept);
                if(countCheckresponse == 'Server Busy'){
                    return serverResponse(countCheckresponse);
                }else{
                    let facultyAvailableCount = countCheckresponse[0].allotedcount;
                    if(facultyAvailableCount){ 
                        let insertToFacultySelectedByStudentResponse = await insertToFacultySelectedByStudent(studentRegno, studentSemester, studentDept, studentYear, studentBatch, courseId, facultyId);
                        if(insertToFacultySelectedByStudentResponse == 'Server Busy'){
                            return serverResponse(insertToFacultySelectedByStudentResponse);
                        }else{
                            let updateCountTrackerResponse = await updateCountTracker(studentSemester,studentDept,studentBatch,courseId,facultyId,facultyAvailableCount-1);
                            if(updateCountTrackerResponse == 'Server Busy'){
                                return serverResponse(updateCountTracker);
                            }
                        }
                    }else{
                        facultyLimitExceeded.push(courseId);
                    }
                }
                executionCount++;
            }
        }
        if(facultyLimitExceeded.length == 0){
            return serverResponse("Successfully added All entries");
            
        }
        return {
            status : "Partially updated",
            coursesToBeSelected : facultyLimitExceeded
        };
    
}catch (e) {
    console.log("Error Occured in insertToDB function ", e);
        return serverResponse('Server Busy');
    }
};

const checkIfPresentInFacultySelectedByStudentsTable = async (studentRegno, studentSemester, studentDept, studentYear, studentBatch, courseId) => {
    let checkIfPresentInFacultySelectedByStudentsTableQuery = `SELECT * FROM facultyselectedbystudents WHERE student_regno = ? AND student_sem = ? AND student_dept = ? AND student_year = ? AND student_batch = ? AND course_id = ?`;
    return new Promise((resolve, reject) => {
        db.query(checkIfPresentInFacultySelectedByStudentsTableQuery, [studentRegno, studentSemester, studentDept, studentYear, studentBatch, courseId], (err, res) => {
            if (err) {
                console.log("Error occurred while checking preCheck", err);
                reject("Server Busy");
            } else {
                if (res.length) {
                    console.log("Data already found");
                    resolve("alreadyFound");
                } else {
                    console.log("No data found");
                    resolve("noRecordFound");
                }
            }
        });
    }).then(res=>res).catch(err=>err);
};


const checkFacaultyAvailability = async (facultyId,courseId,studentSemester,studentBatch,studentDept)=>{
    console.log(facultyId,courseId,studentSemester,studentBatch,studentDept);
    let dbQuery =  `select allotedcount from counttracker where faculty_id = ? and course_id = ? and sem = ? and  batch = ? and dept = ? `;
    return new Promise((resolve,reject)=>{
        db.query(dbQuery,[facultyId,courseId,studentSemester,studentBatch,studentDept],(err,res)=>{
            if(err){
                console.log(err);
                reject("Server Busy");
            }else{
                console.log("The result of count checker is ",res);
                resolve(res);
            }
        })
    }).then(res=>res).catch(err=>err);
}

const insertToFacultySelectedByStudent = (studentRegno, studentSem, studentDept, studentYear, studentBatch, courseId, facultyId)=>{
    let insertToFacultySelectedByStudentQuery = `insert into facultyselectedbystudents (student_regno, student_sem, student_dept, student_year, student_batch,course_id, faculty_id) values (?,?,?,?,?,?,?)`;
    return new Promise((resolve,reject)=>{
        db.query(insertToFacultySelectedByStudentQuery,[studentRegno, studentSem, studentDept, studentYear, studentBatch, courseId, facultyId],(err,res)=>{
            if(err){
                console.log("Error occured inside  INSERTTOFACULTYSELECTEDBYSTUDENT ",err);
                reject("Server Busy");
            }else{
                resolve(res);
            }
        })
    }).then(res=>res).catch(err=>err);
}

const updateCountTracker = (studentSem,studentDept,studentBatch,courseId,facultyId,updatedCount)=>{

    let updateCountTrackerQuery = `update counttracker set allotedcount = ? where sem = ? and dept = ? and batch = ? and course_id = ? and faculty_id = ?`;
    
    return new Promise((resolve,reject)=>{
        db.query(updateCountTrackerQuery,[updatedCount,studentSem,studentDept,studentBatch,courseId,facultyId],(err,res)=>{

            if(err){
                console.log("Error occured while updating counttracker", err);
                reject('Server Busy');
            }else{
                resolve('Count updated successfully');
            }
        })
    }).then(res=>res).catch(err=>err);
}

const serverResponse = (response)=>{
    return {
        "status" : Response       
    }
}

const getAllCourses = (studentSem, studentBatch, studentDept)=>{

    let getAllCoursesQuery = `select id as course_id , name from maincourses where sem = ? and batch = ? and dept = ? `;

    return new Promise((resolve,reject)=>{
        db.query(getAllCoursesQuery,[studentSem,studentBatch,studentDept],(err,res)=>{
            if(err){
                console.log("Error occured while getting all courses ", err);
                reject("Server Busy");
            }else{
                console.log("The all courses are", res);
                resolve(res);
            }
        })
    }).then(res=>res).catch(err=>err);
};

module.exports = {insertToDb,getAllCourses};
