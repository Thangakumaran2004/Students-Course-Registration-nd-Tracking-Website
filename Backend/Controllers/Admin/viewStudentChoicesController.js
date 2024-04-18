const db = require('../../databaseConnection');

const getAllStudentChoices = async (studentDept,studentBatch,studentSem,course_id)=>{

    try{

        let getAllStudentChoicesQuery = `select * from facultyselectedbystudents where student_dept = ? and student_batch = ? and student_sem = ? and course_id = ?`;

        return new Promise((resolve,reject)=>{

            db.query(getAllStudentChoicesQuery,[studentDept,studentBatch,studentSem,course_id],(err,res)=>{
                if(err){
                    console.log("Error ocurred while querying for viewing all student choices ", err);
                    reject("Server Busy");
                }
                //console.log("The result of the query is : ",res);
                if(res.length){
                    resolve(res);
                }else{
                    resolve("No choices found till now");
                }
            })

    }).then(res=>res).catch(err=>err);

    }catch(e){
        console.log("Error occured in getAllStudentChoices function",e);
        return "Server Busy";
    }   
}

const getAllStudents = async (studentDept,studentBatch,studentSem)=>{

    try{
        let getAllStudentsQuery = `select * from students where dept = ? and batch = ? and sem = ?`;

        return new Promise((resolve,reject)=>{
            
            db.query(getAllStudentsQuery,[studentDept,studentBatch,studentSem],(err,res)=>{
                if(err){
                    console.log("Error happened while querying to get all student details",err);
                    reject("Server Busy");
                }
                resolve(res);

            })
        }).then(res=>res).catch(err=>err);
    }catch(e){
        console.log("Error happened in getAllStudents function ",e);
        return "Server Busy";
    }
}


module.exports = {getAllStudentChoices,getAllStudents};