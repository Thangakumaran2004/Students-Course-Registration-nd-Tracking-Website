import React from 'react'
import {Container,Form,Button,FloatingLabel,Row,Col} from 'react-bootstrap'
import '../Styles/loginPageStyle.css'


//student login page component
const StudentLoginpage = () => {
  return (
    <div>
        <Container  className='logincontainer  mt-5 '>
            <Row className='justify-content-center'>
                <Col  xs={8} md={4}>
           <center> <h3 >STUDENT LOGIN</h3></center>
            <FloatingLabel controlId="floatingInput"     label="Email address"    className="mb-5 mt-5"   >
            <Form.Control type="email" placeholder="name@example.com" />
            </FloatingLabel>
            <FloatingLabel controlId="floatingPassword" label="Password" className="mb-5 mt-5">
            <Form.Control type="password" placeholder="Password" />
            </FloatingLabel>
            <Button variant="success" type="submit" className='p-2 mb-4 fs-5'>LOG IN</Button>
            </Col>
            </Row>
        </Container>
    </div>
  )
}

export default StudentLoginpage