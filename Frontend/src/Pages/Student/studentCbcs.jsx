import React, { useState,useEffect } from 'react'
import {Container,Row,Col,Nav,Image,Table, Button,Accordion, Form} from 'react-bootstrap'
import { CircularProgressbar } from 'react-circular-progressbar';
import '../../Styles/studentMainPage.css'
import StudentHeader from '../../Components/studentHeader';
import axios from 'axios'
import Swal from 'sweetalert2';
import { Dashboard } from './dashboard';

let  studentDetailsString = JSON.parse(sessionStorage.getItem('studentData')) ;
 console.log("ThestudentDetailsString is", studentDetailsString);

 
// the below function will the have the function components of dashboard course navigation and main courses
const StudentCbcs = () => {
  let  studentDetailsString = JSON.parse(sessionStorage.getItem('studentData')) ;
  console.log("ThestudentDetailsString is", studentDetailsString);
  const postStudentDetails={'studentRegisterno':studentDetailsString.regno,'studentSemester':studentDetailsString.sem ,'studentYear':studentDetailsString.year,'studentBatch':studentDetailsString.batch,'studentDept':studentDetailsString.dept};
  const[facultyDescription,setFacultyDescription]=useState([]);
  const[studentTabeData,setStudentTableData]=useState([]);
  const[trackerTableData,setTrackerTableData]=useState([]);
  const [showTable,setShowTable]=useState(true);
  const [error, setError]=useState(false)
 useEffect(()=>{
  const CourseTableData =async ()=>{
    try{
      console.log("The course selected form data is,",postStudentDetails);
      let response = await axios.post('http://localhost:5000/student/getCourseAndFacultyDetails',postStudentDetails);
      if(response.data.getAllotedFacultiesAndCoursesStatus=='successfully got'){
      setFacultyDescription(response.data.facultyDescription);
      setTrackerTableData(response.data.trackerTableDetails);
      setStudentTableData(response.data.tableDetails);
      setShowTable(true);
      setError(false);
      }else if(response.data.getAllotedFacultiesAndCoursesStatus=='Server Busy'){
        setError(true);
      }
    }catch(err){
      console.log("the error in fetching  the course table data is ",err);
    }
  };
  CourseTableData();
},[])

  return (
    <>
      <StudentHeader  />
      
      {/* <Circlebar /> */}
     <Trackertable  trackertablelist={trackerTableData}/>
      
      {(showTable)?  <Maincourse  totaltablelist={studentTabeData}  facultydescription={facultyDescription}/>:<p>not alloted</p> }
        {error && <p>server busy</p>}
    </>
  )
}



