import React,{useState} from 'react'
import {Container,Form,Button,FloatingLabel,Row,Col} from 'react-bootstrap'
import '../Styles/loginPageStyle.css'


// admin login page component
const AdminLoginpage = () => {
  const [logincred ,updateForm]=useState({
    'username':  '',
    'password':  '' 
  }) 

const handlingChange =(e) =>{
  const {name,value}=e.target;
  updateForm(prevState =>({
    ...prevState,
    [name]: value
  }));
};

const formsubmit = async (e) =>{
  e.preventDefault();
  console.log(logincred)
  try{
    const response= await axios.post('https://localhost:5000/adminLogin', logincred)
     console.log("Form data was submitted sucessfully",response.data)
   }catch{
     console.log("error Ocurred")
   }
}

  return (
    <div>
        <Container  className='logincontainer  mt-5 '>
          <Form onSubmit={formsubmit}>
            <Row className='justify-content-center'>
                <Col  xs={12} md={4}>
            <center><h3 >Admin Login</h3></center>
            <FloatingLabel controlId="floatingInput"     label="Email address"    className="mb-5 mt-5"   >
            <Form.Control type="email" name='username'  value={logincred.username} placeholder="name@example.com" onChange={handlingChange}  />
            </FloatingLabel>
            <FloatingLabel controlId="floatingPassword"  label="Password" className="mb-5 mt-5">
            <Form.Control type="password" value={logincred.password}  onChange={handlingChange} name='password' placeholder="Password" />
            </FloatingLabel>
            <Button variant="primary" type="submit" className='p-2 mb-4 fs-5'>LOG IN</Button>
            </Col>
            </Row>
            </Form>
        </Container>
        
    </div>
  )
}

export default AdminLoginpage