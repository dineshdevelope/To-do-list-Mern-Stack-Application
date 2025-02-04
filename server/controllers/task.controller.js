import Task from "../models/task.model.js";
export const getTask = async (req, res) => {
  try {
    const task = await Task.find({ userId: req.userId });
    return res.status(200).json(task);
  } catch (error) {
    return res.status(404).json({ message: "Error in Getting Tasks" });
  }
};

export const addTask = async (req, res) => {
  try {
    const { text } = req.body;
    const newTask = new Task({ userId: req.userId, text, completed: false });
    await newTask.save();
    return res.status(201).json(newTask);
  } catch (error) {
    return res.status(404).json({ message: "Error in Adding Tasks" });
  }
};
export const updateTask = async (req, res) => {
  try {
    const { text, completed } = req.body;
    const updateTask = await Task.findOneAndUpdate(
      { _id: req.params.id, userId: req.userId },
      {
        text,
        completed,
      },
      {
        new: true,
      }
    );
    return res.status(200).json(updateTask);
  } catch (error) {
    return res.status(404).json({ message: "Error in updating Tasks" });
  }
};

export const deleteTask = async (req, res) => {
  try {
    await Task.findOneAndDelete({ _id: req.params.id, userId: req.userId });
    return res.status(200).json({ message: "Task Deleted" });
  } catch (error) {
    return res.status(404).json({ message: "Error in Deleting Tasks" });
  }
};
