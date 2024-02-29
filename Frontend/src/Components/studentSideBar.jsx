import React from 'react'
import {Link} from 'react-router-dom'

const Studentsidebar = () => {
  return (
    <div className='d-flex flex-column p-4 sidebar' style={{width: '17%',backgroundColor: '#000814',float: 'left',height: '100vh',alignItems: 'center'}}>
        <Link to='/adminpage/addstudent' className='studentsidebar'><i class="bi bi-person-plus-fill"></i>Add Student</Link>
        <Link to='/adminpage/deletestudent' className='studentsidebar'><i class="bi bi-person-x-fill"></i>Delete Student </Link>
        <Link to='/adminpage/viewstudent' className='studentsidebar'><i class="bi bi-person-fill-down"></i>View Student Data</Link>
        <Link to='/adminpage/alterstudent' className='studentsidebar'><i class="bi bi-person-fill-gear"></i>Alter Student Data</Link>
    </div>
  )
}

export default Studentsidebar