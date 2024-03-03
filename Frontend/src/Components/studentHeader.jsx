import React from 'react'
import {Link} from 'react-router-dom'
import {Container,Navbar} from 'react-bootstrap'

const StudentHeader = () => {
  return (
    <div>
        <Navbar className='bg-success'>
            <Navbar.Brand>SiteName</Navbar.Brand>
            <Container className='justify-content-start'>
                <Link to={''}>Home</Link>
                <Link >course Selection</Link>
                <Link>Elective</Link>
            </Container>
        </Navbar>

    </div>
  )
}

export default StudentHeader