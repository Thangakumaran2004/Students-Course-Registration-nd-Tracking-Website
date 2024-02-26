import React from 'react'
import Studentpage from './Pages/Student/studentMainPage'
import AdminLoginpage from './Pages/Admin/adminLoginPage'
import {  Routes, Route, BrowserRouter } from 'react-router-dom'
import StudentLoginpage from './Pages/Student/studentLoginPage'
import Adminmainpage from './Pages/Admin/adminMainPage'
import Landingpage from './Pages/LandingPage'
import Adminaddstudent from './Pages/Admin/adminStudents'
import Adminaddcourse from './Pages/Admin/adminCourse'
import Adminaddfaculty from './Pages/Admin/adminfaculty'


function App() {
 

  return (
    <>
                  <BrowserRouter>
              <Routes>
                <Route path='/adminlogin' element={<AdminLoginpage />} />
                <Route exact path='/' element={<Landingpage />} />
                <Route path='/studentpage' element={<Studentpage />} />
                <Route path='/studentlogin' element={<StudentLoginpage />} />
                <Route path='/adminpage' element={<Adminmainpage />}/>
                  <Route path='/adminpage/addstudent' element={<Adminaddstudent />} />
                  <Route path='/adminpage/addfaculty' element={<Adminaddfaculty />} />
                  <Route path='/adminpage/allotcourse' element={<Adminaddcourse />} />
               
              </Routes>
            </BrowserRouter>

     
      
    </>
  )
}

export default App
