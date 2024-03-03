const db = require('../../databaseConnection');

const deleteStudentFromDB = async (studentRegno,studentName,studentDept)=>{
    return new Promise((resolve,reject)=>{
        let deleteStudentQuery = `delete from students where regno = ? and dept = ?`;
        db.query(deleteStudentQuery,[studentRegno,studentDept],(err,res)=>{
            if(err){
                console.log("Error occured while deleting Students from table",err);
                reject("Server Busy");
            }else{
                console.log("The result for deletion is,", res);
                resolve("successfully deleted");
            }
        })
    }).then(res=>res).catch(err=>err);
};

module.exports = {deleteStudentFromDB};