const express = require('express');
const studentRoutes = require('./src/student/routes');


const app = express();
const port = 3000;

// This allows us to POST and GET json data
app.use(express.json());


// Whenever someone goes to the root URL, we will send a response of "Hello World!"
app.get('/', (req, res) => {
    res.send('Hello World!');
})

// We will use this path, we will call for studentRoutes
app.use('/api/v1/students', studentRoutes);

app.listen(port, () => console.log(`Server is running on port ${port}`));