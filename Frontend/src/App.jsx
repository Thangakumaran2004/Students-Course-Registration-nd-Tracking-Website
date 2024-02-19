import React from 'react'
import Studentpage from './Pages/studentMainPage'
import AdminLoginpage from './Pages/adminLoginPage'
import {  Routes, Route, BrowserRouter } from 'react-router-dom'
import StudentLoginpage from './Pages/studentLoginPage'
import Adminmainpage from './Pages/adminMainPage'
import AdminStudents from './Pages/adminStudents'
import Landingpage from './Pages/LandingPage'


function App() {
 

  return (
    <>
      <BrowserRouter>
        <Routes>
            <Route path='/adminlogin' element={<AdminLoginpage />} />
            <Route exact path='/' element={<Landingpage />} />
            <Route path='/studentpage' element={<Studentpage />} />
            <Route path='/studentlogin' element={<StudentLoginpage />} />{}</Routes>
            <Route path='/adminpage' element={<Adminmainpage />} />
            <Route path='/adminstu'  element={<AdminStudents />}/>
        </Routes>
      </BrowserRouter>
     
      
    </>
  )
}

export default App
