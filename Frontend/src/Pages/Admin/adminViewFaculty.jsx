import React from 'react'
import {Container,Button,Form,Col,Row} from 'react-bootstrap'
import { Adminheader } from '../../Components/header'
import Studentsidebar from '../../Components/studentSideBar'
const AdminViewFaculty = () => {

  return (
    <div>
        <Adminheader />
        <Studentsidebar />
            <Container>
                <Form>
                    <Row>
                        <Col>
                    <Form.Group>
                        <Form.Label>Enter the faculty Id : </Form.Label>
                        <Form.Control type='text' />
                    </Form.Group>
                    </Col>
                    <Col>
                    <Button type='submit' >View</Button>
                    </Col>
                </Row>
                </Form>
            </Container>
    </div>
  )
}




export default AdminViewFaculty