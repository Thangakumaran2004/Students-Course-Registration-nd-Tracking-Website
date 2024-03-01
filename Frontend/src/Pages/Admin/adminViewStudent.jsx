import React from 'react'
import {Container,Button,Form,Col,Row} from 'react-bootstrap'
import { Adminheader } from '../../Components/header'
import Studentsidebar from '../../Components/studentSideBar'

const AdminViewStudent = () => {
  return (
    <div>
        <Adminheader />
        <Studentsidebar />
            <Container>
                <Form>
                    <Row>
                        <Col>
                    <Form.Group>
                        <Form.Label>Enter the Regsiter No : </Form.Label>
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

export default AdminViewStudent