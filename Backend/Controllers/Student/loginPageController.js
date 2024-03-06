const db = require('../../databaseConnection');


const checkStudent = async (username, password)=>{
    
    let checkStudentQuery = `SELECT cast(regno as char) as RegNo, cast(dob as char) as DateOfBirth, cast(dept as char) as dept, cast(name as char) as name, cast(year as char) as year, cast(sem as char) as sem, cast(batch as char) as batch, cast(tcredits as char) as totalCredits, cast(regulations as char) as regulation FROM Students WHERE regno = ?`;
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
                                        dept: res[0].dept,
                                        name: res[0].name,
                                        year: res[0].year,
                                        sem: res[0].sem,
                                        batch: res[0].batch,
                                        totalCredits: res[0].totalCredits,
                                        regulation: res[0].regulation
                                       
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

