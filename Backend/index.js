// This page is the entry point to the entire Backend Codebase.


// This section contains the imported files references;

const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const db = require('./databaseConnection.js');
const adminMainPageRoute = require('./Routes/adminMainPageRoute.js');
const studentLoginPageRoute = require('./Routes/studentLoginPageRoute.js');
const adminLoginPageRoute = require('./Routes/adminLoginPageRoute.js');


// This section contains the constructor calls and constant values;

const app = express();
const port = 5000;


// This section contains all the middlewares used in the app

app.use((req, res, next) => {
    res.header('Access-Control-Allow-Origin', 'http://localhost:5174');
    res.header('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, OPTIONS');
    res.header('Access-Control-Allow-Headers', 'Content-Type, Authorization');
    res.header('Access-Control-Allow-Credentials', 'true');
    if (req.method === 'OPTIONS') {
        res.status(200).end();
    } else {
        next();
    }
});
/*app.use((req, res, next) => {
    res.header('Access-Control-Allow-Origin', 'http://localhost:5174');
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
app.use('/studentLogin',studentLoginPageRoute);
app.use('/adminlogin',adminLoginPageRoute);
app.use(cors({origin:"*"}));
app.use(express.json());
app.use(bodyParser.urlencoded({ extended: true }));

// starting the server to listen on the port 

app.listen(port, ()=>{
    console.log(`Server started on port ${port}`);
})
