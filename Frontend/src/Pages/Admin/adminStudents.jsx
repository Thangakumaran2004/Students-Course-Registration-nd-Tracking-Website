import React, { useState } from 'react'
import { Adminheader } from '../../Components/header'
import { Container, Row,Col,Form, Button} from 'react-bootstrap'
import Adminsubnav from '../../Components/adminSubNav'
const Adminaddstudent = () => {
  return (
    <div>
      <Adminheader />
      <Adminsubnav />
      <Addstudent />      






        {/* <nav className="col-md-2 d-none d-md-block bg-light sidebar">
      <div className="sidebar-sticky">
        <ul className="nav flex-column">
          <li className="nav-item">
            <a className="nav-link active" href="#">
              Dashboard <span className="sr-only">(current)</span>
            </a>
          </li>
          <li className="nav-item">
            <a className="nav-link" href="#">
              Orders
            </a>
          </li>
          <li className="nav-item">
            <a className="nav-link" href="#">
              Products
            </a>
          </li>
          <li className="nav-item">
            <a className="nav-link" href="#">
              Customers
            </a>
          </li>
          <li className="nav-item">
            <a className="nav-link" href="#">
              Reports
            </a>
          </li>
          <li className="nav-item">
            <a className="nav-link" href="#">
              Integrations
            </a>
          </li>
        </ul>
      </div>
    </nav> */}

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
      <Container>
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




export default Adminaddstudent