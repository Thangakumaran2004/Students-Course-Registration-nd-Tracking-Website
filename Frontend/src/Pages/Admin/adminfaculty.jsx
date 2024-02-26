import React,{useState} from 'react'
import { Adminheader } from '../../Components/header'
import { Container, Row,Col,Form, Button} from 'react-bootstrap';
import axios from 'axios';
import Adminsubnav from '../../Components/adminSubNav'
const Adminaddfaculty= () => {




  return (
    <div>
      <Adminheader />
      <Adminsubnav />
      <Addfaculty />      






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
      <Container>
          <Form onSubmit={submitfacultydata}>
            <Col>
              <Row>
                <Form.Group>
                    <Form.Label>Enter the Faculty Name</Form.Label>
                    <Form.Control type='text'  name='facultyName' value={addFaculty.facultyname} onChange={newfacultydata} />
                </Form.Group>  
              </Row>
              <Row>
                <Form.Group>
                    <Form.Label>Enter the Faculty Id</Form.Label>
                    <Form.Control type='text'  name='facultyId' value={addFaculty.facultyid} onChange={newfacultydata} />
                </Form.Group>  
              </Row>
              <Row>
                <Form.Group>
                    <Form.Label>Enter the Faculty Dep</Form.Label>
                    <Form.Control type='text'  name='facultyDept' value={addFaculty.facultydept} onChange={newfacultydata} />
                </Form.Group>  
              </Row>
              <Row>
                <Form.Group>
                    <Form.Label>Enter the Faculty Designation</Form.Label>
                    <Form.Control type='text'  name='facultyDesignation' value={addFaculty.facultydesignation} onChange={newfacultydata} />
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
          {success && <p style={{color: 'green',fontStyle:'italic'}}>student Data aded sucessfully.  .  .  .  .  .</p>}
          {alreadyexists && <p style={{color: 'red',fontStyle:'italic'}}>student Data already exists.  .  .  .  .  .</p>}
      </Container>
    </div>
  )
}




export default Adminaddfaculty