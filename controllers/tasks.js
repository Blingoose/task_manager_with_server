import { Task } from "../models/Tasks.js";
import { asyncWrapper } from "../middleware/async.js";
import { createCustomError } from "../errors/custom-error.js";

export const getAll = asyncWrapper(async (req, res) => {
  const tasks = await Task.find({});
  res.status(200).json({ tasks });
});

export const getOne = asyncWrapper(async (req, res, next) => {
  const { id: taskID } = req.params;
  const task = await Task.findOne({ _id: taskID });
  if (!task) {
    throw createCustomError(`No task for id: ${taskID}`, 404);
  }
  res.status(200).json({ task });
});

export const createTask = asyncWrapper(async (req, res) => {
  const { name } = req.body;
  if (name === "") {
    throw createCustomError("A name must be provided!", 401);
  } else if (name.length > 40) {
    throw createCustomError("A name cannot be longer than 40 characters", 401);
  }
  const task = await Task.create({ name });
  res.status(201).json({ task });
});

export const updateTask = asyncWrapper(async (req, res, next) => {
  const { id: taskID } = req.params;
  const { name, completed } = req.body;

  if (name === "") {
    throw createCustomError("A name must be provided!", 401);
  } else if (name.length > 40) {
    throw createCustomError("A name cannot be longer than 40 characters", 401);
  }

  const task = await Task.findOneAndUpdate(
    { _id: taskID },
    { name, completed },
    {
      new: true,
      runValidators: true,
    }
  );

  if (!task) {
    throw createCustomError(`No task for id: ${taskID}`, 404);
  }
  res.status(200).json({ task });
});

export const deleteTask = asyncWrapper(async (req, res, next) => {
  const { id: taskID } = req.params;
  const task = await Task.findOneAndDelete({ _id: taskID });
  if (!task) {
    throw createCustomError(`No task for id: ${taskID}`, 404);
  }
  res.status(200).json({ deleted: task });
});
