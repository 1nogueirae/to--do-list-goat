require('dotenv').config();

const cors = require('cors')
const path = require('path')

const tasksRoute = require('./routes/tasks.route')

const express = require('express')
const app = express()
const port = process.env.PORT || 3000

app.use(cors())
app.use(express.json())

app.use('/frontend', express.static(path.join(__dirname, '..', '..', 'frontend')))

app.use('/tasks', tasksRoute)

app.get('/', (req, res) => {
    res.send(`Initial page`)
})

app.listen(port, () => {
    console.log(`Server started at ${port} port`)
})