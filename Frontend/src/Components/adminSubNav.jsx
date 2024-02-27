import React from 'react'
import {Nav,Container} from 'react-bootstrap'
import '../Styles/loginPageStyle.css'

const Adminsubnav = () => {
  return (
    <div  style={{ fontFamily: 'sans-serif',fontSize:'1rem'}}>
        <Container >
                <Nav className='justify-content-start' >
                  <Nav.Link href='/adminpage' className='adminsubnav'>Home</Nav.Link>
                    <Nav.Link href="/adminpage/faculty" className='adminsubnav' >Faculty</Nav.Link>
                    <Nav.Link href="/adminpage/student" className='adminsubnav' >Student</Nav.Link>
                    <Nav.Link href="/adminpage/allotcourse" className='adminsubnav' >Course</Nav.Link>
                    
                </Nav>
        </Container>
    </div>
  )
}

export default Adminsubnav