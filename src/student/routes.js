// Where we will store all the routes

const {Router} = require('express');
const controller = require('./controller');

// Create a new router object
const router = Router();

// When we go to that '/' route, we call that controlelr getStudents function
router.get('/', controller.getStudents)

// The colon is a parameter, so we can pass in an id
router.get('/:id', controller.getStudentById);

// We are using POST to feed information
router.post('/', controller.addStudent);

router.delete('/:id', controller.removeStudent);

router.put('/:id', controller.updateStudent);


// Export the router object
module.exports = router;