import React from 'react'
import { Adminheader } from '../../Components/header'

let facultiesData=[];

const AdminMainPage = () => {
  let deptt =JSON.parse(sessionStorage.getItem('adminDept'));
  let showDept='';
  if(deptt=='ECE'){
    showDept="ELECTRONICS AND COMMUNICATION ENGINEERING"
  }else if(deptt=="IT"){
    showDept="INFORMATION ENGINEERING"
  }else if(deptt=='EEE'){
    showDept="ELECTRICAL AND ELECTRONICS ENGINEERING"
  }else if(deptt=='CSE'){
    showDept="COMPUTER SCIENCE ENGINEERING"
  }else if(deptt=='MECH'){
    showDept="MECHANICAL ENGINEERING"
  }else if(deptt=="CIVIL"){
    showDept="CIVIL ENGINEERING"
  }else if(deptt=='AIDS'){
    showDept="ARTIFICAL ENGINEERING AND DATA SCIENCE"
  }
  return (
    <div>
      <Adminheader />
      
        <h3>{showDept}</h3>
    </div>
  )
}

export default AdminMainPage;