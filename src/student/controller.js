// Where will we store all the business logic for each route

const pool = require('../../db');
const queries = require('./queries');

// We want to create a GET student function
const getStudents = (req, res) => {
    pool.query(queries.getStudents, (error, results) =>{
        if(error){
            throw error;
        }
        // res is for response, so if we get a 200 status code, we will send back the json of all the students, results.rows
        res.status(200).json(results.rows);
    })
}

const getStudentById = (req, res) => {
    // Grabbing the id parameter from the URL
    const id = parseInt(req.params.id);

    // We have to pass in the id as the second parameter in the pool.query enclosed in an array
    pool.query(queries.getStudentById, [id], (error, results) => {
        if(error){
            throw error;
        }
        // If we get a 200 status code, we will send back the json of the student with that id
        res.status(200).json(results.rows);
    })
}

const addStudent = (req, res) => {
    // We are sending json, to let them know what we are sending

    const {name, email, age, dob} = req.body; // req.body is the json object that we are sending

    // Query to check if this email already exists
    pool.query(queries.checkEmailExists, [email], (error, results) => {

        // If there is a row returned then we want to send a response that the email already exists
        if (results.rows.length) {
            res.send("Email already exists");
        }

        // add student to db if email does not exists
        pool.query(queries.addStudent, [name, email, age, dob], (error, results) => {
            if (error) {
                throw error;
            }

            // If we get a 201 (student has been created succesfully, status code, we will send back a response that the student has been added
            res.status(201).send('Student added successfully');

        })
    })

}

const removeStudent = (req, res) => {
    // We are going to look for the id in the URL
    const id = parseInt(req.params.id);

    pool.query(queries.getStudentById, [id], (error, results) => {
        // check if student exists
        const noStudentFound = !results.rows.length; // if there are no rows, then no student was found
        if (noStudentFound){
            res.send("Student does not exist, could not remove");
        }

        // If the student exists, we will remove the student
        pool.query(queries.removeStudent, [id], (error, results) => {
            if(error){
                throw error;
            }

            // If we get a 200 status code, we will send back a response that the student has been removed
            res.status(200).send('Student removed successfully');
        })
    })
}

const updateStudent = (req, res) => {
    const id = parseInt(req.params.id);

    const {name} = req.body;

    pool.query(queries.getStudentById, [id], (error, results) => {
        const noStudentFound = !results.rows.length; // if there are no rows, then no student was found

        if (noStudentFound){
            res.send("Student does not exist");
        }

        pool.query(queries.updateStudent, [name, id], (error, results) => {
            if (error){
                throw error;
            }

            res.status(200).send('Student updated successfully');
        })
    })
}



module.exports = {
    getStudents,
    getStudentById,
    addStudent,
    removeStudent,
    updateStudent
};