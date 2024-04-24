import React from 'react'
import { Adminheader } from '../../Components/header'
import FacultySideBar from '../../Components/facultySideBar'
import { Container,Form,Col,Button } from 'react-bootstrap'

const AdminAlterFaculty = () => {
  return (
    <div>
        <Adminheader />
        <FacultySideBar />
        <Container className='alterstudent'>
                <center><h3>Alter Faculty Data</h3></center>
                <Form>
                        <Form.Group as={Col} >
                            <Form.Label>Faculty Name</Form.Label>
                            <Form.Control type='text'/>
                        </Form.Group>
                        <Form.Group as={Col} >
                            <Form.Label>Faculty Id</Form.Label>
                            <Form.Control type='text'/>
                        </Form.Group>
                        <Button>Alter</Button>
                </Form>
            </Container>
    </div>
  )
}





export default AdminAlterFaculty