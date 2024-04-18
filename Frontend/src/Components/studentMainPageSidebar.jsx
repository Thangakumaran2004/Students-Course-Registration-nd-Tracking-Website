import React from 'react'
import { Button } from 'react-bootstrap';
import { Link } from 'react-router-dom';

const StudentMainPageSidebar = () => {
  return (
    <div className='studentmainpagesidebar' style={{width:'5%',boxShadow:"5px 5px 40px  black",height:'100vh',border:'solid 2px black',float:'left'}}>
       <Link to={'/studentpage'} ><i className="bi bi-house"></i></Link><p>Home</p>
       <Link to={'/studentpage/cbcs'}><i className="bi bi-journal-bookmark-fill"></i><p>Cbcs</p></Link>
        
        <i className="bi bi-journal-bookmark-fill"></i><p>Elective</p>
        <i className="bi bi-inboxes"></i><p>Nptel</p>
    </div>
  )
}

export default StudentMainPageSidebar;