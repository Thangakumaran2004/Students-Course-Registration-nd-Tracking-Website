import React, { useState } from 'react'
import {Container,Row,Col,Nav,Image,Table, Button,Accordion} from 'react-bootstrap'
import { CircularProgressbar } from 'react-circular-progressbar';
import '../../Styles/studentMainPage.css'
import StudentHeader from '../../Components/studentHeader';
import axios from 'axios'



export const  Dashboard= () => {

    let StudentDetails=sessionStorage.getItem('studentData');
    // console.log(StudentDetails);
   let  studentDetailsString=/*JSON.parse(StudentDetails) */0 ;

    if (studentDetailsString !== null) {
     // Parse the JSON string to convert it into a JavaScript object
     
     console.log("Retrieved student details from session storage:", studentDetailsString);
     // Now you can use studentDetails object as needed
   } else {
     console.log("No student details found in session storage.");
   }
   
   
   
     return (
       <div className='dashboard  shadow p-3 mb-5  rounded m-3  border-2 '>
           <Container  className='m-2 '>
                       <Row  className='justify-content-center'>
                           <Col  className='mt-2 '>
                           <Image src='data:image/jpeg;base64,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' rounded/></Col>
                           <Col  className='mt-1 '>
                               <Row>Name : {studentDetailsString.name}</Row>
                               <Row>Batch:  {studentDetailsString.batch}</Row>
                               <Row>Register No:  {studentDetailsString.regno}</Row>
                           </Col>
                           <Col  className='mt-2'>
                           <Row>Year:  {studentDetailsString.year}</Row>
                               <Row>Semester:  {studentDetailsString.sem} </Row>
                               <Row>TotalCredits:  {studentDetailsString.totalCredits} </Row>
                           </Col>
                       </Row>
           </Container>
        
       
       </div>
     )
   }