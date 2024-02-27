import React, {useState} from 'react'
import {Container,Form,Col,Row,Button, FloatingLabel} from 'react-bootstrap'
import { Adminheader } from '../../Components/header'
import  Tablee from '../../Components/table'
import axios from 'axios'
import Adminsubnav from '../../Components/adminSubNav'
import '../../Styles/studentMainPage.css'
// let facultiesData=[];

// const postData=[{
//     faculties: {
//         1: {id:'1',name:'a',designation:'1',description:'vlsi'},
//         2: {id:'2',name:'ab',designation:'11',description:'hh'},
//         3: {id:'3',name:'abc',designation:'111',description:'cs'},
//         4: {id:'4',name:'abcd',designation:'1111',description:'em'}
//     }},{
//     courses:{
//         1: {id:'1',code:'19EC1C',name:'english'},
//         2: {id:'1',code:'19EC2C',name:'tamil'},
//         3: {id:'1',code:'19EC3C',name:'maths'},
//         4: {id:'1',code:'19EC4C',name:'science'}
//     }}
//   ]

const Adminaddcourse = () => {
 
 
  let deptname =sessionStorage.getItem('adminData')
 
  let deptName=JSON.parse(deptname);

  const [formData, setFormData]= useState({
    'dept':deptName.adminDept,
    "year": '',
    "semester": '',
    "batch": ''
  })
  const [tableCourse, setTableCourses] = useState([]);
  const [tableFaculty,setTableFaculty] = useState([]);
  const [allocateerror, setAllocateError]=useState(false);
  const [alreadyexists, setAlexError]=useState(false);
  const[visibleTable,setvisibleTable]=useState(false);
 
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
    //setTableData(postData);
    //console.log("THe post data is,",postData);
    //console.log("The tableData is",tableData);
    if(formData.year==='none' || formData.semester==='none' || formData.batch===''){
                  setAllocateError(true);
    }else{
  
      try {
        let response = await axios.post('http://localhost:5000/adminMain',formData);
          if( !response.data.getCourseAndFacultyStatus =='successfully fetched courses and faculty'){
              console.log("The backend response is ",response.data);
                  setAlexError(true)
                  return;
          }else{
          console.log("The backend response is ",response.data);
          setTableCourses(response.data.courses);
          setTableFaculty(response.data.faculties);
          setvisibleTable(true)

          
        
    // let facultiesData= ['a','b','c','d','e'];
      //   for(let i=0; i<response.data.faculties.length; i++){
      //     facultiesData.push(response.data.faculties[i].name);
      //   }
      //   console.log("The Facutlties are,", facultiesData);
      //   setTableData(response.data)
      }
      }catch(e){
        console.log("Error in axios",e);
      }
      
  }
 
    //console.log(facultiesData);
    
  }
    
    
    
  
  return (
    <div>
      <Adminheader />
      <Adminsubnav />
        <Container className='mt-5'>
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
                <Form.Label>Select sem</Form.Label>
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
            <Button type="submit" variant='success' className='align-item-end'>Submit</Button>
            </Col>
            </Row>
          </Form>
          {allocateerror && <p style={{color: 'red', fontStyle: 'italic'}}>Unable to submit due to invalid input </p>}
          {alreadyexists && <p style={{color: 'red' ,fontStyle: 'italic'}}>the data is already exists </p>}
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