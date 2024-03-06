const { resolve } = require('path');
const db = require('../../databaseConnection');

const checkIfAlreadyPresentInAllotedFaculties = async (sem,batch,dept)=>{
    let alreadyPresentCheckQuery = `select * from facultyallotedbyadmins where sem = ? and batch = ? and dept = ?`;
    return new Promise((resolve,reject)=>{
        db.query(alreadyPresentCheckQuery,[sem,batch,dept],(err,res)=>{
            if(err){
                console.log("Error occured while checking if data already present in database");
                reject("Server Busy");
            }else{
                console.log("The result for check already alloted query is,", res);
                if(res.length){
                    resolve("You have already alloted faculties for the provided details");
                }else{
                    resolve("You have not yet alloted");
                }
            }
        })
    }).then(res=>res).catch(err=>err);
};

const getFaculties = async (dept)=>{
    let facultiesQuery = 'select id, name, designation, description from faculties where dept = ?';
    return new Promise((resolve,reject)=>{
        db.query(facultiesQuery,dept,(err,res)=>{
            if(err){
                console.log("Error occured while querying for faculties for adminmain page in db", err);
                let response = {
                    stat:"Server Busy"
                }
                reject(response);
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
                        stat: "faculty not found for the provided dept"
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
                let response = {
                    stat: "Server Busy"
                }
                reject(response);
            }else{
                console.log("The courses are",res);
                if(res.length){
                    let response ={
                        stat:"Courses found successfully",
                        courses : res
                    }
                    console.log("The courses are , ", res);
                    resolve(response);
                }else{
                    console.log("No courses found for the provided details");
                    let response = {
                        stat : "No courses found for the provided details"
                    }
                    resolve("No courses found for the provided details");
                }
            }
        })
    }).then(res=>res).catch(err=>err);
}

module.exports = {getFaculties,getCourses,checkIfAlreadyPresentInAllotedFaculties};