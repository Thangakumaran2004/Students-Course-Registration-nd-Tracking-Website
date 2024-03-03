const db = require('../../databaseConnection');

const addStudentToDB = async  (studentRegno,studentDept,studentName,studentSem,studentYear,studentRegulation,studentDOB)=>{
    let addStudentToDBQuery = `insert into students(regno,dept,name,sem,year,regulation,dob)values(?,?,?,?,?,?,?)`;

    return new Promise((resolve,reject)=>{
        db.query(addStudentToDBQuery,[studentRegno,studentDept,studentName,studentSem,studentYear,studentRegulation,studentDOB],(err,res)=>{
            if(err){
                console.log("Error occured while adding student to db", err);
                reject('Server Busy');
            }else{
                console.log("The result is :",res);
                resolve("Successfully added student to db");
            }
        })
    }).then(res=>res).catch(err=>err);
};

const changeDOBFormat = dob=> dob.split("-").reverse().join("-");

module.exports = {addStudentToDB,changeDOBFormat};