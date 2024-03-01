import React from 'react'
import {Link} from 'react-router-dom'


const FacultySideBar = () => {
  return (
    <div className='d-flex flex-column p-4 sidebar' style={{width: '17%',backgroundColor: '#000814',float: 'left',height: '100vh',alignItems: 'center'}}>
    <Link to='/adminpage/addfaculty' className='studentsidebar'><i class="bi bi-person-plus-fill"></i>Add Faculty</Link>
    <Link to='/adminpage/deletefaculty' className='studentsidebar'><i class="bi bi-person-x-fill"></i>Delete Faculty </Link>
    <Link to='/adminpage/viewfaculty' className='studentsidebar'><i class="bi bi-person-fill-down"></i>View Faculty Data</Link>
    <Link to='/adminpage/alterfaculty' className='studentsidebar'><i class="bi bi-person-fill-gear"></i>Alter Faculty Data</Link>
</div>
)
}

export default FacultySideBar