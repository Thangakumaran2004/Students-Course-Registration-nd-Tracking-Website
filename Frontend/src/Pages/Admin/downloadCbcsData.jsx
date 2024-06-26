import React, { useState } from 'react'
import { Button, Col, FloatingLabel, Form, Row } from 'react-bootstrap'
import { Adminheader } from '../../Components/header';
import Cbcssubnav from '../../Components/allotcbcssubnav';
import axios from 'axios';

const DownloadCbcsData = () => {

    let departmentName=JSON.parse(sessionStorage.getItem('adminDept'))

    const[bssSuccess,setBssSuccess]=useState(false);
    const[bssFailure,setBssFailure]=useState(false); 
    const[getCourseId,setCourseId]=useState([])

    const[emptyinput,setemptyinput]=useState(false);
    const[propsData,setpropsData]=useState({});
    const[downloadCourse,setDownloadCourse]=useState({
        'batch':'',
        'semester':'',
        'year':'',
        'Dep':departmentName
    });

    const handlingDownloadCourseData =(e)=>{
      const { name, value } = e.target;
      setDownloadCourse(prevState => ({
        ...prevState,
        [name]: value
      }));
    }


    const DetailsSubmit = async (e)=>{
      e.preventDefault();
      console.log("The form data is ",downloadCourse);
      setCourseId([
        {
          id: '23ECE301',
          code: '23EC31C',
          name: 'Probablity Random Process And Queueing Theory',
          type: 'Theory Course'
        },
        {
          id: '23ECE302',
          code: '23EC32C',
          name: 'Signals And System',
          type: 'Theory Course'
        },
        {
          id: '23ECE303',
          code: '23EC33C',
          name: 'Electronic Devices',
          type: 'Integrated Course'
        },
        {
          id: '23ECE304',
          code: '23EC34C',
          name: 'Digital Electronics',
          type: 'Integrated Course'
        },
        {
          id: '23ECE305',
          code: '23EC35C',
          name: 'Computer Networks',
          type: 'Integrated Course'
        },
        {
          id: '23ECE306',
          code: '23EC36C',
          name: 'Intellectual Property Rights Study',
          type: 'Practical Course'
        }
      ])

      if(downloadCourse.year=='none' || downloadCourse.semester=='none' || downloadCourse.batch==''){
        setemptyinput(true);
    }else{

    try {        
       

        let response = await axios.post('http://localhost:5000/admin/getCourses',downloadCourse );

        console.log("The backend response is ",response.data);

        if( response.data.getCourseStatus =='Successfully fetched Courses'){
          console.log("Working")

        //    sessionStorage.setItem('Downloadcoursebssdata',JSON.stringify(downloadCourse));
        // console.log("The download course is,",downloadCourse)
          setpropsData(downloadCourse);
            
            setCourseId(response.data.courses);
            console.log("The getCourses is", getCourseId);
            setBssSuccess(true);

        }else if(response.data.getCourseStatus == 'Server Busy'){

            console.log("The backend response is ",response.data.stat);
            setBssFailure(true);
        }

      }catch(e){
        console.log( "Error in axios while fetching  courseid",e);
      }

    }

    }

      return (
        <div>
          <Adminheader />
          <Cbcssubnav />
            <Form className="mb-5 mt-5" onSubmit={DetailsSubmit}>
                <Row>
                  <center><h3>Enter the Details</h3></center>
                  <Col>
                  <Form.Label>Batch :</Form.Label>
                    <FloatingLabel controlId="floatingInput" label="batch" >
                        <Form.Control  type='text'  name="batch" value={downloadCourse.batch} onChange={handlingDownloadCourseData}/>
                    </FloatingLabel>
                    
                    </Col>
                    <Col>
                    <Form.Group>
                    <Form.Label>Select semester</Form.Label>
                  <select  className='yeardropdown'  name="semester" value={downloadCourse.semester} onChange={handlingDownloadCourseData}>
                    <option value='none'>None</option>
                  <option value='1'>sem-1</option>
                  <option value='2'>sem-2</option>
                  <option  value='3'>sem-3</option>
                  <option value='4'>sem-4</option>
                  <option value='5'>sem-5</option>
                  <option value='6'>sem-6</option>
                  <option value='7'>sem-7</option>
                  <option value='8'>sem-8</option>
            </select>
                  </Form.Group>
                    </Col>
                    <Col>
                    <Form.Group>
                    <Form.Label>Select year</Form.Label>
                  <select className='yeardropdown' placeholder='select year'  name="year" value={downloadCourse.year} onChange={handlingDownloadCourseData}>
                    <option value='none'>None</option>
                  <option value='1'>1 year</option>
                  <option value='2'>2 year</option>
                  <option  value='3'>3 year</option>
                  <option value='4'>4 year</option>
            </select>
                  </Form.Group>
                    </Col>
                    <Col><Button type='submit'>Search</Button></Col>
                    
                </Row>
                {bssSuccess && <p style={{color:'green',fontStyle:'italic'}}> data fetched Sucessfully . . . . . . . </p>}
            {bssFailure && <p style={{color:'red',fontStyle:'italic'}}>Error Ocurred . . . . . . . </p>}
            </Form>
            
            <Downloadform  fcid={getCourseId}  downloadrequiredData={propsData}/>
        </div>
      )
    }



    const Downloadform =(props)=>{
      
      let fetchedcourseid=props.fcid;

      console.log("The fetched course id is ", fetchedcourseid);

      const [courseIdDownload,setCourseIdDownload] = useState({
       "final data": props.downloadrequiredData,
        "coursecode":''
      })


        const handlingDownload =(e)=>{
          const { name, value } = e.target;
          setCourseIdDownload(prevState => ({
            ...prevState,
            [name]: value
          }));
        }



        const FinalDownload = async (e)=>{
          e.preventDefault();
          console.log("The form data in download form component is ",courseIdDownload);
        

        try {      
           // let response = await axios.post('http://localhost:5000/admin/viewStudentChoices',courseIdDownload);
           // console.log("The response for download is : ",response );
  
          const response = await axios.post('http://localhost:5000/admin/viewStudentChoices', courseIdDownload, {
            responseType: 'blob' // Set the response type to blob to handle binary data
          });

          console.log("The response from the backend is : ", response);

          // Create a blob object from the response data
          const blob = new Blob([response.data], { type: response.headers['content-type'] });
          console.log("The blob is : ", blob);

          if(blob.type == 'application/json; charset=utf-8'){

                var reader = new FileReader();
                reader.onload = function(event) {
                    var blobText = event.target.result;  
                    var jsonResponse = JSON.parse(blobText);
                    console.log("The decoded blob is : ",jsonResponse);

                    if(jsonResponse.viewStudentChoicesStatus == 'Server busy'){
                      console.log("The backend response status is : Server Busy" );
                      return ;

                    }else if(jsonResponse.viewStudentChoicesStatus == 'No Choices found till now'){
                      console.log("The backend response status is : No choices found till Now");
                      return ;
                    }
                };

                reader.readAsText(blob);


              }else{
                // Create a link element to download the blob
                const url = window.URL.createObjectURL(blob);
                const link = document.createElement('a');
                link.href = url;
                link.setAttribute('download', 'studentChoicesExcelBook.xlsx');

                // Append the link to the body and click it to trigger the download
                document.body.appendChild(link);
                link.click();

                // Clean up
                document.body.removeChild(link);
                window.URL.revokeObjectURL(url);
              }

        }catch(e){
              console.log( "Error in axios while downloading",e);
        }
      }
      

        return(
          <Form onSubmit={FinalDownload}>
            <Row>
              <center><h3>Select the course id to download the data </h3></center>
              <Col>
                      <Form.Group>
                          <select className='yeardropdown' md={2} type='text'  name="coursecode" value={courseIdDownload.coursecode} onChange={handlingDownload}>
                        
                          {fetchedcourseid.map(({id,code,name}) => (
                  <option value={id}>{code}-{name}</option>
                ))}
                          </select>
                      </Form.Group>
              </Col>
              <Col><Button type='submit'>Download</Button></Col>
            </Row>
          </Form>
        )
}

export default DownloadCbcsData