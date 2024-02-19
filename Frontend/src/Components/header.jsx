import React from 'react'
import { Nav,Navbar ,Container} from 'react-bootstrap'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
export const Adminheader = () => {
  return (
    <div>
        <Navbar className='bg-success'>
            <Container className='justify-content-center'>
        <Nav >
            <Nav.Item className='fs-4'>Department name</Nav.Item>
        </Nav>
        </Container>
        <Nav className='justify-content-end'><FontAwesomeIcon icon="fa-solid fa-right-to-bracket" /></Nav>
        </Navbar>
    </div>
  )
}

