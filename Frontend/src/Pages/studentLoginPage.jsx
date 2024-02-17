import React, { useState } from 'react';
import { Container, Form, Button, FloatingLabel, Row, Col } from 'react-bootstrap';
import '../Styles/loginPageStyle.css';
import axios from 'axios'
import {Nav} from 'react-bootstrap'


export function Header(){
  return (
    <Nav className='justify-content-end bg-success p-3'>
      <Nav.Link className='text-light'>STUDENT LOGIN</Nav.Link>
      <Nav.Link className='text-light'>ADMIN LOGIN</Nav.Link>
      <Nav.Link className='text-light'>COE LOGIN</Nav.Link>
    </Nav>
  )
}

// Student login page component
const StudentLoginpage = () => {
  const [stddetails, UpdatestuDetails] = useState({
    'username': '',
    'password': ''
  });

  const handlingFormdata = (e) => {
    const { name, value } = e.target;
    UpdatestuDetails(prevState => ({
      ...prevState,
      [name]: value
    }));
  };
  
  const stuformsubmit = async (e) => {
    e.preventDefault();
    console.log(stddetails);
    
    try{
      let response = await axios.post('http://localhost:5000/studentLogin', stddetails) ;
      console.log(response);
    }catch(e){
      console.log("Error hapened while fetching response from studentLogin API",e);
    }

      
     /* axios.get('http://localhost:5000/studentLogin').then((req) =>{
        console.log(req.data);
       }).catch((errr) =>{
        console.error("Error: ",errr);
       })*/
  
  
  
    };

  return (
    <div>
      <Header />
      <br />
      <br/>
      <Container className='logincontainer mt-5' >
        <Form onSubmit={stuformsubmit}>
          <Row className='justify-content-center'>
            <Col xs={8} md={4}>
              <center><h3>STUDENT LOGIN</h3></center>
              <FloatingLabel controlId="floatingInput" label="Email address" className="mb-5 mt-5">
                <Form.Control type="text" name='username' placeholder="name@example.com" value={stddetails.username} onChange={handlingFormdata} />
              </FloatingLabel>
              <FloatingLabel controlId="floatingPassword" label="Password" className="mb-5 mt-5">
                <Form.Control type="password" name='password' onChange={handlingFormdata} value={stddetails.password} placeholder="Password" />
              </FloatingLabel>
              <Button variant="success" type="submit" className='p-2 mb-4 fs-5'>LOG IN</Button>
            </Col>
          </Row>
        </Form>
      </Container>
    </div>
  );
};

export default StudentLoginpage;
