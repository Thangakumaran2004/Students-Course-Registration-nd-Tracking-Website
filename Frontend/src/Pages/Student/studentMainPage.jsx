import React from 'react'
import { Row ,Card, Container,Navbar,Button,Nav} from 'react-bootstrap'
import {Link} from 'react-router-dom'
import { Dashboard } from './dashboard'
import StudentMainPageSidebar from '../../Components/studentMainPageSidebar'


const studentMainPage = () => {
  return (
    <div>
      <StudentMainHeader />
      <StudentMainPageSidebar />
      <Dashboard />
      <Dashboard1 />
    </div>
  )
}

export default studentMainPage

const StudentMainHeader = () => {
  return (
    <div className='studentpageheader'>
        <Navbar className='bg-white d-flex'>
            <Navbar.Brand className='sitename'>Course Registration System</Navbar.Brand>
           
            
        </Navbar>
        
    </div>
  )
}


const Dashboard1=() =>{

  let  studentDetailsStringdash=JSON.parse(sessionStorage.getItem('studentData')) ;

 
   
     


  return (
    <div>
     
        
      
      <Row>
        <Card className='card text-center'>
          <Card.Body>
          <div className='justify-content-center align-items-center'>
          <Card.Title className='cardtext text-center'>OE Credits</Card.Title>
        <div className='symbolbackground'>  <i class="bi bi-ui-checks-grid"></i></div>
            <Card.Text className='cardtext text-center'>{studentDetailsStringdash.openElectiveCredits}</Card.Text>
          </div>
          </Card.Body>
        </Card>
        <Card className='card'>
          <Card.Body>
          <div className='justify-content-center align-items-center'>
          <Card.Title className='cardtext text-center'> Credits</Card.Title>
        <div className='symbolbackground justify-content-center align-items-center'>  <i class="bi bi-award-fill"></i></div>
            <Card.Text className='cardtext text-center'>{studentDetailsStringdash.totalCredits}</Card.Text>
          </div>
          </Card.Body>
        </Card>
        <Card className='card'>
          <Card.Body>
            <div className='justify-content-center align-items-center'>
          <Card.Title className='cardtext text-center'>Batch</Card.Title>
        <div className='symbolbackground'>  <i class="bi bi-substack"></i></div>
            <Card.Text className='cardtext text-center'>{studentDetailsStringdash.batch}</Card.Text>
          </div>
          </Card.Body>
        </Card>
        <Card className='card'>
          
          <Card.Body>
            <div className='justify-content-center align-items-center'>
          <Card.Title className='cardtext text-center'>PE Credits</Card.Title>
        <div className='symbolbackground'><i class="bi bi-ui-checks-grid"></i></div>
            <Card.Text className='cardtext text-center'>{studentDetailsStringdash.programElectiveCredits}</Card.Text>
          </div>
          </Card.Body>
        </Card>
      </Row>
      
    </div>
  )
}