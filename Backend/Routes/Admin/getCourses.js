const express = require('express');
const router = express.Router();

const {getCourses} = require('../../Controllers/Admin/mainPageController');

router.use(express.json());
router.use(express.urlencoded({extended:true}));

router.post('/', async (req,res)=>{
    console.log("The frontend data for getting courses is ", req.body);
    const {batch, semester, year, Dep} = req.body;

    const dept = Dep;

    const response = await getCourses(dept , semester, batch);

    if(response.stat == 'Server Busy' || response.stat == 'No courses found for the provided details'){
        let getCourseRes = {
            getCourseStatus : "Server Busy"
        }

        res.json(getCourseRes);
        return;
    }

    let getCourseRes = {
        getCourseStatus : "Successfully fetched Courses",
        courses : response.courses
    }

    console.log("The getCourses courses is ", response.courses);

    res.json(getCourseRes);

})

module.exports = router;