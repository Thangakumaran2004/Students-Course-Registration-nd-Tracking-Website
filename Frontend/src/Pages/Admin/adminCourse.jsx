import React, {useState} from 'react'
import {Container,Form,Col,Row,Button, FloatingLabel} from 'react-bootstrap'
import { Adminheader } from '../../Components/header'
import  Tablee from '../../Components/table'
import axios from 'axios'
import Adminsubnav from '../../Components/adminSubNav'
import '../../Styles/studentMainPage.css'

const Adminaddcourse = () => {
  let deptName =JSON.parse(sessionStorage.getItem('adminDept'));
  const [formData, setFormData]= useState({
    'dept':deptName,
    "year": '',
    "semester": '',
    "batch": ''
  })
  const [tableCourse, setTableCourses] = useState([]);
  const [tableFaculty,setTableFaculty] = useState([]);
  const [allocateerror, setAllocateError]=useState(false);
  const [alreadyexists, setAlexError]=useState(false);
  const [visibleTable,setvisibleTable]=useState(false);
  const [dataNotFound,setDataNotFound]=useState(false);
  
 
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
   
    if(formData.year==='none' || formData.semester==='none' || formData.batch===''){
                  setAllocateError(true);
    }else{
  
      try {        
        sessionStorage.setItem('allotFacultyStudentDept',JSON.stringify(formData));

        let response = await axios.post('http://localhost:5000/adminMain',formData);
          if( response.data.getCourseAndFacultyStatus =='successfully fetched courses and faculty'){
              console.log("The backend response is ",response.data);
                  //setAlexError(true)
                  //return;
                  setTableCourses(response.data.courses);
                  setTableFaculty(response.data.faculties);
                  setvisibleTable(true)

          }else if(response.data.getCourseAndFacultyStatus =='No courses found for the provided details'){

                  console.log("The backend response is ",response.data);
                  setDataNotFound(true);
          }else if(response.data.getCourseAndFacultyStatus == 'You have already alloted faculties for the provided details'){
                  console.log("The backend response is ",response.data);
                  setAlexError(true);
          }else{
                  console.log("The backend response is",response.data);
          }
      }catch(e){
        console.log( "Error in axios while allocating facuties via admin",e);
      }
      
  }
 
    //console.log(facultiesData);
    
  }
    
    
    
  
  return (
    <div>
      <Adminheader />
      
        <Container className='mt-5'>
          <center><h4>Enter the semester Batch and year to allocate Faculty</h4></center><br/><br/>
          <Form onSubmit={handlesubmit}>
            <Row>
            <Col>
            
              <Form.Group>
                <Form.Label>Select year</Form.Label>
              <select className='yeardropdown' placeholder='select year' name='year' value={formData.year} onChange={handleChange}>
                <option value='none'>None</option>
              <option value='1'>1 year</option>
              <option value='2'>2 year</option>
              <option  value='3'>3 year</option>
              <option value='4'>4 year</option>
        </select>
              </Form.Group>
            
            </Col>
            <Col>
            <Form.Group>
                <Form.Label>Select semester</Form.Label>
              <select  className='yeardropdown' placeholder='select year' name='semester' value={formData.semester} onChange={handleChange}>
                <option value='none'>None</option>
              <option value='1'>sem-1</option>
              <option value='2'>sem-2</option>
              <option  value='3'>sem-3</option>
              <option value='4'>sem-4</option>
              <option value='5'>sem-5</option>
              <option value='6'>sem-6</option>
              <option value='7'>sem-7</option>
              <option value='8'>sem-8</option>
        </select>
              </Form.Group>
            </Col>
            <Col>
            <label>Batch :</label>
            <FloatingLabel  >
                <Form.Control  type='text' name='batch' value={formData.batch} onChange={handleChange}  />
            </FloatingLabel>
            </Col>
            <Col>
            <Button type="submit" style={{backgroundColor: '#57cc99',border:'none'}} className='align-item-end'>Submit</Button>
            </Col>
            </Row>
          </Form>
          {allocateerror && <p style={{color: 'red', fontStyle: 'italic'}}>Unable to submit due to invalid input </p>}
          {alreadyexists && <p style={{color: 'red' ,fontStyle: 'italic'}}>the data is already exists </p>}
          {dataNotFound && <p style={{color: 'red' ,fontStyle: 'italic'}}>the data not Found </p>}
        </Container>
        <br />
        <br />
        <br />
        <br />
          {visibleTable ? <Tablee courses={tableCourse} faculties={tableFaculty} /> : null }
        
    </div>
  )
}

export default Adminaddcourse;