import React, { useState } from 'react'
import {Container,Row,Col,Nav,Image,Table, Button,Accordion} from 'react-bootstrap'
import { CircularProgressbar } from 'react-circular-progressbar';
import '../../Styles/studentMainPage.css'
import StudentHeader from '../../Components/studentHeader';
import axios from 'axios'

let  studentDetailsString=JSON.parse(sessionStorage.getItem('studentData')) ;
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
    console.log("Submit button clicked");
        let response=await axios.post('http://localhost:5000/student/getCourseAndFacultyDetails',postStudentDetails);

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


export const  Dashboard= () => {

  

 if(studentDetailsString != null){
    // Parse the JSON string to convert it into a JavaScript object
    console.log("Retrieved student details from session storage:", studentDetailsString);
    // Now you can use studentDetails object as needed
 }else{
      console.log("No student details found in session storage.");
 }

  return (
    <div className='dashboard  shadow p-3 mb-5  rounded m-3  border-2 '>
        <Container  className='m-2 '>
                    <Row  className='justify-content-center'>
                        <Col  className='mt-2 '>
                        <Image src='data:image/jpeg;base64,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' rounded/></Col>
                        <Col  className='mt-1 '>
                            <Row>Name : {studentDetailsString.name}</Row>
                            <Row>Batch:  {studentDetailsString.batch}</Row>
                            <Row>Register No:  {studentDetailsString.regno}</Row>
                        </Col>
                        <Col  className='mt-2'>
                        <Row>Year:  {studentDetailsString.year}</Row>
                            <Row>Semester:  {studentDetailsString.sem} </Row>
                            <Row>TotalCredits:  {studentDetailsString.totalCredits} </Row>
                        </Col>
                    </Row>
        </Container>
    
    </div>
  )
}

// export const Circlebar= () =>{

// return
// <div style={{ width: 200, height: 200 }}>
//   <CircularProgressbar value={66}  maxValue={100} />
// </div>
            
// } ;


//id, course_id, course_name, course_tpye,batch1facultyid,batch1facultyname,batch1countlimit,batch2facultyid,batch2facultyname,batch2countlimit,batch3facultyid,batch3facultyname,batch3countlimit 
//Dummy for creating dynamic table
// const students = [
//   { id: 1, course_id: 'a1', course_name: 'Tamil',  course_tpye: 25,batch1facultyid: '1',batch1facultyname:'aa',batch1countlimit:'32',batch2facultyid:'5',batch2facultyname:'he',batch2countlimit:'32',batch3facultyid:'9',batch3facultyname:'he',batch3countlimit:'32' },
//   { id: 2,  course_id: 'a1', course_name: 'English', course_tpye: 43,batch1facultyid: '2',batch1facultyname:'he',batch1countlimit:'32',batch2facultyid:'6',batch2facultyname:'he',batch2countlimit:'32',batch3facultyid:'10',batch3facultyname:'he',batch3countlimit:'32' },
//   { id: 3, course_id: 'a1', course_name: 'Maths', course_tpye: 16,batch1facultyid: '3',batch1facultyname:'he',batch1countlimit:'32',batch2facultyid:'7',batch2facultyname:'he',batch2countlimit:'32',batch3facultyid:'11',batch3facultyname:'he',batch3countlimit:'32' },
//   { id: 4, course_id: 'a1', course_name: 'science', course_tpye: 29,batch1facultyid: '4',batch1facultyname:'he',batch1countlimit:'32',batch2facultyid:'8',batch2facultyname:'he',batch2countlimit:'32',batch3facultyid:'12',batch3facultyname:'he',batch3countlimit:'32' }
// ];

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