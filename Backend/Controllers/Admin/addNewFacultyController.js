const db = require('../../databaseConnection');

const addFacultyToDB = async  (facultyDescription = null,facultyId,facultyDept,facultyName,facultyDesignation)=>{
    let addFacultyToDBQuery = `insert into faculties(id,name,dept,designation,description)values(?,?,?,?,?)`;

    return new Promise((resolve,reject)=>{
        db.query(addFacultyToDBQuery,[facultyId,facultyName,facultyDept,facultyDesignation,facultyDescription],(err,res)=>{
            if(err){
                console.log("Error occured while adding faculty to db", err);
                reject('Server Busy');
            }else{
                //console.log("The result is :",res);
                resolve("Successfully added faculty to db");
            }
        })
    }).then(res=>res).catch(err=>err);
};

module.exports = {addFacultyToDB};