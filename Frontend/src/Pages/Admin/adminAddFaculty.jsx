import React,{useState} from 'react'
import { Adminheader } from '../../Components/header'
import { Container, Row,Col,Form, Button} from 'react-bootstrap';
import axios from 'axios';
import Adminsubnav from '../../Components/adminSubNav'
import FacultyOffCanvas from '../../Components/facultyOffCanvas';
import '../../Styles/adminStudentstyle.css'
import FacultySideBar from '../../Components/facultySideBar';

const Adminaddfaculty = () => {
  return (
    <div>
    <Adminheader />
    <FacultySideBar />
    <Addfaculty />      
  </div>
  )
}



export function Addfaculty(){



    const [addFaculty,setaddFaculty]=useState({
        'facultyName':'',
        'facultyId':'',
        'facultyDept':'',
        'facultyDesignation':'',
        'facultyDescription':''
})
const[success,setsuccess]=useState(false);
const[alreadyexists,setexists]=useState(false);

const newfacultydata =(e)=>{
  const {name,value}=e.target;
  setaddFaculty(prevState =>({
    ...prevState,
    [name]: value
  }));
}


const  submitfacultydata = async(e) =>{
  e.preventDefault();
  try{
  console.log("Form Data:", addFaculty);
  const response = await axios.post('http://localhost:5000/admin/addNewFaculty',addFaculty);
  console.log()
  if(response.data. facultyAddStatus =="Successfully added faculty to db"){
      setsuccess(true);
  }else{
      setexists(true);
  }
}catch(err){
  console.log("Error occured in adding faculties,",err);
}
}



  return(
    <div>
      
      <Container className='addfacultyform'>
        <center><h3>Faculty Details</h3></center>
          <Form onSubmit={submitfacultydata}>
            <Col>
              <Row>
                <Form.Group>
                    <Form.Label>Enter the Faculty Name</Form.Label>
                    <Form.Control type='text'  name='facultyName' value={addFaculty.facultyName} onChange={newfacultydata} />
                </Form.Group>  
              </Row>
              <Row>
                <Form.Group>
                    <Form.Label>Enter the Faculty Id</Form.Label>
                    <Form.Control type='text'  name='facultyId' value={addFaculty.facultyId} onChange={newfacultydata} />
                </Form.Group>  
              </Row>
              <Row>
                <Form.Group>
                    <Form.Label>Enter the Faculty Dep</Form.Label>
                    <Form.Control type='text'  name='facultyDept' value={addFaculty.facultyDept} onChange={newfacultydata} />
                </Form.Group>  
              </Row>
              <Row>
                <Form.Group> 
                    <Form.Label>Enter the Faculty Designation</Form.Label>
                    <Form.Control type='text'  name='facultyDesignation' value={addFaculty.facultyDesignation} onChange={newfacultydata} />
                </Form.Group>  
              </Row>
              <Row>
                <Form.Group>
                    <Form.Label>Enter the Faculty Description</Form.Label>
                    <Form.Control type='text'  name='facultyDescription' value={addFaculty.facultyDescription} onChange={newfacultydata} />
                </Form.Group>
              </Row>
            </Col>
            <Button type='submit' variant='success'>Add Faculty</Button>
          </Form>
          {success && <p style={{color: 'green',fontStyle:'italic'}}>Faculty Data aded sucessfully.  .  .  .  .  .</p>}
          {alreadyexists && <p style={{color: 'red',fontStyle:'italic'}}>Faculty Data already exists.  .  .  .  .  .</p>}
      </Container>
    </div>
  )
}

export default Adminaddfaculty