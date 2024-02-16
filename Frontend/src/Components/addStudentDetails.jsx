import React from 'react'
import {Container,Form ,Button, FloatingLabel} from 'react-bootstrap'

const AddStudentDetails = () => {
  return (
    <div>
        <Container>
            <Form>
                <FloatingLabel>
                    <Form.Control  type='text' name='Studentname'  />
                </FloatingLabel>
                <FloatingLabel>
                    <Form.Control  type='number' name='year'  />
                </FloatingLabel>
            </Form>
        </Container>
    </div>
  )
}

export default AddStudentDetails