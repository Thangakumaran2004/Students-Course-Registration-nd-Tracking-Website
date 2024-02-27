import React from 'react'
import { Nav,Navbar ,Container,Button} from 'react-bootstrap'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import Adminsubnav from './adminSubNav'
export const Adminheader = () => {
  let deptName =JSON.parse(sessionStorage.getItem('adminDept'))
  console.log("data stored in the session storage is ",deptName);

  return (
    <div>
          
        <Navbar  style={{backgroundColor: '#0a1128',color: 'white'}}>
          <Navbar.Brand style={{color: 'white',fontWeight:'400' ,fontWeight: 'bolder'}}>Site name</Navbar.Brand>
          <Adminsubnav />
            <Container className='justify-content-end'>
        <Nav >
            <Nav.Item >Dept: {deptName}</Nav.Item>
        </Nav>
        </Container>
        <Nav className='justify-content-end'><FontAwesomeIcon icon="fa-solid fa-right-to-bracket" /></Nav>
        <Button style={{backgroundColor: '#57cc99' ,border: 'none'}}>Logout</Button>
        </Navbar>
        
    </div>
  )
}

