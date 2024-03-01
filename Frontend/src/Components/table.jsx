import React, { useState, useEffect } from 'react';
import { Container, Table, Button } from 'react-bootstrap';
import axios from 'axios';
import '../Styles/loginPageStyle.css';

const subject = ['Engineering maths', 'Technical English', 'Physics', 'Chemistry'];
const numcount = [10, 20, 30, 40];

const Tablee = (props) => {
  let facultyAllocationFacultyData=JSON.parse(sessionStorage.getItem('allotFacultyStudentDept'));
  let faculties = props.faculties;
  let courses = props.courses;
  //console.log("The faculty list inside table is", props.faculties);
  //console.log("The courses list inside table is", props.courses);
  const [tableData, setTableData] = useState({
    facultyAllocationFacultyData
  });
  /*const [disTableData, storeTableData] = useState([]);

  useEffect(() => {
    storeTableData(props.tableedata || []);
  }, [props.tableedata]);*/
  
  const Dropdown = (faculties) => {
    return faculties.map((faculty) => (
      <option key={faculty.id} value={faculty.id}>
        {faculty.name}
      </option>
    ));
  };

  function disSub(courses) {
    //console.log("The courses inside disSub is,",courses);
    return courses.map((course) => (
      <tr key={course.id}>
        <td>{course.name
        }</td>{
          //console.log(course.name)
        }
        {[1, 2, 3].map((batch) => (
          <>
            <td>
              <select name={`Batch${batch}-${course.id}`} onChange={handlingSubjData}>
                {Dropdown(faculties)}
              </select>
            </td>
            <td>
              <input name={`Batch${batch}-${course.id}-count`} onChange={handlingSubjData}/>
            </td>
          </>
        ))}
      </tr>
    ));
  }
  

  const handlingSubjData = (e) => {
    const { name, value } = e.target;
    setTableData((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const formtablesubmit = async (e) => {
    e.preventDefault();
    try {
      tableData.deptSemBatch = sessionStorage.getItem('allotFacultyStudentDept');
      console.log("The form data that is going to be submitted is,",tableData);
      const response = await axios.post("http://localhost:5000/admin/allotFaculty", tableData);
      console.log("formed submitted successfully and the backend response is ", response);
    } catch (e) {
      console.log("error occurred while submitting form data is,", e);
    }
  };

  return (
    <Container>
      <form onSubmit={formtablesubmit}>
        <Table striped bordered hover size="sm" responsive="sm" className="table">
          <thead>
            <tr>
             
              <th>Subject Name</th>
              <th>Batch - 1</th>
              <th>Count</th>
              <th>Batch - 2</th>
              <th>Count</th>
              <th>Batch - 3</th>
              <th>Count</th>
            </tr>
          </thead>
          <tbody>{disSub(courses)}</tbody>
          
        </Table>
        <Button type="submit" style={{backgroundColor: '#57cc99 ', width: '20%',border:'5px ,#57cc99'}} className='justify-content-end'>SUBMIT</Button>
      </form>
    </Container>
  );
};

export default Tablee;
