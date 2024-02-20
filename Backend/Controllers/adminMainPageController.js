const db = require('../databaseConnection');

const getFaculties = async (dept)=>{
    let facultiesQuery = 'select id, name, designation, description from faculties where dept = ?';
    return new Promise((resolve,reject)=>{
        db.query(facultiesQuery,dept,(err,res)=>{
            if(err){
                console.log("Error occured while querying for faculties for adminmain page in db", err);
                reject("Server Busy");
            }else{
                console.log("The faculties are ", res);
                if(res.length){
                    let response = {
                        stat: "faculty found successfully",
                        faculties: res
                    }
                    resolve(response);
                }else{
                    let response = {
                        stat: "faculty not found"
                    }
                    resolve(response);
                }
            }
        })

    }).then(res=>res).catch(err=>err);
};

const getCourses = async (dept, sem)=>{
    console.log("getcourse() called");
    let coursesQuery = 'select id,code,name,type from maincourses where dept = ? and sem = ?';
    return new Promise((resolve,reject)=>{
        db.query(coursesQuery,[dept,sem],(err,res)=>{
            if(err){
                console.log("Error occured while fetching courses for db",err);
                reject("Server Busy");
            }else{
                console.log("The courses are",res);
                if(res.length){
                    console.log("The courses are , ", res);
                    resolve(res);
                }else{
                    console.log("No courses found for the provided details");
                    resolve("Server Busy");
                }
            }
        })
    }).then(res=>res).catch(err=>err);
}

module.exports = {getFaculties,getCourses};