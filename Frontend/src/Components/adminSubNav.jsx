import React from 'react'
import {Nav,Container} from 'react-bootstrap'
import '../Styles/loginPageStyle.css'

const Adminsubnav = () => {
  return (
    <div  style={{backgroundColor: 'blue'}}>
        <Container >
                <Nav className='justify-content-center' >
                    <Nav.Link href="/adminpage/addfaculty" style={{color: 'white'}}>Faculty</Nav.Link>
                    <Nav.Link href="/adminpage/addstudent" style={{color: 'white'}}>Student</Nav.Link>
                    <Nav.Link href="/adminpage/allotcourse" style={{color: 'white'}}>Course</Nav.Link>
                    
                </Nav>
        </Container>
    </div>
  )
}

export default Adminsubnav