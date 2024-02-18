const db = require('../databaseConnection');


const checkStudent = async (username, password)=>{
    let checkStudentQuery = `SELECT cast(regno as char) as RegNo, cast(dob as char) as DateOfBirth, cast(dept as char) as dept FROM Students WHERE regno = ?`;
    return new Promise((resolve,reject)=>{
        db.query(checkStudentQuery,username,(err,res)=>{
            if(err){
                console.log("Error occured while checking for student regno and dob in students table", err);
                reject("Server Busy");
            }else{
                console.log("The result of checkStudent Query is: ",res);
                if(res.length == 1){
                    let response = {
                                        status: "Student found in database",
                                        password: res[0].DateOfBirth,
                                        regno: res[0].RegNo,
                                        dept: res[0].dept
                                   };
                    resolve(response);

                }else{
                    console.log("Student not found in database");
                    resolve("student not found");
                }
            }
        })
    }).then(res=>res).catch(err=>err);
};


module.exports = {checkStudent};

