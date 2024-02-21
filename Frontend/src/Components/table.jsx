import React ,{useState,useEffect} from 'react'
import {Container,Table,Button} from 'react-bootstrap'
import axios from 'axios'
import '../Styles/loginPageStyle.css'

// const arr=['a','ab','abc','abcd','abcde','None']
const subject =['Engineering maths','Technical English',"Physics","Chemistry"]
const numcount=[10,20,30,40]




const Tablee = (props) => {
    const [tableData, setTableData]=useState({ })
    const  [disTableData, storeTableData]=useState([] )

    useEffect(() => {
    
      storeTableData(props.tableedata || []);
  }, [props.tableedata]);

 // const {facultyarr}=props.facultyDataarr || [];
 // console.log(facultyarr);  
    console.log("props on Tablee", props)
    

    function Dropdown(a){
        return a.map((option, index) => (
          <option key={index} value={option}>{option}</option>
        ))
      }
      
      function disSub() {
        return subject.map((subj, i) => (
            <tr key={i}>
                <td>{i + 1}</td>
                <td>{subj}</td>
                <td>
                    <select name={`Batch${i+1}-${subj}`} onChange={handlingSubjData}>
                      {Dropdown(disTableData)}
                    </select>
                </td>
                <td>
                <select name={`Batch${i+1}-${subj}-count`} onChange={handlingSubjData}>
                {Dropdown(numcount)}
                    </select>
                </td>
                <td>
                    <select name={`Batch${i+1}-${subj}`} onChange={handlingSubjData}>
                      {Dropdown(disTableData)}
                    </select>
                </td>
                <td>
                <select name={`Batch${i+1}-${subj}-count`} onChange={handlingSubjData}>
                {Dropdown(numcount)}
                    </select>
                  
                </td>
                <td>
                    <select name={`Batch${i+1}-${subj}`} onChange={handlingSubjData}>
                      {Dropdown(disTableData)}
                    </select>
                </td>
                <td>
                <select name={`Batch${i+1}-${subj}-count`} onChange={handlingSubjData}>
                {Dropdown(numcount)}
                    </select>
                </td>
            </tr>
        ));
      }



    const handlingSubjData = (e) =>{
        const {name, value}=e.target;
        setTableData(prevState => ({
            ...prevState,
            [name]: value
        }))
    }
    
    const formtablesubmit = async (e) =>{
        e.preventDefault();
        try{
            const response =axios.post("http://localhost:5000/adminFaculty",tableData);
            console.log("formed submitted sucessfully",response.data);
        }catch(e){
            console.log("error occured",e);
        }
    }
  return (
    <Container>
                <form  onSubmit={formtablesubmit}>
                <Table   striped bordered hover size="sm" responsive="sm"  className="table" >
                    <thead>
                    <tr >
                    <th>S.NO</th>
                    <th >Subject Name</th>
                    <th>Batch - 1</th>
                    <th>Count</th>
                    <th>Batch - 2</th>
                    <th>Count</th>
                    <th>Batch - 3</th>
                    <th>Count</th>
                    </tr>
                </thead>
                    <tbody>
                      {disSub()}
                   
                    </tbody>
                    </Table>
                    <Button type='submit'>SUBMIT</Button>
                </form>
        </Container>
  )
}

export default Tablee