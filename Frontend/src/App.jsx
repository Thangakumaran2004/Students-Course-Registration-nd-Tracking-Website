import React from 'react'
import Studentpage from './Pages/studentMainPage'
import AdminLoginpage from './Pages/adminLoginPage'
import {  Routes, Route, BrowserRouter } from 'react-router-dom'
import StudentLoginpage from './Pages/studentLoginPage'
import Adminmainpage from './Pages/adminMainPage'
function App() {
 

  return (
    <>
      <BrowserRouter>
        <Routes>
            <Route path='/adminlogin' element={<AdminLoginpage />} />
            <Route exact path='/' element={<Studentpage />} />
            <Route path='/studentlogin' element={<StudentLoginpage />} />
            <Route path='/adminpage' element={<Adminmainpage />} />
        </Routes>
      </BrowserRouter>
     
      
    </>
  )
}

export default App