export const Maincourse=(props) =>{

  let facultyDesp=props.facultydescription;
  console.log(facultyDesp);
  let studentscbcstable=props.totaltablelist;
  
  const [activeAccordionItem, setActiveAccordionItem] = useState(null);
  const[submitData,setSubmitData]=useState(

    { 
      studentSemester:studentDetailsString.sem ,
      studentRegno:studentDetailsString.regno,
    studentYear:studentDetailsString.year,
    studentBatch:studentDetailsString.batch,
    studentDept:studentDetailsString.dept}

  );
  const[success,setSucess]=useState(false)

  function Faculty( course_id,course_name,b1id, b1name, b1count, b2id, b2name, b2count, b3id, b3name, b3count) {
    console.log("The details",course_id,course_name,b1id, b1name, b1count, b2id, b2name, b2count, b3id, b3name, b3count)
    return (
      <select onChange={(e) => updateStaff(e, course_id)}>
        <option value={b1id} name={course_id}> {b1name} ({b1count})</option>
        <option value={b2id} name ={course_id}> {b2name} ({b2count})</option>
        <option value={b3id} name ={course_id}> {b3name} ({b3count})</option>
      </select>
    );
  }

  const handleSubmit = async (e) => {
    
    try{
      e.preventDefault();
      console.log("The course and faculty selected by student form  data is,",submitData);
      let response = await axios.post('http://localhost:5000/student/selectedFaculties',submitData);
      console.log("The backend response after selecting students is",response.data) 
      if(response.data.status=="Successfully added all choices to db"){
        Swal.fire({
          icon: 'success',
          title: 'Success',
          text:  "all chioces are added successfully ",
        });
      }else if(response.data.status=="Server busy"){
        Swal.fire({
          icon: 'error',
          title: 'Oops...',
          text:  "please enter valid user incorrect password",
        });
      }else if(response.data.status=="partially filled"){
        let remainingCourseNames = ``;
        for(let i =0;i<response.data.remainingCourse.length;i++){
          remainingCourseNames += `${response.data.remainingCourse[i]}, `;
        }
        console.log("The partially filled and remaining courses are ",remainingCourseNames);
        Swal.fire({
          icon: 'error',
          title: 'Oops...',
          text:  ` Your Choices are partially filled. \n The courses you need to select again are ${remainingCourseNames}`,
        });
      }
    }catch(err){
      console.log("the error in submitting the course table data is ",err);
    }
  }

  const updateStaff = (e, course_id) => {
    const { value } = e.target;
    setSubmitData(prevState => ({
      ...prevState,
      [course_id]: value
    }));
  };

    return (
      < div className='maincourse m-4'>
        <form  onSubmit={handleSubmit}>
          <Col >
            <Table  style={{width:'70%',margin:' auto'}}>
              <thead  style={{ backgroundColor: 'blue', color: 'white' }}>
                <tr>
                  <th>S.NO</th>
                  <th>Course code</th>
                  <th>Subject Name</th>
                  <th>Course type</th>
                  <th>Faculty</th>
                </tr>
              </thead>
              <tbody>
                {/* {console.log("The students is:",students)} */}
                {studentscbcstable.map(({ id,course_id, course_code, course_name, course_tpye,batch1facultyid,batch1facultyname,batch1countlimit,batch2facultyid,batch2facultyname,batch2countlimit,batch3facultyid,batch3facultyname,batch3countlimit }) => (
                  <tr key={id}>
                    <td >{id}</td>
                    <td >{course_code}</td>
                    <td >{course_name}</td>
                    <td >{course_tpye}</td>
                    <td >{Faculty(course_id,course_name,batch1facultyid,batch1facultyname,batch1countlimit,batch2facultyid,batch2facultyname,batch2countlimit,batch3facultyid,batch3facultyname,batch3countlimit)}</td> 
                  </tr>
                ))}                
              </tbody>
            </Table>
            <Button type='submit' >Submit</Button>  
            {success && <p style={{backgroundColor: 'green'}}>form is submitted sucessfully</p>}
          </Col>
        </form>
  
        <Container className='justify-content-center ' > 
          <h3 className='justify-content-center'>Faculty Details</h3>
            <Container className='staffdetails'>
              <Accordion defaultActiveKey="0">
                {facultyDesp.map(({ name, description }, index) => (
                  <Accordion.Item key={index} eventKey={index.toString()}>
                    <Accordion.Header onClick={() => setActiveAccordionItem(index)}>
                      {name}
                    </Accordion.Header>
                    <Accordion.Body>
                      {description}
                    </Accordion.Body>
                  </Accordion.Item>
                ))}
              </Accordion>
            </Container>
        </Container>
      </div>
    )
}

export const Trackertable = (props) => {
  let  tracktabledata = props.trackertablelist;
 

  return (
    <div>
      <Table className='mt-5' style={{width:'70%',margin:' auto'}}>
        <thead style={{ backgroundColor: 'blue', color: 'white' }}>
          <tr>
            <th>S.NO</th>
            <th>Subject Name</th>
            <th>Batch 1</th>
            <th>Batch 2</th>
            <th>Batch 3</th>
          </tr>
        </thead>
        <tbody>
          {tracktabledata.map(({id,course_code,faculty,course_name}) => (
            <tr key={id}>
              <td>{course_code}</td>
              <td>{course_name}</td>
              {faculty.map(({ faculty_id, alloted_count, faculty_name }) => (
                <td key={faculty_id}>
                  {faculty_name} ({alloted_count})
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </Table>
    </div>
  );
};




export default StudentCbcs;