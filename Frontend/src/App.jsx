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
 import AdminDeleteFaculty from './Pages/Admin/adminDeleteFaculty';
import AdminAddStudent from './Pages/Admin/adminAddStudent';
import Adminaddfaculty from './Pages/Admin/adminAddFaculty';
import AdminDeleteStudent from './Pages/Admin/adminDeleteStudent';
import AdminViewStudent from './Pages/Admin/adminViewStudent';
import AdminAlterStudent from './Pages/Admin/adminAlterStudent';
import StudentCbcs from './Pages/Student/studentCbcs';
import DownloadCbcsData from './Pages/Admin/downloadCbcsData';
import ViewCbcs from './Pages/Admin/viewCbcs';



function App() {
  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path='/' element={<Landingpage />} />
           <Route path='/adminlogin' element={<AdminLoginpage />} />
           <Route path='/studentlogin' element={<StudentLoginpage />} />
          <Route path='/studentpage' element={<Studentpage />} />
          <Route path='/studentpage/cbcs' element={<StudentCbcs />} />
          <Route path='/adminpage' element={<Adminmainpage />}/>
            <Route path='/adminpage/student' element={<Adminstudent />} />
            <Route path='adminpage/faculty' element={<Adminfaculty/>}/>
            <Route path='/adminpage/student' element={<Adminstudent />} />
            <Route path='/adminpage/addstudent' element={<AdminAddStudent />} />
            <Route path='/adminpage/deletestudent' element={<AdminDeleteStudent/>} />
            <Route path='/adminpage/viewstudent' element={<AdminViewStudent />} />
            <Route path='/adminpage/alterstudent' element={<AdminAlterStudent />} />
            <Route path='/adminpage/allotcourse' element={<Adminaddcourse />} />
            <Route path='/adminpage/downloadcbcs' element={<DownloadCbcsData />} />
            <Route path='/adminpage/viewcbcs' element={<ViewCbcs />} />
            <Route path='/adminpage/addfaculty'  element={<Adminaddfaculty />} />
            <Route path='/adminpage/deletefaculty' element={<AdminDeleteFaculty />} />
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
