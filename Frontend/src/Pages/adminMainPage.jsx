import React, {useState} from 'react'
import {Container,Form,Col,Row,Button, FloatingLabel} from 'react-bootstrap'
import { Adminheader } from '../Components/header'
import  Tablee from '../Components/table'
import axios from 'axios'

const AdminMainPage = () => {

  const [formData, setFormData]= useState({
    "year": '',
    "semester": '',
    "batch": ''
  })

  let facultiesData= [];
  const handleChange=(e)=>{
    
      const {name,value}=e.target;
      setFormData(prevState => ({
        ...prevState,
        [name]: value
    }));
  };



  const handlesubmit= async (e) =>{
    e.preventDefault();
    console.log("The frontend form data is ",formData);
    
  
    
    
    
    try {
      let response = await axios.post('http://localhost:5000/adminMain',formData);
      console.log("The response is ",response.data.faculties);
      for(let i=0; i<response.data.faculties.length; i++){
        facultiesData.push(response.data.faculties[i].name);
      }
    }catch(e){
      console.log("Error in axios",e);
    }
    
    console.log(facultiesData);
    }
    
    
    
  
  return (
    <div>
      <Adminheader />
        <Container className='mt-5'>
          <Form onSubmit={handlesubmit}>
            <Row>
            <Col>
            <FloatingLabel label='Select year'>
                <Form.Control type='text' name='year'  value={formData.year} onChange={handleChange}  />
            </FloatingLabel >
            </Col>
            <Col>
            <FloatingLabel label='Semester' >
                <Form.Control  type='text' name='semester' value={formData.semester} onChange={handleChange}  />
            </FloatingLabel>
            </Col>
            <Col>
            <FloatingLabel label='Batch' >
                <Form.Control  type='text' name='batch' value={formData.batch} onChange={handleChange}  />
            </FloatingLabel>
            </Col>
            <Col>
            <Button type="submit" variant='success'>Submit</Button>
            </Col>
            </Row>
          </Form>
        </Container>
        <br />
        <br />
        <br />
        <br />
        <Tablee  {...facultiesData} />
        
    </div>
  )
}

export default AdminMainPage;