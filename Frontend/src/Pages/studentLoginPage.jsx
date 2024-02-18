import React, { useState } from 'react';
import {useNavigate,Link} from 'react-router-dom'
import { Container, Form, Button, FloatingLabel, Row, Col } from 'react-bootstrap';
import '../Styles/loginPageStyle.css';
import axios from 'axios'
import {Nav} from 'react-bootstrap'


export function Header(){
  return (
    <Nav className='justify-content-end bg-success p-3'>
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
const [error, setError]=useState(false);
const [unacess, setUaccess]=useState(false);
const navigate=useNavigate();




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
      e.stopPropagation();
      return;
    }
    console.log(stddetails);
    
    try{
      let response = await axios.post('http://localhost:5000/studentLogin', stddetails) ;
        
        if(response.data.status==200){
          if(response.data.data==='valid user with correct password'){
           navigate('/studentpage');
          }else if(response.data.data==='valid user wrong password'){
                setError(true);
          }
     }else{
      setUaccess(true);
     }

    }catch(e){
      console.log("Error hapened while fetching response from studentLogin API",e);
    }
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
              {error && <p style={{color: 'red'}}>Invalid username or password</p>}
              {unacess && <p style={{color: 'red'}}>Unable to  login</p>}
              <Button variant="success" type="submit" className='p-2 mb-4 fs-5'>LOG IN</Button>
            </Col>
          </Row>
        </Form>
      </Container>
    </div>
  );
};

export default StudentLoginpage;
