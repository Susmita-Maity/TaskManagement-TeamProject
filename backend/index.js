const express = require('express');
const app = express();
require('dotenv').config();
require('./Models/db');
const PORT = process.env.PORT || 5053;
const TaskRouter = require('./Routes/TaskRouter');
const userRouter = require('./Routes/userRoutes');
const bodyParser = require('body-parser');
const cors = require('cors');

app.get('/', (req, res) => {
    res.send('Hello from the server');
});
app.use(cors())
app.use(bodyParser.json());
app.use('/tasks', TaskRouter)
app.use('/users', userRouter)

app.listen(PORT, () => {
    console.log(`Server is running on PORT=${PORT}`);
})