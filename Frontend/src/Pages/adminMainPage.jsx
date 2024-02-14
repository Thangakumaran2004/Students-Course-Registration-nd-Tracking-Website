import React from 'react'
import {Container,Table,Form,Col,Row,Button, FloatingLabel, DropdownMenu} from 'react-bootstrap'

const arr=['a','ab','abc','abcd','abcde']
const subject =['Engineering maths','Technical English',"Physics","Chemistry"]

function Dropdown(){
  return arr.map((option, index) => (
    <option key={index} value={option}>{option}</option>
  ))
}

function disSub() {
  return subject.map((subj, i) => (
      <tr key={i}>
          <td>{i + 1}</td>
          <td>{subj}</td>
          <td>
              <select>
                {Dropdown()}
              </select>
          </td>
          <td>
              <select>
                {Dropdown()}
              </select>
          </td>
          <td>
              <select>
                {Dropdown()}
              </select>
          </td>
      </tr>
  ));
}


const AdminMainPage = () => {
  return (
    <div>
        <Container>
            <Row>
            <Col>
            <FloatingLabel label='Select year'>
                <Form.Control type='text'   />
            </FloatingLabel >
            <FloatingLabel label='Semester' >
                <Form.Control  type='text'/>
            </FloatingLabel>
            </Col>
            </Row>
            <Button type="submit" variant='success'>Submit</Button>
        </Container>
        <Container>
                <form>
                <Table>
                    <thead >
                    <tr>
                    <th>S.NO</th>
                    <th>Subject Name</th>
                    <th>Batch - 1</th>
                    <th>Batch - 2</th>
                    <th>Batch - 3</th>
                    </tr>
                </thead>
                    <tbody>
                      {disSub()}
                   
                    </tbody>
                    </Table>
                </form>
        </Container>
    </div>
  )
}

export default AdminMainPage