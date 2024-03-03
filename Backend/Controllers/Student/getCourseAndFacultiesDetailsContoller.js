const { on } = require('nodemon');
const db = require('../../databaseConnection');


const getAllotedFacultiesAndCourses = async (sem,dept,batch)=>{
    let getAllotedFacultiesAndCoursesQuery = `select * from allotedFaculties where sem = ? and dept = ? and batch = ?`;
    
    return new Promise((resolve,reject)=>{
        db.query(getAllotedFacultiesAndCoursesQuery,[sem,dept,batch],(err,res)=>{
            if(err){
                console.log("Error occured while querying the database for getting courses and alloted faculties.",err);
                reject("Server Busy");
            }else{
                if(res.length){
                    resolve(res);
                }else{
                    resolve("Admin as not yet alloted any faculties for your courses");
                }
            }
        })
    }).then(res=>res).catch(err=>err);

};

const getAllFaculties = async (dept) =>{
    let getAllFacultiesQuery = `select id, name , description from faculties where dept = ?`;

    return new Promise((resolve,reject)=>{
        db.query(getAllFacultiesQuery,dept,(err,res)=>{
            if(err){
                console.log("Error occured while querying database for getting all faculties details",err);
                reject("Server Busy");
            }else{
                resolve(res);
            }
        })
    }).then(res=>res).catch(err=>err);
}

const setFacultyDetails = async (allFaculties)=>{

    try{

        let facultiesDetails = {};
        allFaculties = allFaculties.forEach(obj=>{
            facultiesDetails[obj.id] = {
                name : obj.name,
                description : obj.description
            }
        });
        return facultiesDetails;

    }catch(e){

        console.log("Error occured while setting faculty details",e);
        return 'Servey Busy';
    }
}

const getAllCourses = async (sem,dept,regulation)=>{
    let getAllCoursesQuery = `select id, code, name, type from maincourses where sem = ? and dept = ? and regulation = ?`;
    
    return new Promise((resolve,reject)=>{
        db.query(getAllCoursesQuery,[sem,dept,regulation],(err,res)=>{
            if(err){
                console.log("Error occured while querying db for getting all courses ",err);
                reject("Server Busy");
            }else{
                resolve(res);
            }
        })
    }).then(res=>res).catch(err=>err);
}

const setCourseDetails = async (allCourses)=>{
    try{

        let courseDetails = {};

        allCourses.forEach(obj=>{
            courseDetails[obj.id] = {
                code : obj.code,
                name : obj.name,
                type : obj.type

            }
        })

        return courseDetails;



    }catch(e){
        console.log("Error occured while setting up course details",e);
        return "Server Busy";
    }
};

const formatToRender = async (allotedFacultiesForCourses,facultyDetails,courseDetails)=>{
    try{
        let onlyAllotedFacultySet = new Set(); 
        let correctFormattedArray = [];
        let facultyDescription = [];
         allotedFacultiesForCourses.forEach(obj=>{

            let correctObj = {
                course_id: obj.course_id,
                course_name : courseDetails[obj.course_id].name,
                course_tpye : courseDetails[obj.course_id].type,
                batch1facultyid: obj.batch1facultyid,
                batch1facultyname: facultyDetails[obj.batch1facultyid].name,
                batch1countlimit: obj.batch1countlimit,
                batch2facultyid: obj.batch2facultyid,
                batch2facultyname: facultyDetails[obj.batch2facultyid].name,
                batch2countlimit: obj.batch2countlimit,
                batch3facultyid: obj.batch3facultyid,
                batch3facultyname: facultyDetails[obj.batch3facultyid].name,
                batch3countlimit: obj.batch3countlimit,
            }

            onlyAllotedFacultySet.add(obj.batch1facultyid);
            onlyAllotedFacultySet.add(obj.batch2facultyid);
            onlyAllotedFacultySet.add(obj.batch3facultyid);



            correctFormattedArray.push(correctObj);

        });

        onlyAllotedFacultySet.forEach(id=>{
            facultyDescription.push(facultyDetails[id]);
        })

        return {
            tabledetails : correctFormattedArray,
            facultyDesc : facultyDescription
        };

    }catch(e){
        console.log("Error occured while formatting to render",e);
        return 'Server Busy';
    }
}


module.exports = {getAllotedFacultiesAndCourses,getAllFaculties,setFacultyDetails,getAllCourses,setCourseDetails,formatToRender};