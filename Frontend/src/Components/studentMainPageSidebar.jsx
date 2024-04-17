import React from 'react'
import { Button } from 'react-bootstrap';

const StudentMainPageSidebar = () => {
  return (
    <div className='studentmainpagesidebar' style={{width:'5%',boxShadow:"5px 5px 40px  black",height:'100vh',border:'solid 2px black',float:'left'}}>
        <i class="bi bi-house"></i><p>Home</p>
        <i class="bi bi-journal-bookmark-fill"></i><p>Cbcs</p>
        <i class="bi bi-journal-bookmark-fill"></i><p>Elective</p>
        <i class="bi bi-inboxes"></i><p>Nptel</p>
    </div>
  )
}

export default StudentMainPageSidebar;