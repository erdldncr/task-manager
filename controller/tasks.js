const Task = require("../models/task");
const asyncWrapper = require("../middleware/async");
const { createCustomError } = require("../errors/custom-error");

module.exports.getAllItems = asyncWrapper(async (req, res) => {
  const tasks = await Task.find({});
  return res.status(200).json({ respond: tasks });
});


module.exports.addItem =asyncWrapper(async (req, res) => {
  
    const task = await new Task(req.body)
  const respond= await task.save()
  return res.status(201).json(respond)

})
module.exports.getTask =asyncWrapper( async (req, res,next) => {
    const { id: taskID } = req.params;
    const task = await Task.findOne({ _id: taskID });
    if (!task) {
      
      return next(createCustomError("couldn't findd any corresponding task"+taskID, 404))
    }
    return res.status(200).json(task);
})
module.exports.updateTask =asyncWrapper( async (req, res) => {
    const { id } = req.params;
    const task = await Task.findOneAndUpdate(
      {
        _id: id,
      },
      req.body,
      {
        new: true,
        runValidators: true,
      }
    );

    if (!task) {
      return res.status(404).json({
        msg: "couldn't findd any corresponding task" + id,
      });
    }

    return res.status(200).json(task);
  
})
module.exports.deleteTask =asyncWrapper( async (req, res) => {

    const { id } = req.params;
    const task = await Task.findOneAndDelete({ _id: id });

    if (!task) {
      return res.status(404).json({
        msg: "couldn't findd any corresponding task" + id,
      });
    }

    // return res.status(200).json({ task});
    return res.status(200).json({ task: null, status: "success" });
  
})
