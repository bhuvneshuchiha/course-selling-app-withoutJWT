const { Router } = require("express");
const router = Router();
const userMiddleware = require("../middleware/user");
const { User, Course } = require("../db");

// User Routes
router.post('/signup', async function(req, res){
    const username = req.body.username
    const password = req.body.password

    const newUser = await User.create({
        username,
        password
    })
    res.json({
        message : "User created successfully"
    })
});

router.get('/courses', async(req, res) => {
    const getCourses = await Course.find({});
    res.json({
        courses : getCourses
    })
});

router.post('/courses/:courseId', userMiddleware, async(req, res) => {
    courseId = req.params.courseId
    const username = req.headers.username

    User.updateOne({
        username : username
    },{
        "$push" : {
            purchasedCourses : courseId
        }
    })
    

});

router.get('/purchasedCourses', userMiddleware, async (req, res) => {
    const username = req.headers.username;
    const user = await User.findOne({
        username : username
    })

    const courses = await Course.find({
        _id :{
            "$in" : user.purchasedCourses
        }
    });
    res.json({
        courses : courses
    })
});

module.exports = router