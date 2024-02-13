import React from 'react'
import {Container,Form,Button,FloatingLabel,Row,Col} from 'react-bootstrap'
import '../Styles/loginPageStyle.css'


// admin login page component
const AdminLoginpage = () => {
  return (
    <div>
        <Container  className='logincontainer  mt-5 '>
            <Row className='justify-content-center'>
                <Col  xs={12} md={4}>
            <center><h3 >Admin Login</h3></center>
            <FloatingLabel controlId="floatingInput"     label="Email address"    className="mb-5 mt-5"   >
            <Form.Control type="email" placeholder="name@example.com" />
            </FloatingLabel>
            <FloatingLabel controlId="floatingPassword" label="Password" className="mb-5 mt-5">
            <Form.Control type="password" placeholder="Password" />
            </FloatingLabel>
            <Button variant="primary" type="submit" className='p-2 mb-4 fs-5'>LOG IN</Button>
            </Col>
            </Row>
        </Container>
        
    </div>
  )
}

export default AdminLoginpage