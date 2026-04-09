require('dotenv').config();

const cors = require('cors')
const path = require('path')

const apiTasksRoute = require('./routes/api/apiTasks.route')
const viewTasksRoute = require('./routes/views/viewsTasks.route')

const express = require('express')
const app = express()
const port = process.env.PORT || 3000

app.use(cors())
app.use(express.json())

app.set('view engine', 'ejs')
app.set('views', path.join(__dirname, '..', '..', 'frontend', 'views'))

app.use('/frontend', express.static(path.join(__dirname, '..', '..', 'frontend')))

app.use('/api/tasks', apiTasksRoute)
app.use('/', viewTasksRoute)

app.listen(port, () => {
    console.log(`Server started at ${port} port`)
})