import React,{useState} from 'react'
// import { Adminheader } from '../../Components/header'
// import { Container, Row,Col,Form, Button} from 'react-bootstrap';
// import axios from 'axios';
// import Adminsubnav from '../../Components/adminSubNav'
// import FacultyOffCanvas from '../../Components/facultyOffCanvas';
import { Card, CardBody ,Button,Stack} from 'react-bootstrap'
import { Link } from 'react-router-dom'




const Adminfaculty= () => {




  return (
    <div className='justify-content-center'>
      <Stack gap={5}>
   <Card style={{width: '20%'}}>
    <CardBody>
       Add Faculty
        <Button variant='success'><Link to='' style={{color: 'white',textDecoration: 'none'}}>Click Here..</Link></Button>
      </CardBody>

   </Card>
   <Card style={{width: '20%'}}>
    <CardBody>
      Delete Faculty
        <Button variant='success'><Link to='' style={{color: 'white',textDecoration: 'none'}}>Click Here..</Link></Button>
      </CardBody>

   </Card>
</Stack>
    </div>
  )
}






export default Adminfaculty