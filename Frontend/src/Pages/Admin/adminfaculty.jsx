import React,{useState} from 'react'
// import { Adminheader } from '../../Components/header'
import { Container, Row,Col,Form, Button} from 'react-bootstrap';
// import axios from 'axios';
// import Adminsubnav from '../../Components/adminSubNav'
// import FacultyOffCanvas from '../../Components/facultyOffCanvas';
import { Card, CardBody } from 'react-bootstrap'
import { Link } from 'react-router-dom'
import { Adminheader } from '../../Components/header'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
//import {iololosAddCircle} from 'react/icons/io'





const Adminfaculty= () => {




  return (
    <div className='justify-content-center'>
      <Adminheader />
      <Container>
        <Row>
              <Col>
                        <Card  className='justify-content-center'>
                        <FontAwesomeIcon  icon="fa-solid fa-user-plus" />
                        <Card.Title>  Add Faculty </Card.Title>
                          <CardBody>
                          
                            <Card.Text>
                                Click on the below button to add Faculty..
                            </Card.Text>
                              <Button variant='success'><Link to='/adminpage/addfaculty' style={{color: 'white',textDecoration: 'none'}}>Click Here..</Link> </Button>
                            </CardBody>
                        </Card>
               </Col>
              <Col>
                  <Card >
                        <CardBody>
                                  Delete Faculty <br />
                            <Button variant='success'><Link to='/adminpage/deletefaculty' style={{color: 'white',textDecoration: 'none'}}>Click Here..</Link></Button>
                       </CardBody>
                  </Card>
               </Col>
          </Row>
      </Container>
    </div>
  )
}






export default Adminfaculty