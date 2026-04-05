require('dotenv').config();

const tasksRoute = require('./routes/tasks.route')

const express = require('express')
const app = express()
const port = process.env.PORT

app.use(express.json())

app.use('/tasks', tasksRoute)

app.get('/', (req, res) => {
    res.send(`Initial page`)
})

app.listen(port, () => {
    console.log(`Server started at ${port} port`)
})