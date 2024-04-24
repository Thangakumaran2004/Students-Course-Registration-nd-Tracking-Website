import React,{useState} from 'react'
import {Container,Form,Button,FloatingLabel,Row,Col} from 'react-bootstrap'
import '../../Styles/loginPageStyle.css'
import { Header } from '../Student/studentLoginPage'
import axios from 'axios'
import {useNavigate } from 'react-router-dom'

// admin login page component
const AdminLoginpage = () => {
  const navigate=useNavigate();
  const [logincred ,updateForm]=useState({
    'username':  '',
    'password':  '' 
  }) ;
  const [error, setError]=useState(false);
const [unacess, setUaccess]=useState(false);

const handlingChange =(e) =>{
  const {name,value}=e.target;
  updateForm(prevState =>({
    ...prevState,
    [name]: value
  }));
};

const formsubmit = async (e) =>{
  e.preventDefault(); 
  console.log("Frontend data ",logincred);

  if(logincred.username && logincred.password)
  try{
    let response = await axios.post('http://localhost:5000/adminLogin', logincred);
    console.log("The data from backend is ", response.data);
    if(response.data.adminStatus=='valid user correct password'){
      //console.log("Navigated successfully");
      sessionStorage.setItem('adminDept',JSON.stringify(response.data.adminDept));
       navigate("/adminpage") ;
              
      }else if(response.data.adminStatus=='username not found invalid user' || response.data.adminStatus=='valid user incorrect password'){
            console.log("username not found invalid user");
            setError(true);
      }else{
        console.log("Server busy error");
        setUaccess(true)
      }
    
  }catch(e){
    console.log("Error hapened while fetching response from AdminLogin API",e);
  }
}
  return (
    <div className='adminlogincon'>
      <Header />
        <Container  className=' mt-5 '>
          <Form onSubmit={formsubmit}>
            <Row className='justify-content-center'>
                <Col  xs={12} md={4} className='logincontainer p-4'>
            <center><h3 >Admin Login</h3></center>
            <FloatingLabel controlId="floatingInput"     label="Name"    className="mb-5 mt-5"   >
            <Form.Control type="text" name='username'  value={logincred.username} placeholder="name@example.com" onChange={handlingChange}  />
            </FloatingLabel>
            <FloatingLabel controlId="floatingPassword"  label="Password" className="mb-5 mt-5">
            <Form.Control type="password" value={logincred.password}  onChange={handlingChange} name='password' placeholder="Password" />
            </FloatingLabel>
            {error && <p style={{color: 'red'}}>Invalid username or password</p>}
              {unacess && <p style={{color: 'red'}}>Unable to  login</p>}
            <Button variant="primary" type="submit" className='p-2 mb-4 fs-5'>LOG IN</Button>
            </Col>
            </Row>
            </Form>
        </Container>
        
    </div>
  )
}

export default AdminLoginpage