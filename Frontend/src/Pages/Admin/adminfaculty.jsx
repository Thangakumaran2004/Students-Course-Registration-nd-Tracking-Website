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
import FacultySideBar from '../../Components/facultySideBar';





const Adminfaculty= () => {




  return (
    <div className='justify-content-center'>
      <Adminheader />
      <FacultySideBar />
      <Container>
      
      </Container>
    </div>
  )
}






export default Adminfaculty