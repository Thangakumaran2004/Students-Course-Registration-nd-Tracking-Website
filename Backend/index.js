// This page is the entry point to the entire Backend Codebase.

// This section contains the imported files references;

const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const db = require('./databaseConnection.js');

const adminMainPageRoute = require('./Routes/Admin/mainPage.js');
const adminLoginPageRoute = require('./Routes/Admin/loginPage.js');
const addNewFacultyRoute = require('./Routes/Admin/addNewFaculty.js');
const deleteFacultyRoute = require('./Routes/Admin/deleteFaculty.js');
const adminAllotFacultyRoute = require('./Routes/Admin/allotFaculty.js');
const adminViewStudentChoices = require('./Routes/Admin/viewStudentChoices.js');
const adminGetCoursesRoute = require('./Routes/Admin/getCourses.js');
const adminGetNotSelectedStudentsRoute = require('./Routes/Admin/getNotSelectedStudents.js');

const studentgetCourseAndFacultyDetailsRoute = require('./Routes/Student/getCourseAndFacultiesDetails.js');
const studentLoginPageRoute = require('./Routes/Student/loginPage.js');
const studentAddNewStudentRoute = require('./Routes/Student/addNewStudent.js');
const studentDeleteStudentRoute = require('./Routes/Student/deleteStudent.js');
const studentSelectedFacultiesRoute = require('./Routes/Student/selectedFaculties.js');

// This section contains the constructor calls and constant values;

const app = express();
const port = 5000;

// This section contains all the middlewares used in the app

app.use(cors({origin:"*"}));
app.use(express.json());
app.use(express.urlencoded({extended:true}));

/*app.use((req, res, next) => {
    res.header('Access-Control-Allow-Origin', 'http://localhost:5173');
    res.header('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, OPTIONS');
    res.header('Access-Control-Allow-Headers', 'Content-Type, Authorization');
    res.header('Access-Control-Allow-Credentials', 'true');
    if (req.method === 'OPTIONS') {
        res.status(200).end();
    } else {
        next();
    }
});*/


app.use('/adminMain',adminMainPageRoute);
app.use('/adminlogin',adminLoginPageRoute);
app.use('/admin/addNewFaculty',addNewFacultyRoute);
app.use('/admin/deleteFaculty',deleteFacultyRoute);
app.use('/admin/allotFaculty',adminAllotFacultyRoute);
app.use('/admin/viewStudentChoices',adminViewStudentChoices);
app.use('/admin/getCourses',adminGetCoursesRoute);
app.use('/admin/getNotSelectedStudents',adminGetNotSelectedStudentsRoute);


app.use('/studentLogin',studentLoginPageRoute);
app.use('/student/getCourseAndFacultyDetails',studentgetCourseAndFacultyDetailsRoute);
app.use('/student/addNewStudent',studentAddNewStudentRoute);
app.use('/student/deleteStudent',studentDeleteStudentRoute);
app.use('/student/selectedFaculties',studentSelectedFacultiesRoute);

// starting the server to listen on the port 

app.listen(port, ()=>{
    console.log(`Server started on port ${port}`);
})

