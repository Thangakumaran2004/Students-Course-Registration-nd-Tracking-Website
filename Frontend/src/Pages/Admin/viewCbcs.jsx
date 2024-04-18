import React, {useState} from 'react'
import { Button, Col, FloatingLabel, Form, Row, Table } from 'react-bootstrap'
import { Adminheader } from '../../Components/header';
import Cbcssubnav from '../../Components/allotcbcssubnav';

const ViewCbcs = () => {



const [viewTable,setViewTable]=useState(true);
 const[bssSuccess,setBssSuccess]=useState(false);
 const[bssFailure,setBssFailure]=useState(false); 
 const[getCourseId,setCourseId]=useState([])
 const[emptyinput,setemptyinput]=useState(false);
const[viewCourse,setviewCourse]=useState({
    'batch':'',
    'semester':'',
     'year':''
});

const handlingviewCourseData =(e)=>{
  const { name, value } = e.target;
  setviewCourse(prevState => ({
    ...prevState,
    [name]: value
  }));
}


const DetailsSubmit = async (e)=>{
  e.preventDefault();
  console.log("The form data is ",viewCourse);

  if(viewCourse.year=='none' || viewCourse.semester=='none' || viewCourse.batch==''){
    setemptyinput(true);
}else{

try {        

let response = await axios.post('http://localhost:5000/helloworld',viewCourse );
if( response.data ==''){
console.log("The backend response is ",response.data);
    
    setCourseId(response.data.course_id);
    setBssSuccess(true);

}else if(response.data=='failure'){

    console.log("The backend response is ",response.data);
    setBssFailure(true);
}

}catch(e){
console.log( "Error in axios while fetching  courseid",e);
}
}

}





  return (
    <div>
                  <Adminheader />
      <Cbcssubnav />
        <Form className="mb-5 mt-5" onSubmit={DetailsSubmit}>
            <Row>
              <center><h3>Enter the Details</h3></center>
              <Col>
              <Form.Label>Batch :</Form.Label>
                <FloatingLabel controlId="floatingInput" label="batch" >
                    <Form.Control  type='text'  name="batch" value={viewCourse.batch} onChange={handlingviewCourseData}/>
                </FloatingLabel>
                
                </Col>
                <Col>
                <Form.Group>
                <Form.Label>Select semester</Form.Label>
              <select  className='yeardropdown'  name="semester" value={viewCourse.semester} onChange={handlingviewCourseData}>
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
                <Form.Group>
                <Form.Label>Select year</Form.Label>
              <select className='yeardropdown' placeholder='select year'  name="year" value={viewCourse.year} onChange={handlingviewCourseData}>
                <option value='none'>None</option>
              <option value='1'>1 year</option>
              <option value='2'>2 year</option>
              <option  value='3'>3 year</option>
              <option value='4'>4 year</option>
        </select>
              </Form.Group>
                </Col>
                <Col><Button type='submit'>Search</Button></Col>
                
            </Row>
            
            {bssSuccess && <p style={{color:'green',fontStyle:'italic'}}> data fetched Sucessfully . . . . . . . </p>}
        
    {bssFailure && <p style={{color:'red',fontStyle:'italic'}}>Error Ocurred . . . . . . . </p>} 
    </Form>
    {(viewTable)?<ViewCbcs />:"hii" }
    </div>
  )

}
export default ViewCbcs










const viewcbcsTable = () => {
  return (
    <div>
        <Table striped bordered hover>
            <thead>
                <tr>
                    <td>S.NO</td>
                    <td>Name</td>
                    <td>Year</td>
                    <td>Batch</td>
                    <td>Semester</td>
                </tr>
            </thead>
        </Table>
    </div>
  )
}
