const db = require('../../databaseConnection');

const divideIntoBatches = async (data,batchName)=>{
    const result = await data.filter(obj=>{
        let key;
        for(let i in obj){
            key = i;
        }
        let keySplit = key.split("-");
        return keySplit.indexOf(batchName) != -1;
    });

    return result;
}

const formCorrectFormat = async (batchArray)=>{
    let formattedBatchArray = [];
    
    let count = await batchArray.filter(obj=>{
        let key;
        for(let i in obj){
            key = i;
        }
        let keySplit = key.split("-");
        return keySplit.indexOf('count') != -1;
    });

    let faculty = await batchArray.filter(obj=>{
        let key;
        for(let i in obj){
            key = i;
        }
        let keySplit = key.split("-");
        return keySplit.indexOf('count') == -1;
    });

    await count.sort();
    await faculty.sort();

    for(let i=0;i<count.length;i++){
        let countKey,countKeyDup;
        for(let j in count[i]){
            countKey = j;
            countKeyDup = j;
        }
        let countKeySplit = countKey.split('-');
        let courseId = countKeySplit[1];
        let countLimit = count[i][countKeyDup];
        let facultyKey,facultyKeyDup;
        for(let j in faculty[i]){
            facultyKey=j;
            facultyKeyDup=j;
        }

        let facultyId = faculty[i][facultyKeyDup];
        formattedBatchArray.push([courseId,facultyId,countLimit]);
    }

    return formattedBatchArray;
};

const pushToDBBatch1 = async (dept,sem,batch,batchDetails)=>{

    try{

        let allotFacultyQuery = `insert into facultyallotedbyadmins (dept,sem,batch,course_id,batch1facultyid,batch1countlimit) values(?,?,?,?,?,?)`

        return new Promise((resolve,reject)=>{
        

            for(let i =0;i<batchDetails.length;i++){
                //console.log("The value of i is,",i);
             db.query(allotFacultyQuery,[dept,sem,batch,batchDetails[i][0],batchDetails[i][1],batchDetails[i][2]],(err,res)=>{
                    if(err){
                        //console.log("Error occured while inserting batch1 details inside database",err);
                        reject("Server Busy");
                    }else{
                        
                        
                        //console.log("The db result is",res);
                    }
                });
            }
          
            resolve('successfully inserted batch1 details into database');
            
        }).then(res=>res).catch(err=>err);

    }catch(e){
        //console.log("Error occured  in pushToDBBatch1 : ",e);
        return "Server busy";
    }   

};

const pushToDBBatches2 = async (dept,sem,batch,batchDetails)=>{
    try{
        let allotFacultyQuery = `update facultyallotedbyadmins set batch2facultyid = ?, batch2countlimit = ? where course_id = ? and dept = ? and batch = ? and sem = ?`;

        return new Promise((resolve,reject)=>{
            for(let i=0;i<batchDetails.length;i++){
                db.query(allotFacultyQuery,[batchDetails[i][1],batchDetails[i][2],batchDetails[i][0],dept,batch,sem],(err,res)=>{
                    if(err){
                        //console.log("Error occured while updating batch 2 details,",err);
                        reject("Server Busy");
                    }else{
                        //console.log("Successfully updating batch2 details",res);
                    }
                })
            }
            resolve("Successfully inserted batch 2 details in database");
        }).then(res=>res).catch(err=>err);
    }catch(e){
        //console.log("Error occured while updating batch 2 details ",e);
        return "Server Busy";
    }
};

const pushToDBBatches3 = async (dept,sem,batch,batchDetails)=>{
    try{
        let allotFacultyQuery = `update facultyallotedbyadmins set batch3facultyid = ?, batch3countlimit = ? where course_id = ? and dept = ? and batch = ? and sem = ?`;

        return new Promise((resolve,reject)=>{
            for(let i=0;i<batchDetails.length;i++){
                db.query(allotFacultyQuery,[batchDetails[i][1],batchDetails[i][2],batchDetails[i][0],dept,batch,sem],(err,res)=>{
                    if(err){
                        //console.log("Error occured while updating batch 3 details,",err);
                        reject("Server Busy");
                    }else{
                        //console.log("Successfully updating batch2 details",res);
                    }
                })
            }
            resolve("Successfully inserted batch 3 details in database");
        }).then(res=>res).catch(err=>err);
    }catch(e){
        //console.log("Error occured while updating batch 3 details ",e);
        return "Server Busy";
    }
}

const addDataToDB = async (dataObject,dept,sem,batch) =>{

    let data = [];
  for(let i in dataObject){
    let obj = {};
    obj[i] = dataObject[i];
    data.push(obj);
  }
  //console.log("The tarting array is",data);

    let batch1 = await divideIntoBatches(data,'Batch1');
    //console.log("The batch 1 is",batch1);
    let batch2 = await divideIntoBatches(data,'Batch2');
    //console.log("The batch 2 is",batch2);
    let batch3 = await divideIntoBatches(data,'Batch3');
    //console.log("The batch 3 is",batch3);

    const correctBatch1 = await formCorrectFormat(batch1);
    ////console.log("The correct batch1 is ", correctBatch1);
    const correctBatch2 = await formCorrectFormat(batch2);
    //console.log("The correct batch2 is",correctBatch2);
    const correctBatch3 = await formCorrectFormat(batch3);
    //console.log("The correct batch3 is",correctBatch3);

    let batch1InsertionResponse = await pushToDBBatch1(dept,sem,batch,correctBatch1);
    // console.log("batch1 insertion response is",batch1InsertionResponse);
    if(batch1InsertionResponse == "ServerBusy"){
        return "Server Busy";
    }

    let batch2InsertionResponse = await pushToDBBatches2(dept,sem,batch,correctBatch2);
    //console.log("Batch2 insertion response is",batch2InsertionResponse);
    if(batch2InsertionResponse == 'Server Busy'){
        return "Server Busy";
    }

    let batch3InsertionResponse = await pushToDBBatches3(dept,sem,batch,correctBatch3);
    //console.log("Batch3 insertion response is",batch3InsertionResponse);
    if(batch3InsertionResponse == 'Server Busy'){
        return "Server Busy";
    }

    return "Successfully added data to db";
    

};

module.exports = {addDataToDB};