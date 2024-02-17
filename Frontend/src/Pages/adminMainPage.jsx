import React, {useState} from 'react'
import {Container,Form,Col,Row,Button, FloatingLabel} from 'react-bootstrap'
import  Tablee from '../Components/table'
import axios from 'axios'

const AdminMainPage = () => {

  const [formData, setFormData]= useState({
    "year": ' ',
    "semester": ' '
  })
  const handleChange=(e)=>{
    
      const {name,value}=e.target;
      setFormData(prevState => ({
        ...prevState,
        [name]: value
    }));
  };



  const handlesubmit= async (e) =>{
    e.preventDefault();

    

    console.log(formData);
    
    
    try {
      let data = await axios.post('http://localhost:5000/adminMain',formData);
      console.log(data);y
    }catch(e){
      console.log("Error in axios",e);
    }
    
      
    }
    
    
  
  return (
    <div>
        <Container>
          <Form onSubmit={handlesubmit}>
            <Row>
            <Col>
            <FloatingLabel label='Select year'>
                <Form.Control type='text' name='year'  value={formData.year} onChange={handleChange}  />
            </FloatingLabel >
            <FloatingLabel label='Semester' >
                <Form.Control  type='text' name='semester' value={formData.semester} onChange={handleChange}  />
            </FloatingLabel>
            </Col>
            </Row>
            <Button type="submit" variant='success'>Submit</Button>
          </Form>
        </Container>
        <br />
        <br />
        <br />
        <br />
        <Tablee />
        
    </div>
  )
}

export default AdminMainPage;