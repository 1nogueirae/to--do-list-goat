const { Task: Tasks } = require('../database/models')
const express = require('express');
const router = express.Router();
const taskMiddleware = require('../middlewares/tasksMiddleware')

router.get('/', async (req, res) => {
    const tasks = await Tasks.findAll()
    res.json(tasks)
})

router.post('/', taskMiddleware, async (req, res) => {
    const data = req.body
    await Tasks.create(data)

    res.status(201).json({ message: `Task created successfully`, task: data })
})

router.put('/:id', async (req, res) => {
    const data = req.body
    const id = req.params.id
    const task = await Tasks.findByPk(id)

    if (task && data) {
        if (data.status) {
            const validStatuses = ['pending', 'in progress', 'completed']
            if (!validStatuses.includes(data.status)) {
                return res.status(400).json({ error: 'Invalid status value' })
            }
        }
        task.title = data.title
        task.description = data.description
        task.status = data.status
        await task.save()
        res.status(200).json({ message: `Task updated successfully`, task })
    } else {
        res.status(404).json({ error: 'Task not found' })
    }

    res.send();
})

router.delete('/:id', async (req, res) => {
    const id = req.params.id
    const task = await Tasks.findByPk(id)
    if (task) {
        task.destroy()
        res.status(200).json({ message: `Task deleted successfully` })
    } else {
        res.status(404).json({ error: 'Task not found' })
    }

})

module.exports = router