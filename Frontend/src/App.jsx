import React from 'react';
 import Studentpage from './Pages/Student/studentMainPage';
 import AdminLoginpage from './Pages/Admin/adminLoginPage';
import { Routes, Route, BrowserRouter } from 'react-router-dom';
 import StudentLoginpage from './Pages/Student/studentLoginPage';
 import Adminmainpage from './Pages/Admin/adminMainPage';
 import Landingpage from './Pages/LandingPage';
 import Adminstudent from './Pages/Admin/adminStudents';
 import Adminaddcourse from './Pages/Admin/adminCourse';
import Adminfaculty from './Pages/Admin/adminfaculty';
 import Adminaddfaculty from './Pages/Admin/adminfaculty';

 import AdminDeleteFaculty from './Pages/Admin/adminDeleteFaculty';

function App() {
  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path='/' element={<Landingpage />} />
           <Route path='/adminlogin' element={<AdminLoginpage />} />
          
          <Route path='/studentpage' element={<Studentpage />} />
          <Route path='/studentlogin' element={<StudentLoginpage />} />
          <Route path='/adminpage' element={<Adminmainpage />}/>
            <Route path='/adminpage/student' element={<Adminstudent />} />
            <Route path='adminpage/faculty' element={<Adminfaculty/>}/>
            <Route path='/adminpage/addfaculty' element={<Adminaddfaculty />} />
            <Route path='/adminpage/allotcourse' element={<Adminaddcourse />} />
          
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
