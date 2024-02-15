const { Router } = require("express");
const adminMiddleware = require("../middleware/admin");
const router = Router();
const { Admin, Course } = require("../db")

// Admin Routes
router.post('/signup', (req, res) => {
  const username = req.body.username
  const password = req.body.password

  Admin.create({
    username: username,
    password: password
  })
    .then(function(value) {
      res.json({
        msg: "Admin created successfully"
      })
    })
    .catch(function() {
      res.json({
        msg: "Admin was not created."
      })
    })
});

router.post('/courses', adminMiddleware, (req, res) => {
  const title = req.body.title
  const description = req.body.description
  const imageLink = req.body.imageLink
  const price = req.body.price

  Course.create({
    title,
    description,
    imageLink,
    price
  }).then(function(value) {
    res.json({
      message: "Course created successfully ", course_id: value._id
    })
  })
});

router.get('/courses', adminMiddleware, async (req, res) => {
  const response = await Course.find({});
  res.json({
    Courses : response
  }) 
});

module.exports = router;
