import React from 'react'
import { Container,Form,Col,Button } from 'react-bootstrap'
import { Adminheader } from '../../Components/header'
import StudentSideBar from '../../Components/studentSideBar'

const AdminAlterStudent = () => {
  return (
    <div>
        <Adminheader />
        <StudentSideBar />
            <Container className='alterstudent'>
                <center><h3>Alter Student</h3></center>
                <Form>
                        <Form.Group as={Col} >
                            <Form.Label>Student Name</Form.Label>
                            <Form.Control type='text'/>
                        </Form.Group>
                        <Form.Group as={Col} >
                            <Form.Label>Register No</Form.Label>
                            <Form.Control type='text'/>
                        </Form.Group>
                        <Button>Alter</Button>
                </Form>
            </Container>
    </div>
  )
}

export default AdminAlterStudent