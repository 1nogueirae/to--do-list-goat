require('dotenv').config();

const cors = require('cors')

const apiTasksRoute = require('./routes/api/apiTasks.route')

const express = require('express')
const app = express()
const port = process.env.PORT || 3000

app.use(cors())
app.use(express.json())

app.use('/api/tasks', apiTasksRoute)

app.listen(port, () => {
    console.log(`Server started at ${port} port`)
})