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
const [showTable,setShowTable]=useState(true);
const [error, setError]=useState(false)
 
const CourseTableData =async ()=>{
  try{
    console.log("The form data is,",postStudentDetails);
      
        let response = await axios.post('http://localhost:5000/student/getCourseAndFacultyDetails',postStudentDetails);
        if(response.data.getAllotedFacultiesAndCoursesStatus=='successfully got'){
         setFacultyDescription(response.data.facultyDescription);
         setStudentTableData(response.data.tableDetails);
         setShowTable(false);
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

//below function will contain the main course details

export const Maincourse=(props) =>{


  let facultyDesp=props.facultydescription;
  console.log(facultyDesp);
  // let students=props.totaltablelist;
  const [activeAccordionItem, setActiveAccordionItem] = useState(null);
  const[submitData,setSubmitData]=useState(
    /*{'studentSemester':studentDetailsString.sem ,
    'studentYear':studentDetailsString.year,
    'studentBatch':studentDetailsString.batch,
    'studentDept':studentDetailsString.dept
    
  }*/);
  const[success,setSucess]=useState(false)



  function Faculty( course_name,b1id, b1name, b1count, b2id, b2name, b2count, b3id, b3name, b3count) {
    return (
      <select onChange={(e) => updateStaff(e, course_name)}>
        <option value={b1id}>{b1name} ({b1count})</option>
        <option value={b2id}>{b2name} ({b2count})</option>
        <option value={b3id}>{b3name} ({b3count})</option>
      </select>
    );
  }
  

  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log("The form data is,",submitData);
    try{
      
        
          let response = await axios.post('http://localhost:5000/student/getCourseAndFacultyDetails',);
          if(response.data.getAllotedFacultiesAndCoursesStatus=='successfully got'){
                     

  
          }else if(response.data.getAllotedFacultiesAndCoursesStatus=='Server Busy'){
              setError(true);
          }
        }catch(err){
          console.log("the error in submitting the course table data is ",err);
        }
  }


  const updateStaff = (e, subjectName) => {
    const { value } = e.target;
    setSubmitData(prevState => ({
      ...prevState,
      [subjectName]: value
    }));
  };
  
//   let students=[{ "course_code":2121, "course_name":'englsih', "course_tpye":"elective","batch1facultyid":"1","batch1facultyname":"a","batch1countlimit":10,"batch2facultyid":"11","batch2facultyname":"d","batch2countlimit":"30","batch3facultyid":1,"batch3facultyname":"z","batch3countlimit":21 },
//                     { "course_code":2121, "course_name":'tamil', "course_tpye":"elective","batch1facultyid":"2","batch1facultyname":"b","batch1countlimit":10,"batch2facultyid":12,"batch2facultyname":"e","batch2countlimit":"30","batch3facultyid":2,"batch3facultyname":"y","batch3countlimit":32 },
//                     { "course_code":2121, "course_name":'Maths', "course_tpye":"elective","batch1facultyid":"3","batch1facultyname":"c","batch1countlimit":10,"batch2facultyid":"13","batch2facultyname":"f","batch2countlimit":20,"batch3facultyid":3,"batch3facultyname":"w","batch3countlimit":11}
// ]





    return (
        < div className='maincourse'>
        <Row  className='justify-content-center'>
        <form  onSubmit={handleSubmit}>
            <Col md={2}>
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
                <td >{Faculty(course_name,batch1facultyid,batch1facultyname,batch1countlimit,batch2facultyid,batch2facultyname,batch2countlimit,batch3facultyid,batch3facultyname,batch3countlimit)}</td>
          
              </tr>
            ))}
         
                  
                </tbody>
                </Table>
                <Button type='submit' >Submit</Button>
                
                    {success && <p style={{backgroundColor: 'green'}}>form is submitted sucessfully</p>}
                </Col>
                </form>
             <Col>
                  <Container className='justify-content-center '>
                  
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