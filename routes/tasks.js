const { getAllItems, addItem, getTask, updateTask, deleteTask } = require('../controller/tasks')

const routes=require('express').Router()

routes
    .route('/')
        .get(getAllItems)
        .post(addItem)

routes
    .route('/:id')
        .get(getTask)
        .patch(updateTask)
        .delete(deleteTask)

module.exports=routes        