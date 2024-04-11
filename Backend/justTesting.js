const { resolve } = require('path');
const db = require('./databaseConnection');

/*let 


a ={
    'Batch1-ECE301': 'ECE01',
    'Batch3-ECE301': 'ECE03',
    'Batch1-ECE302': 'ECE04',
    'Batch2-ECE302': 'ECE05',
    'Batch3-ECE302': 'ECE06',
    'Batch1-ECE303': 'ECE07',
    'Batch2-ECE303': 'ECE08',
    'Batch3-ECE303': 'ECE09',
    'Batch1-ECE304': 'ECE10',
    'Batch2-ECE304': 'ECE01',
    'Batch3-ECE304': 'ECE02',
    'Batch1-ECE305': 'ECE03',
    'Batch2-ECE305': 'ECE04',
    'Batch3-ECE305': 'ECE05',
    'Batch1-ECE306': 'ECE06',
    'Batch2-ECE306': 'ECE07',
    'Batch3-ECE306': 'ECE08',
    'Batch1-ECE301-count': '40',
    'Batch2-ECE301-count': '40',
    'Batch3-ECE301-count': '40',
    'Batch1-ECE302-count': '40',
    'Batch2-ECE302-count': '40',
    'Batch3-ECE302-count': '40',
    'Batch1-ECE303-count': '40',
    'Batch2-ECE303-count': '40',
    'Batch3-ECE303-count': '40',
    'Batch1-ECE304-count': '40',
    'Batch2-ECE304-count': '40',
    'Batch3-ECE304-count': '40',
    'Batch1-ECE305-count': '40',
    'Batch2-ECE305-count': '40',
    'Batch3-ECE305-count': '40',
    'Batch1-ECE306-count': '40',
    'Batch2-ECE306-count': '40',
    'Batch3-ECE306-count': '40',
    'Batch2-ECE301': 'ECE02'
  };
  let responseArray = [];
  for(let i in a){
    let obj = {};
    obj[i] = a[i];
    responseArray.push(obj);
  }


  let batchOneArray = responseArray.filter(obj=>{
    let key;
    for(let i in obj){
        key = i;
    }
    let keySplit = key.split("-");
    return keySplit.indexOf('Batch1')!= -1;
    
  })

  let batchTwoArray = responseArray.filter(obj=>{
    let key;
    for(let i in obj){
        key = i;
    }
    let keySplit = key.split("-");
    return keySplit.indexOf('Batch2')!= -1;
    
  })

  let batchThreeArray = responseArray.filter(obj=>{
    let key;
    for(let i in obj){
        key = i;
    }
    let keySplit = key.split("-");
    return keySplit.indexOf('Batch3')!= -1;
    
  })


  //console.log(responseArray);
  //console.log(batchOneArray);
  //console.log(batchTwoArray);
  //console.log(batchThreeArray);


  const frameOrder = (batchArray)=>{
    let formattedArray = [];

    let count = batchArray.filter(obj=>{
        let key;
        for(let i in obj){
            key =i;
        }

        let keySplit = key.split("-");
        return keySplit.indexOf('count')!=-1;
    });

    //console.log("The count array is ",count);

    let faculty = batchArray.filter(obj=>{
        let key;
        for(let i in obj){
            key = i;
        }
        let keySplit = key.split("-");
        return keySplit.indexOf('count')== -1;
    });

    //dconsole.log("The faculty array is ", faculty);

    count.sort();
    faculty.sort();

    for(let i =0;i<count.length;i++){
        let countKey,countKeyDup;
        for(let j in count[i]){
            countKey = j;
            countKeyDup=j;
        }
        let countKeySplit = countKey.split('-');
        let courseId = countKeySplit[1];
       // console.log("The dup count key is, ",countKeyDup );
        let countLimit = count[i][countKeyDup];
        //console.log("The count[i].key is",count[i][countKeyDup]);

        let facultyKey,facultyKeyDup;
        for(let j in faculty[i]){
            facultyKey=j;
            facultyKeyDup=j;
        }

        let facultyId = faculty[i][facultyKeyDup];
        formattedArray.push([courseId,facultyId,countLimit]);
        
        
    }
    return formattedArray;
  }

console.log("The final result for batch 1 is ",frameOrder(batchOneArray));
console.log("The final result for batch 2 is ",frameOrder(batchTwoArray));
console.log("The final result for batch 3 is ",frameOrder(batchThreeArray));
  
  */

let a= {
  studentRegno: '2111092',
  studentSemester: '3',
  studentYear: '2',
  studentBatch: '2025',
  studentDept: 'ECE',
  '23EC31C': 'ECE05',
  '23EC32C': 'ECE03',
  '23EC33C': 'ECE04',
  '23EC34C': 'ECE03',
  '23EC35C': 'ECE03',
  '23EC36C': 'ECE02'
};



let {studentBatch,studentDept,studentSemester,studentYear,studentRegno} =  a;

 delete a.studentBatch;
 delete a.studentDept;
 delete a.studentSemester;
 delete a.studentYear;
 delete a.studentRegno;
//await
 //console.log(studentBatch,studentDept,studentSemester,studentYear,studentRegno);
 //console.log(a);

 let studentFacultyChoices = [];




 
    try {
        let alreadySelectedChoices = [];
        let executionCount = 0;
        for (let courseId in a) {
            let facultyId = a[courseId];
            let preCheck = await checkIfPresentInFacultySelectedByStudentsTable(studentRegno, studentSemester, studentDept, studentYear, studentBatch, courseId);
            console.log(preCheck);
            if (preCheck == 'Server Busy') {
                return "Server Busy";
            } /*else if (preCheck == 'alreadyFound') {
                
            } else if (preCheck == 'noRecordFound') {
             
            }*/else{
            executionCount++;
            }
        }
        console.log(`executionCount is ${executionCount}`);
    } catch (e) {
        console.log("error occured",e);
    }


const checkIfPresentInFacultySelectedByStudentsTable = async (studentRegno, studentSemester, studentDept, studentYear, studentBatch, courseId) => {
    let checkIfPresentInFacultySelectedByStudentsTableQuery = `SELECT * FROM facultyselectedbystudents WHERE student_regno = ? AND student_sem = ? AND student_dept = ? AND student_year = ? AND student_batch = ? AND course_id = ?`;
    return new Promise((resolve, reject) => {
        db.query(checkIfPresentInFacultySelectedByStudentsTableQuery, [studentRegno, studentSemester, studentDept, studentYear, studentBatch, courseId], (err, res) => {
            if (err) {
                console.log("Error occurred while checking preCheck", err);
                reject("Server Busy");
            } else {
                if (res.length) {
                    console.log("Data already found");
                    resolve("alreadyFound");
                } else {
                    console.log("No data found");
                    resolve("noRecordFound");
                }
            }
        });
    }).then(res=>res).catch(err=>err);
};


