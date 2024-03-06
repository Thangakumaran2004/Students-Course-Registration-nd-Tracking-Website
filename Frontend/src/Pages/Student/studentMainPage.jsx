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

  const postStudentDetails={'studentSemester':studentDetailsString.sem ,'studentYear':studentDetailsString.year,'studentBatch':studentDetailsString.batch,'studentDept':studentDetailsString.dept}
  const[facultyDescription,setFacultyDescription]=useState([]);
  const[studentTabeData,setStudentTableData]=useState([]);
const [showTable,setShowTable]=useState(false);
const [error, setError]=useState(false)
 
const CourseTableData =async ()=>{
  try{
      
        let response = await axios.post('http://5000/student/getCourseAndFacultyDetails',postStudentDetails);
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





// the beow function will have the details of the student






//Dummy function that is used to display the faculty details
export function Faculty(b1id,b1name,b1count,b2id,b2name,b2count,b3id,b3name,b3count){
  return (
    <select>
      <option value={b1id}>{b1name}{b1count}</option>
      <option value={b2id}>{b2name}{b2count}</option>
      <option value={b3id}>{b3name}{b3count}</option>
    </select>
  )
}
//below function will contain the main course details

export const Maincourse=(props) =>{


  let facultyDesp=props.facultydescription;
  console.log(facultyDesp);
  let students=props.totaltablelist;
  const [activeAccordionItem, setActiveAccordionItem] = useState(null);








    return (
        < div className='maincourse'>
        <Row  className='justify-content-center'>
            <Col md={8}>
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

                {students.map(({ id, course_code, course_name, course_tpye,batch1facultyid,batch1facultyname,batch1countlimit,batch2facultyid,batch2facultyname,batch2countlimit,batch3facultyid,batch3facultyname,batch3countlimit }) => (
              <tr key={id}>
                <td >{id}</td>
                <td >{course_code}</td>
                <td >{course_name}</td>
                <td >{course_tpye}</td>
                <td >{Faculty(batch1facultyid,batch1facultyname,batch1countlimit,batch2facultyid,batch2facultyname,batch2countlimit,batch3facultyid,batch3facultyname,batch3countlimit)}</td>
              </tr>
            ))}
         
                  
                </tbody>
                </Table>
                </Col>
             <Col>
                  <Container className='justify-content-center ' md={4}>
                  
                    <h3>Faculty Details</h3>
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
                
                </Col>
      </Row>
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