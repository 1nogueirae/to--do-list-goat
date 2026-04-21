require('dotenv').config();

const cors = require('cors')

const apiTasksRoute = require('./routes/api/apiTasks.route')

const express = require('express')
const app = express()
const port = process.env.PORT || 3000

app.use(cors())
app.use(express.json())

app.use('/api/tasks', apiTasksRoute)

app.use((err, req, res, next) => {
    const status = err.status ?? 500
    if (status >= 500) {
        console.error(err)
    } else {
        console.error(err.message)
    }

    const message = status >= 500 ? 'Internal server error' : (err.message ?? 'Unexpected error')
    res.status(status).json({ message })
})

app.listen(port, () => {
    console.log(`Server started at ${port} port`)
})
