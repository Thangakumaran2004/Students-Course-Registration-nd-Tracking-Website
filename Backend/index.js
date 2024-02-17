// This page is the entry point to the entire Backend Codebase.
//console.log('This is great');

const express = require('express');
const app = express();
const port = 5000;
const cors = require('cors');
const adminMainPageRoute = require('./Routes/adminMainPageRoute');


app.use('/adminMain',adminMainPageRoute);
app.use(cors({origin:"*"}));
app.use(express.json());

app.listen(port, ()=>{
    console.log(`Server started on port ${port}`);
})
