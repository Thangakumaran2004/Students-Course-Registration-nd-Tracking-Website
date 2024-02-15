import React ,{useState} from 'react'
import {Container,Table,Button} from 'react-bootstrap'

const arr=['a','ab','abc','abcd','abcde','None']
const subject =['Engineering maths','Technical English',"Physics","Chemistry"]
const numcount=[10,20,30,40]


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
                <select name={`Batch${i+1}-${subj}`}>
                  {Dropdown(arr)}
                </select>
            </td>
            <td>
            <select name={`Batch${i+1}-${subj}-count`}>
            {Dropdown(numcount)}
                </select>
            </td>
            <td>
                <select name={`Batch${i+1}-${subj}`}>
                  {Dropdown(arr)}
                </select>
            </td>
            <td>
            <select name={`Batch${i+1}-${subj}-count`}>
            {Dropdown(numcount)}
                </select>
              
            </td>
            <td>
                <select name={`Batch${i+1}-${subj}`}>
                  {Dropdown(arr)}
                </select>
            </td>
            <td>
            <select name={`Batch${i+1}-${subj}-count`}>
            {Dropdown(numcount)}
                </select>
            </td>
        </tr>
    ));
  }


const Tablee = () => {
    const [tableData, setTableData]=useState(' ')
    
  return (
    <Container>
                <form>
                <Table >
                    <thead >
                    <tr>
                    <th>S.NO</th>
                    <th>Subject Name</th>
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