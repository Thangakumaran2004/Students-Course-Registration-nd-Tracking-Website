import React, { useState } from 'react'
import {Container,Row,Col,Nav,Image,Table, Button,Accordion} from 'react-bootstrap'
import { CircularProgressbar } from 'react-circular-progressbar';
import '../../Styles/studentMainPage.css'
import StudentHeader from '../../Components/studentHeader';
import axios from 'axios'
import { Dashboard } from './dashboard';

let  studentDetailsString = JSON.parse(sessionStorage.getItem('studentData')) ;
console.log("ThestudentDetailsString is", studentDetailsString);

 
// the below function will the have the function components of dashboard course navigation and main courses
const Studentpage = () => {

  const postStudentDetails={'studentSemester':studentDetailsString.sem ,'studentYear':studentDetailsString.year,'studentBatch':studentDetailsString.batch,'studentDept':studentDetailsString.dept};
  const[facultyDescription,setFacultyDescription]=useState([]);
  const[studentTabeData,setStudentTableData]=useState([]);
  const [showTable,setShowTable]=useState(false);
  const [error, setError]=useState(false)
 
  const CourseTableData =async ()=>{
    try{
      console.log("The course selected form data is,",postStudentDetails);
      let response = await axios.post('http://localhost:5000/student/getCourseAndFacultyDetails',postStudentDetails);
      if(response.data.getAllotedFacultiesAndCoursesStatus=='successfully got'){
      setFacultyDescription(response.data.facultyDescription);
      setStudentTableData(response.data.tableDetails);
      setShowTable(true);
      setError(false);
      }else if(response.data.getAllotedFacultiesAndCoursesStatus=='Server Busy'){
        setError(true);
      }
    }catch(err){
      console.log("the error in fetching  the course table data is ",err);
    }
  }

  return (
    <>
      <StudentHeader />
      <Dashboard/>
      {/* <Circlebar /> */}
      <Button className='alignitems-end' onClick = {CourseTableData}  type='button'>Click here</Button>
      {(showTable)?  <Maincourse  totaltablelist={studentTabeData}  facultydescription={facultyDescription}/>:<p>Click on the above button to fill CBCS</p> }
        {error && <p>server busy</p>}
    </>
  )
}

export const Maincourse=(props) =>{

  let facultyDesp=props.facultydescription;
  console.log(facultyDesp);
  let students=props.totaltablelist;
  const [activeAccordionItem, setActiveAccordionItem] = useState(null);
  const[submitData,setSubmitData]=useState(

    {studentSemester:studentDetailsString.sem ,
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
    e.preventDefault();
    try{
      console.log("The course and faculty selected by student form  data is,",submitData);
      let response = await axios.post('http://localhost:5000/student/selectedFaculties',submitData);
      console.log("The backend response after selecting students is",response.data) 
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
      < div className='maincourse m-5'>
        <form  onSubmit={handleSubmit}>
          <Col >
            <Table >
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
                {console.log("The students is:",students)}
                {students.map(({ id,course_id, course_code, course_name, course_tpye,batch1facultyid,batch1facultyname,batch1countlimit,batch2facultyid,batch2facultyname,batch2countlimit,batch3facultyid,batch3facultyname,batch3countlimit }) => (
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

export const Electivecourse = () => {
  return (
    <div>St</div>
  )
}

export const Nptel = () => {
  return (
    <div>Hello wrold</div>
  )
}

export default Studentpage;