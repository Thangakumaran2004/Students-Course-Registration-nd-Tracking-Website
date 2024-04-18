import React from 'react'
import {Link} from 'react-router-dom'

const Cbcssubnav = () => {
  return (
    <div className='d-flex flex-column p-4 sidebar' style={{width: '15%',backgroundColor: '#000814',float: 'left',height: '100vh'}}>
    <Link to='/adminpage/allotcourse' className='studentsidebar'><i class="bi bi-person-plus-fill"></i>Allocate faculty</Link>
    <Link to='/adminpage/viewcbcs' className='studentsidebar'><i class="bi bi-view-list"></i>Cbcs status</Link>
    <Link to='/adminpage/downloadcbcs' className='studentsidebar'><i class="bi bi-cloud-download"></i>Download data</Link>
   
</div>
  )
}

export default Cbcssubnav