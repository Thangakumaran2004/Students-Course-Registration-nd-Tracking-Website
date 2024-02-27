let a ={
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
  
  