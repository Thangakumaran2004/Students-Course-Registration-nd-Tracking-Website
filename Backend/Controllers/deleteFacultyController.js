const db = require('../databaseConnection');

const deleteFacultyFromDB = async (facultyId,facultyDept)=>{
    return new Promise((resolve,reject)=>{
        let deleteFacultyQuery = `delete from faculties where id = ? and dept = ?`;
        db.query(deleteFacultyQuery,[facultyId,facultyDept],(err,res)=>{
            if(err){
                console.log("Error occured while deleting faculty from table",err);
                reject("Server Busy");
            }else{
                console.log("The result for deletion is,", res);
                resolve("successfully deleted");
            }
        })
    }).then(res=>res).catch(err=>err);
};

module.exports = {deleteFacultyFromDB};