import React from 'react'
import {Link} from 'react-router-dom'
import {Button, Container,Navbar} from 'react-bootstrap'
import './../Styles/studentMainPage.css'
const StudentHeader = () => {
  return (
    <div>
        <Navbar className='bg-success'>
            <Navbar.Brand>CRS</Navbar.Brand>
            <Container className='justify-content-center'>
                <Link to={'/studentpage'} style={{border:'none',color:'white'}} className='navigate'>Home</Link>
                <Link className='navigate'>course Selection</Link>
                <Link className='navigate'>Elective</Link>
            </Container>
            <Button style={{marginRight:'5%'}} >Logout</Button>
        </Navbar>

    </div>
  )
}

export default StudentHeader