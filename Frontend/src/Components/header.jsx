import React from 'react'
import { Nav,Navbar ,Container} from 'react-bootstrap'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
export const Adminheader = () => {
  let deptname =sessionStorage.getItem('adminData')
  console.log("data stored in the session storage is ",deptname);
  let deptName=JSON.parse(deptname);
  console.log(deptName);
  return (
    <div>
        <Navbar className='bg-success'>
            <Container className='justify-content-center'>
        <Nav >
            <Nav.Item className='fs-4 fw-2'>{deptName.adminDept}</Nav.Item>
        </Nav>
        </Container>
        <Nav className='justify-content-end'><FontAwesomeIcon icon="fa-solid fa-right-to-bracket" /></Nav>
        </Navbar>
    </div>
  )
}

