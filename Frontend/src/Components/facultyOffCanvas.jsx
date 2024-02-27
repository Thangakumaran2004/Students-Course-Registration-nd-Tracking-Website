import React,{useState} from 'react'
import {Button,Offcanvas,Container} from 'react-bootstrap'
import {Link} from 'react-router-dom'
import '../Styles/adminPagestyle.css'

const FacultyOffCanvas = () => {
  
    const [show, setShow] = useState(false);

    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);
  
    return (
      <>
      <Container className='m-3'>
        <Button variant="primary" onClick={handleShow} style={{width: '20%'}}>
          Click here for other operation
        </Button>
      </Container>
        <Offcanvas show={show} onHide={handleClose}>
         <Offcanvas.Header closeButton>
        <Offcanvas.Title>FACULTY</Offcanvas.Title>
      </Offcanvas.Header>
      <Offcanvas.Body>
       <Button className='mt4' variant='light'><Link to='/addfaculty' className='offcanvalink '>Add Faculty</Link></Button>
       <Button className='mt4' variant='light'><Link to='/deletefaculty' className='offcanvalink '>Delete Faculty</Link></Button>
      </Offcanvas.Body>
    </Offcanvas>
  </>
);


}

export default FacultyOffCanvas