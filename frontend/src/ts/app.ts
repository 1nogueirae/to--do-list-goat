import { Task } from './class/Task.js';
import getTasks from './getTasks.js';
import postTasks from './postTasks.js';
import deleteTask from './deleteTask.js';

$(document).ready(function () {
    const url = 'http://localhost:3000/';
    const tasksContainer = $('#tasksContainer');
    const addTaskBtn = $('#addTaskBtn');

    getTasks(url).then(response => {
        tasksContainer.empty();

        if (response.length === 0) {
            tasksContainer.append(`
                <div class="card shadow-sm border-0 rounded-4">
                        <div class="card-body p-4">
                            <span class="fw-bold mb-3">No tasks found. Please add a task to get started.</span>
                        </div>
                    </div>
                `);
            return;
        }

        response.forEach((task: { id: number; title: string; description: string; status: string }) => {

            console.log(`task status: ${task.status}`);

            let taskBadgeClass = '';
            switch (task.status) {
                case 'Pending':
                    taskBadgeClass = 'bg-secondary';
                    break;
                case 'In Progress':
                    taskBadgeClass = 'bg-warning';
                    break;
                case 'Done':
                    taskBadgeClass = 'bg-success';
                    break;
                default:
                    taskBadgeClass = 'bg-secondary';
                    break;
            }

            const taskElement = `
                    <div class="card shadow-sm border-0 rounded-4">
                        <div class="card-body p-4">
                            <div class="d-flex justify-content-between align-items-start gap-3">
                                <div class="flex-grow-1">
                                    <p class="fw-bold mb-3" id="titleTask${task.id}">${task.title}</p>
                                    <p id="descriptionTask${task.id}">${task.description}</p>
                                    <span class="badge ${taskBadgeClass}" id="statusTask${task.id}">${task.status}</span>
                                </div>
                                <div class="ms-auto d-flex flex-column gap-2">
                                    <button id="editTaskBtn${task.id}" class="btn btn-secondary">Edit Task</button>
                                    <button id="deleteTaskBtn${task.id}" class="btn btn-danger">Delete Task</button>
                                </div>
                            </div>
                        </div>
                    </div>
                `;
            tasksContainer.append(taskElement);
        });

    })

    addTaskBtn.on('click', function () {
        const title = $('#taskName').val() as string;
        const description = $('#taskDescription').val() as string;
        const status = $('#taskStatus').val() as string || 'pending';

        if (!title || !description) {
            alert('Please fill in both the title and description fields.');
            return;
        }

        const task = new Task(title, description, status);

        postTasks(url, task).then(response => {
            location.reload();
        }).catch(error => {
            console.error('Error adding task: ', error);
        });
    });

    $(document).on('click', '[id^="deleteTaskBtn"]', function () {
        const idAttr = $(this).attr('id');
        if (!idAttr) return;
        const id = parseInt(idAttr.split('deleteTaskBtn')[1]);
        deleteTask(url, id).then(() => {
            location.reload();
        }).catch(error => {
            console.error('Error deleting task: ', error);
        });
    });
});
