import Task from '../models/taskModel.js';

export const getTasks = async (req, res) => {
try {
  const tasks = await Task.find();
  res.json(tasks);
} catch (error) {
  res.status(500).json({ message: 'Error fetching all tasks', error: error.message });
};
}

export const getTaskById = async (req, res) => {
try {
  const task = await Task.findById(req.params.id );
  if (!task) return res.status(404).json({ message: 'Task Not found' });
  res.json(task);
} catch (error) {
  res.status(500).json({ message: 'Error fetching task by ID', error: error.message });
};
}

export const createTask = async (req, res) => {
    try {

        const { title, description, status} = req.body;

        if (!title || !description || !status) {
            return res.status(400).json({ message: 'Title, description, and status are required' });
        }

        const taskExists = await Task.findOne({ title, user: req.user._id });
        if (taskExists) {
            return res.status(400).json({ message: 'Task with this title already exists' });
        }
        const newTask = new Task({ title, description, status, user: req.user._id });
        await newTask.save();

        return res.status(201).json({message: 'Task created successfully', task: newTask});
    } catch (error) {
       res.status(500).json({ message: 'Error creating task', error: error.message }); 
    }
};

export const updateTask = async (req, res) => {
  try {
  const task = await Task.findOneAndUpdate(
    { _id: req.params.id },
    req.body,
    { new: true }
  );
  if (!task) return res.status(404).json({ message: 'Not found' });
  res.json(task);
 } catch (error) {
    return res.status(500).json({ message: 'Error updating task', error: error.message });
  }
};

export const deleteTask = async (req, res) => {
  try {

  if (!req.params.id) {
    return res.status(400).json({ message: 'Task ID is required' });
  }
  const task = await Task.findOneAndDelete({_id: req.params.id});
  if (!task) return res.status(404).json({ message: 'Not found' });
  return res.status(200).json({ message: 'Deleted' });
} catch (error) {
    return res.status(500).json({ message: 'Error deleting task', error: error.message });
}
};