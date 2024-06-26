import React, { useState } from 'react';
import {useNavigate,Link} from 'react-router-dom'
import { Container, Form, Button, FloatingLabel, Row, Col } from 'react-bootstrap';
import '../../Styles/loginPageStyle.css';
import axios from 'axios'
import {Nav} from 'react-bootstrap'
import Swal from 'sweetalert2';


export function Header(){
  return (
    <Nav className='justify-content-end  p-3 header'>
     <Link to={'/studentlogin'} className='headerlink'>STUDENT LOGIN</Link>
     <Link to={'/adminlogin'} className='headerlink'>ADMIN LOGIN</Link>
     <Link to={'/'} className='headerlink'>COE LOGIN</Link>
    </Nav>
  )
}

// Student login page component
const StudentLoginpage = () => {
  const [stddetails, UpdatestuDetails] = useState({
    'username': '',
    'password': ''
  });

const [logIn,setLoggeIn]=useState(false); 
const [error, setError]=useState(false);
const [unacess, setUaccess]=useState(false);
const navigate=useNavigate();



var dummyResult = {
  studentStatus: "dummy student",
  regno: "dummy regno",
  dept: "dummy dept",
  name: "dummy name",
  year: "dummy year",
  sem: "dummy sem",
batch: "dummy batch",
  totalCredits: "dummy total credits",
  mainCourseCredits: "dummy main course credits",
  programElectiveCredits: "dummy program elective credits",
  openElectiveCredits: "dummy open elective credits"
}






  const handlingFormdata = (e) => {
    const { name, value } = e.target;
    UpdatestuDetails(prevState => ({
      ...prevState,
      [name]: value
    }));
  };
  
  const stuformsubmit = async (e) => {
    e.preventDefault();
    
    if(!stddetails.username || !stddetails.password){
      setError(true);
      Swal.fire({
        icon: 'error',
        title: 'Oops...',
        text:  "Please enter valid id and password",
      });
      e.stopPropagation();
      return;
    }
    //console.log("The frontend form data is",stddetails);
   
    // sessionStorage.setItem('studentData',JSON.stringify(dummyResult)) 
    // console.log(dummyResult);
    try{
      let response = await axios.post('http://localhost:5000/studentLogin', stddetails) ;
        
          console.log("the backend data is",response.data);
           sessionStorage.setItem('studentData',JSON.stringify(response.data)) 
          //console.log("the student status is ",response.data.studentStatus);
          if(response.data.studentStatus == 'valid user correct password'){
            console.log("Navigated properly");
          //  sessionStorage.setItem('studentData',JSON.stringify(dummyResult)) 
           navigate('/studentpage');
          }else if(response.data.studentStatus=='valid user incorrect password' || 'Student not found invalid user'){
            Swal.fire({
              icon: 'error',
              title: 'Oops...',
              text:  "please enter valid user incorrect password",
            });

            if(response.data.studentStatus=='valid user incorrect password'){
              Swal.fire({
                icon: 'error',
                title: 'Oops...',
                text:  "valid user incorrect password",
              });
            }else if(response.data.studentStatus=='Student not found invalid user'){
              Swal.fire({
                icon: 'error',
                title: 'Oops...',
                text:  "Student not found invalid user",
              });
            }
            console.log('Error occured');
                setError(true);
          }
     

    }catch(e){
      console.log("Error hapened while fetching response from studentLogin API",e);
    }
    };

  return (
    <div className='logincon'>
      <Header />
      <br />
      <br/>
      
        <Form onSubmit={stuformsubmit} className='  mt-5' >
          <Row className='justify-content-center '>
            <Col xs={8} md={4} className='logincontainer p-4'>
              <center><h3>STUDENT LOGIN</h3></center>
              <FloatingLabel controlId="floatingInput" label="Register No" className="mb-5 mt-5">
                <Form.Control type="text" name='username' placeholder="Register number" value={stddetails.username} onChange={handlingFormdata} />
              </FloatingLabel>
              <FloatingLabel controlId="floatingPassword" label="Password" className="mb-5 mt-5">
                <Form.Control type="password" name='password' onChange={handlingFormdata} value={stddetails.password} placeholder="Password" />
              </FloatingLabel>
             {/*{ (error) ?<SweeetAlert  alertmessage={"username or password is incorrect"}/>:null}
               {unacess && <p style={{color: 'red'}}>Unable to  login</p>} */}
              <Button variant="success" type="submit" className='p-2 mb-4 fs-5'>LOG IN</Button>
            </Col>
          </Row>
        </Form>

    </div>
  );
};

export default StudentLoginpage;
