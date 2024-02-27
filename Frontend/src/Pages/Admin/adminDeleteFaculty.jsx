import React ,{useState} from 'react'
import {Button, Container,Form} from 'react-bootstrap'
import FacultyOffCanvas from '../../Components/facultyOffCanvas'
import { Adminheader } from '../../Components/header'
import Adminsubnav from '../../Components/adminSubNav'
import '../../Styles/adminStudentstyle.css'



const AdminDeleteFaculty = () => {





    const [deleteFaculty,setdeleteFaculty]=useState({
        
        'facultyId':'',
        'facultyDept':'',
       
})
const[success,setsuccess]=useState(false);
const[alreadyexists,setexists]=useState(false);

const deletefacultydata =(e)=>{
  const {name,value}=e.target;
  setdeleteFaculty(prevState =>({
    ...prevState,
    [name]: value
  }));
}


const  submitfacultydata = async(e) =>{
  e.preventDefault();
  try{
  console.log("Form Data:", deleteFaculty);
  const response = await axios.post('http://localhost:5000/admin/deleteFaculty ',deleteFaculty);

  if(response.data. deleteFacultyStatus =="Successfully deleted faculty from database"){
      setsuccess(true);
  }else{
      setexists(true);
  }
}catch(err){
  console.log("Error occured in adding faculties,",err);
}
}



  return (
    <div>
         <Adminheader />
            <Adminsubnav />
            <FacultyOffCanvas />
        <Container  className='deletefaculty'>
          <center><h3>Faculty Details</h3></center>
            <Form onSubmit={submitfacultydata}>
                <Form.Group>
                    <Form.Label>Faculty ID:</Form.Label>
                    <Form.Control  type='text'  name='facultyId' value={deleteFaculty.facultyId} onChange={deletefacultydata}  />
                </Form.Group>
                <Form.Group>
                    <Form.Label>Faculty Department: </Form.Label>
                    <Form.Control type='text' name='facultyDept' value={deleteFaculty.facultyDept} onChange={deletefacultydata}  />
                </Form.Group>
                <Button type='submit'>Delete Faculty</Button>
            </Form>
        </Container>
    </div>
  )
}

export default AdminDeleteFaculty