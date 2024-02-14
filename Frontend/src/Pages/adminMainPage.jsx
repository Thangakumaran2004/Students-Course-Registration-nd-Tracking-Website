import React from 'react'
import {Container,Table,Form,Col,Row,Button, FloatingLabel, DropdownMenu} from 'react-bootstrap'

const arr=['a','ab','abc','abcd','abcde']

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
                    
                    <tr>
                        <td>1</td>
                        <td>English</td>
                        <td>
                    <select>
                    {arr.map((option, Index) => (
                  <option key={Index} value={option}>{option}</option>
                ))}
                    </select>
                    </td>
                    <td>
                    <select>
                    {arr.map((option, Index) => (
                  <option key={Index} value={option}>{option}</option>
                ))}
                    </select>
                    </td>
                        <td>
                    <select>
                    {arr.map((option, Index) => (
                  <option key={Index} value={option}>{option}</option>
                ))}
                    </select>
                    </td>
                    </tr>
                    <tr>
                        <td>1</td>
                        <td>Physics</td>
                        <td>
                    <select>
                    {arr.map((option, Index) => (
                  <option key={Index} value={option}>{option}</option>
                ))}
                    </select>
                    </td>
                    <td>
                    <select>
                    {arr.map((option, Index) => (
                  <option key={Index} value={option}>{option}</option>
                ))}
                    </select>
                    </td>
                        <td>
                    <select>
                    {arr.map((option, Index) => (
                  <option key={Index} value={option}>{option}</option>
                ))}
                    </select>
                    </td>
                    </tr>
                    <tr>
                        <td>1</td>
                        <td>Chemistry</td>
                        <td>
                    <select>
                    {arr.map((option, Index) => (
                  <option key={Index} value={option}>{option}</option>
                ))}
                    </select>
                    </td>
                    <td>
                    <select>
                    {arr.map((option, Index) => (
                  <option key={Index} value={option}>{option}</option>
                ))}
                    </select>
                    </td>
                        <td>
                    <select>
                    {arr.map((option, Index) => (
                  <option key={Index} value={option}>{option}</option>
                ))}
                    </select>
                    </td>
                    </tr>
                    </tbody>
                    </Table>
                </form>
        </Container>
    </div>
  )
}

export default AdminMainPage