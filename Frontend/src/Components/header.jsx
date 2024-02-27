import React from 'react'
import { Nav,Navbar ,Container} from 'react-bootstrap'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
export const Adminheader = () => {
  let deptName =JSON.parse(sessionStorage.getItem('adminDept'))
  console.log("data stored in the session storage is ",deptName);

  return (
    <div>
        <Navbar className='bg-success'>
            <Container className='justify-content-center'>
        <Nav >
            <Nav.Item className='fs-4 fw-2'>{deptName}</Nav.Item>
        </Nav>
        </Container>
        <Nav className='justify-content-end'><FontAwesomeIcon icon="fa-solid fa-right-to-bracket" /></Nav>
        </Navbar>
    </div>
  )
}

