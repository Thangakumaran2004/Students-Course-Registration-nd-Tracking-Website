import React, {useState} from 'react'
import { Adminheader } from '../../Components/header';
import { Container, Row,Col,Form, Button} from 'react-bootstrap'
import '../../Styles/adminStudentstyle.css'
import Studentsidebar from '../../Components/sideBar';

const AdminAddStudent = () => {
  return (
    <div>
        <Adminheader />
        <Studentsidebar />
        <Addstudent />
    </div>
  )
}





export function Addstudent(){

    const [addStudent,setaddStudent]=useState({
            'studentname':'',
            'sem': '',
            'batch':'',
            'registerno':''
    })
    const[success,setsuccess]=useState(false);
    const[alreadyexists,setexists]=useState(false);
  
    const newstudentdata =(e)=>{
      const {name,value}=e.target;
      setaddStudent(prevState =>({
        ...prevState,
        [name]: value
      }));
    }
  
  
    const  submitstudentdata = async(e) =>{
      e.preventDefault();
      console.log("Form Data:", addStudent);
      try{
      const response=await axios.post('http://localhost',addStudent);
      if(response.data.data==''){
          setsuccess(true);
      }else{
          setexists(true);
      }
    }catch(e){
        console.warn("error",e)
    }
    }
  
  
    return(
      <div>
        <Container className='addstudentform'>
        <center><h3>Student Details</h3></center><br />
            <Form onSubmit={submitstudentdata}>
              <Col>
                <Row>
                  <Form.Group>
                      <Form.Label>Enter the Student Name</Form.Label>
                      <Form.Control type='text'  name='studentname' value={addStudent.studentname} onChange={newstudentdata}/>
                  </Form.Group>
                </Row>
                <Row>
                  <Form.Group>
                      <Form.Label>Enter the sem</Form.Label>
                      <Form.Control type='text'  name='sem' value={addStudent.sem} onChange={newstudentdata}/>
                  </Form.Group>
                </Row>
                <Row>
                  <Form.Group>
                      <Form.Label>Enter the Register no</Form.Label>
                      <Form.Control type='text'  name='registerno' value={addStudent.registerno} onChange={newstudentdata} />
                  </Form.Group>
                </Row>
                <Row>
                  <Form.Group>
                      <Form.Label>Enter the Batch</Form.Label>
                      <Form.Control type='text' name='batch' value={addStudent.batch} onChange={newstudentdata} />
                  </Form.Group>
                </Row>
              </Col>
              <Button variant='success' type='submit'>Add Student</Button>
            </Form>
            {success && <p style={{color: 'green',fontStyle:'italic'}}>student Data aded sucessfully.  .  .  .  .  .</p>}
            {alreadyexists && <p style={{color: 'red',fontStyle:'italic'}}>student Data already exists.  .  .  .  .  .</p>}
        </Container>
      </div>
    )
  }

export default AdminAddStudent