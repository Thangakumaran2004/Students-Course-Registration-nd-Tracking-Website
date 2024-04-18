import React ,{useState} from 'react'
import { Container ,Form,Button} from 'react-bootstrap'
import { Adminheader } from '../../Components/header';
import Studentsidebar from '../../Components/studentSideBar'

const AdminDeleteStudent = () => {

    const [deleteStudent,setdeleteStudent]=useState({
        'batch':'',
        'registerNo':''
})
const[success,setsuccess]=useState(false);
const[alreadyexists,setexists]=useState(false);

const Deletestudentdata =(e)=>{
  const {name,value}=e.target;
  setdeleteStudent(prevState =>({
    ...prevState,
    [name]: value
  }));
}


const  submitstudentdata = async(e) =>{
  e.preventDefault();
  console.log("Form Data:", deleteStudent);
  try{
  const response=await axios.post('http://localhost',deleteStudent);
  if(response.data.data==''){
      setsuccess(true);
  }else{
      setexists(true);
  }
}catch(e){
    console.warn("error",e)
}
}


  return (
    <div>
        <Adminheader />
        <Studentsidebar />
            <Container className='deletefaculty'>
              <center><h3>Student Details</h3></center>
                    <Form onSubmit={submitstudentdata}>
                        <Form.Group>
                            <Form.Label>Enter the Student Reg No</Form.Label>
                            <Form.Control  type='text' name='' value={deleteStudent.registerNo} onChange={Deletestudentdata}/>
                        </Form.Group>
                        <Form.Group>
                        <Form.Label>Enter the Batch</Form.Label>
                            <Form.Control  type='text' name='' value={deleteStudent.batch} onChange={Deletestudentdata}/>
                        </Form.Group>
                        <Button type='submit'>Delete</Button>
                        {success && <p style={{color: 'green',fontStyle:'italic'}}>student Data deleted sucessfully.  .  .  .  .  .</p>}
                        {alreadyexists && <p style={{color: 'red',fontStyle:'italic'}}>student Data not exists.  .  .  .  .  .</p>}
                    </Form>
            </Container>
    </div>
  )
}

export default AdminDeleteStudent