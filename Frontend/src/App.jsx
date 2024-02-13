import React from 'react'
import Studentpage from './Pages/studentMainPage'
import AdminLoginpage from './Pages/adminLoginPage'
import {  Routes, Route, BrowserRouter } from 'react-router-dom'
import StudentLoginpage from './Pages/studentLoginPage'
function App() {
 

  return (
    <>
      <BrowserRouter>
        <Routes>
            <Route path='/adminlogin' element={<AdminLoginpage />} />
            <Route path='/studentpage' element={<Studentpage />} />
            <Route path='/studentlogin' element={<StudentLoginpage />} />
        </Routes>
      </BrowserRouter>
      
    </>
  )
}

export default App
