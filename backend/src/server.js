require('dotenv').config();

const cors = require('cors')
const tasksRoute = require('./routes/tasks.route')

const express = require('express')
const app = express()
const port = process.env.PORT || 3000

app.use(cors({origin: 'http://localhost:5173'}))
app.use(express.json())

app.use('/tasks', tasksRoute)

app.get('/', (req, res) => {
    res.send(`Initial page`)
})

app.listen(port, () => {
    console.log(`Server started at ${port} port`)
})