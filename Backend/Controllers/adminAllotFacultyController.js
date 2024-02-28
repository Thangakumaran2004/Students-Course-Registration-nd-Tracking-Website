const db = require('../databaseConnection');

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

    let allotFacultyQuery = `insert into allotedfaculties(dept,sem,batch,course_id,batch1facultyid,batch1countlimit) values(?,?,?,?,?,?)`

    return new Promise((resolve,reject)=>{
        let successCount = 0;
        for(let i =0;i<batchDetails.length;i++){
            console.log("The value of i is,",i);
            db.query(allotFacultyQuery,[dept,sem,batch,batchDetails[i][0],batchDetails[i][1],batchDetails[i][2]],(err,res)=>{
                if(err){
                    reject("Error occured while inserting batch1 details inside database");
                }else{
                    successCount++;
                    console.log("The successCount is,",successCount);
                    console.log("The db result is",res);
                }
            });
        }
        console.log("successcount and batch length is", successCount,batchDetails.length);
        if(successCount==batchDetails.length){
            resolve('successfully inserted batch1 details into database');
        }else{
            resolve('Not successfull');
        }
    }).then(res=>res).catch(err=>err);

};

const addDataToDB = async (dataObject,dept,sem,batch) =>{

    let data = [];
  for(let i in dataObject){
    let obj = {};
    obj[i] = dataObject[i];
    data.push(obj);
  }
  console.log("The tarting array is",data);

    let batch1 = await divideIntoBatches(data,'Batch1');
    console.log("THe batch 1 is",batch1);
    let batch2 = await divideIntoBatches(data,'Batch2');
    let batch3 = await divideIntoBatches(data,'Batch3');

    const correctBatch1 = await formCorrectFormat(batch1);
    console.log("The correct batch1 is ", correctBatch1);
    const correctBatch2 = await formCorrectFormat(batch2);
    const correctBatch3 = await formCorrectFormat(batch3);

    let batch1InsertionResponse = await pushToDBBatch1(dept,sem,batch,correctBatch1);
    console.log("batch1 insertion response is",batch1InsertionResponse);
    let remainingBatchesInsertionResponse = await pushToDBBatches(dept,sem,batch,correctBatch2);

    return batch1InsertionResponse;




};

module.exports = {addDataToDB};