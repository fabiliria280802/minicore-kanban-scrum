import { Request, Response } from "express";
import Task from "../models/task";
import Sprint from "../models/sprint"
import { User } from "../models";

export const getTask = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const task = await Task.findByPk(id);
    if (!task) {
      return res.status(404).json({ msg: "Task not found", id });
    }
    res.json(task);
  } catch (error) {
    if (error instanceof Error) {
      res.status(500).json({ error: error.message });
    } else {
      res.status(500).json({ error: "An unexpected error occurred" });
    }
  }
};

export const getTasks = async (req: Request, res: Response) => {
  try {
    const tasks = await Task.findAll();
    res.json(tasks);
  } catch (error) {
    if (error instanceof Error) {
      res.status(500).json({ error: error.message });
    } else {
      res.status(500).json({ error: "An unexpected error occurred" });
    }
  }
};

export const postTask = async (req: Request, res: Response) => {
  try {
    const newTask = await Task.create(req.body);
    const idsprint = newTask.get('idsprint') as number;
    //nuevos valores
    const expectedTime = newTask.get('expectedTime') as number;
    const doneTime = newTask.get('doneTime') as number;
    let conclusion = '';

    if (expectedTime > doneTime) {
      conclusion = 'Se requirio mas esfuerzo del esperado';
    } else if (expectedTime < doneTime) {
      conclusion = 'Se requirio menos esfuerzo del esperado';
    } else {
      conclusion = 'Se cumplio con el tiempo';
    }
    await newTask.update({ conclutiontime: conclusion });

    if (idsprint) {
      const tasks = await Task.findAll({
        where: { idsprint: idsprint }
      });
      //puntos totales
      const committedPoints = tasks.reduce((total, task) => total + (task.get('points') as number), 0);

      //Finalizada
      const fulfilledPoints = tasks.reduce((total, task) => {
        return task.get('status') === 'Finalizada' ? total + (task.get('points') as number) : total;
      }, 0);

      //Avanzada
      const pendingPoints = tasks.reduce((total, task) => {
        return task.get('status') === 'Avanzada' ? total + (task.get('points') as number) : total;
      }, 0);

      //Por hacer
      const noFulfilledPoints = tasks.reduce((total, task) => {
        return task.get('status') === 'Por hacer' ? total + (task.get('points') as number) : total;
      }, 0);

      //Finalizada Porcentage
      const totalTasks = tasks.length;
      const completedTasks = tasks.filter(task => task.get('status') === 'Finalizada').length;
      const donePorcentage = totalTasks > 0 ? (completedTasks / totalTasks) * 100 : 0;

      //Avanzada Porcentage
      const pendingTasks = tasks.filter(task => task.get('status') === 'Avanzada').length;
      const doingPorcentage = totalTasks > 0 ? (pendingTasks / totalTasks) * 100 : 0;

      //Por hacer Porcentage
      const todoTasks = tasks.filter(task => task.get('status') === 'Por hacer').length;
      const toDoPorcentage = totalTasks > 0 ? (todoTasks / totalTasks) * 100 : 0;

      const sprint = await Sprint.findByPk(idsprint);
      if (sprint) {
        await sprint.update({
          committedPoints,
          fulfilledPoints,
          pendingPoints,
          noFulfilledPoints,
          toDoPorcentage,
          doingPorcentage,
          donePorcentage,
         });

        // New logic for prediction calculations
        const completedSprints = await Sprint.findAll({
          where: { sprintstatus: 'Completado' }
        });

        if (completedSprints.length >= 5 && idsprint >= 6) {
          const fulfilledPointsArray = completedSprints.map(s => s.get('fulfilledPoints') as number);
          const mean = fulfilledPointsArray.reduce((acc, val) => acc + val, 0) / fulfilledPointsArray.length;
          const variance = fulfilledPointsArray.reduce((acc, val) => acc + Math.pow(val - mean, 2), 0) / fulfilledPointsArray.length;
          const stdDev = Math.sqrt(variance);

          const predictedPointsLower = Math.max(0, mean - stdDev);
          const predictedPointsUpper = Math.max(predictedPointsLower, mean + stdDev);
          const confidenceInterval = `${predictedPointsLower} - ${predictedPointsUpper}`;

          // Update sprint with prediction values
          await sprint.update({
            predictedPointsLower,
            predictedPointsUpper,
            confidenceInterval
          });
        }
      }
    }

    res.status(201).json(newTask);
    const userId = newTask.get('iduser') as number;

    // Suponiendo que necesitas obtener el nombre completo del usuario de alguna forma
    // Si ya tienes el nombre completo almacenado en alguna parte, úsalo directamente
    const user = await User.findByPk(userId);
    if (!user) {
      return res.status(404).json({ error: "User not found" });
    }
    const userName = user.get('fullname') as string; // Asegúrate de que este campo exista en tu modelo de Usuario

    // Actualiza la tarea con el nuevo nombre y los datos del body
    await newTask.update({ ...req.body, assignedFullName: userName });
  } catch (error) {
    if (error instanceof Error) {
      res.status(500).json({ error: error.message });
    } else {
      res.status(500).json({ error: "An unexpected error occurred" });
    }
  }
};

export const putTask = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const task = await Task.findByPk(id);

    if (!task) {
      return res.status(404).json({ msg: "Task not found", id });
    }

    await task.update(req.body);
    //update por name
    const userId = task.get('iduser') as number;

    // Suponiendo que necesitas obtener el nombre completo del usuario de alguna forma
    // Si ya tienes el nombre completo almacenado en alguna parte, úsalo directamente
    const user = await User.findByPk(userId);
    if (!user) {
      return res.status(404).json({ error: "User not found" });
    }
    const userName = user.get('fullname') as string; // Asegúrate de que este campo exista en tu modelo de Usuario

    // Actualiza la tarea con el nuevo nombre y los datos del body
    await task.update({ ...req.body, assignedFullName: userName });
    //nuevos valores
    const expectedTime = task.get('expectedTime') as number;
    const doneTime = task.get('doneTime') as number;
    let conclusion = '';

    if (expectedTime > doneTime) {
      conclusion = 'Se requirio mas esfuerzo del esperado';
    } else if (expectedTime < doneTime) {
      conclusion = 'Se requirio menos esfuerzo del esperado';
    } else {
      conclusion = 'Se cumplio con el tiempo';
    }
    await task.update({ conclutiontime: conclusion });

    const idsprint = task.get('idsprint') as number;

    if (idsprint) {
      const tasks = await Task.findAll({
        where: { idsprint: idsprint }
      });
      //puntos totales
      const committedPoints = tasks.reduce((total, task) => total + (task.get('points') as number), 0);

      //Finalizada
      const fulfilledPoints = tasks.reduce((total, task) => {
        return task.get('status') === 'Finalizada' ? total + (task.get('points') as number) : total;
      }, 0);

      //Avanzada
      const pendingPoints = tasks.reduce((total, task) => {
        return task.get('status') === 'Avanzada' ? total + (task.get('points') as number) : total;
      }, 0);

      //Por hacer
      const noFulfilledPoints = tasks.reduce((total, task) => {
        return task.get('status') === 'Por hacer' ? total + (task.get('points') as number) : total;
      }, 0);

      //Finalizada Porcentage
      const totalTasks = tasks.length;
      const completedTasks = tasks.filter(task => task.get('status') === 'Finalizada').length;
      const donePorcentage = totalTasks > 0 ? (completedTasks / totalTasks) * 100 : 0;

      //Avanzada Porcentage
      const pendingTasks = tasks.filter(task => task.get('status') === 'Avanzada').length;
      const doingPorcentage = totalTasks > 0 ? (pendingTasks / totalTasks) * 100 : 0;

      //Por hacer Porcentage
      const todoTasks = tasks.filter(task => task.get('status') === 'Por hacer').length;
      const toDoPorcentage = totalTasks > 0 ? (todoTasks / totalTasks) * 100 : 0;

      const sprint = await Sprint.findByPk(idsprint);
      if (sprint) {
        await sprint.update({
          committedPoints,
          fulfilledPoints,
          pendingPoints,
          noFulfilledPoints,
          toDoPorcentage,
          doingPorcentage,
          donePorcentage,
         });

        // New logic for prediction calculations
        const completedSprints = await Sprint.findAll({
          where: { sprintstatus: 'Completado' }
        });

        if (completedSprints.length >= 5 && idsprint >= 6) {
          const fulfilledPointsArray = completedSprints.map(s => s.get('fulfilledPoints') as number);
          const mean = fulfilledPointsArray.reduce((acc, val) => acc + val, 0) / fulfilledPointsArray.length;
          const variance = fulfilledPointsArray.reduce((acc, val) => acc + Math.pow(val - mean, 2), 0) / fulfilledPointsArray.length;
          const stdDev = Math.sqrt(variance);

          const predictedPointsLower = Math.max(0, mean - stdDev);
          const predictedPointsUpper = Math.max(predictedPointsLower, mean + stdDev);
          const confidenceInterval = `${predictedPointsLower} - ${predictedPointsUpper}`;

          // Update sprint with prediction values
          await sprint.update({
            predictedPointsLower,
            predictedPointsUpper,
            confidenceInterval
          });
        }
      }
    }
    res.json({ msg: "Task updated", task });
  } catch (error) {
    if (error instanceof Error) {
      res.status(500).json({ error: error.message });
    } else {
      res.status(500).json({ error: "An unexpected error occurred" });
    }
  }
};


export const deleteTask = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const task = await Task.findByPk(id);
    if (!task) {
      return res.status(404).json({ msg: "Task not found", id });
    }

    const idsprint = task.get('idsprint') as number;
    await task.destroy();

    if (idsprint) {
      const tasks = await Task.findAll({
        where: { idsprint: idsprint }
      });
      //puntos totales
      const committedPoints = tasks.reduce((total, task) => total + (task.get('points') as number), 0);

      //Finalizada
      const fulfilledPoints = tasks.reduce((total, task) => {
        return task.get('status') === 'Finalizada' ? total + (task.get('points') as number) : total;
      }, 0);

      //Avanzada
      const pendingPoints = tasks.reduce((total, task) => {
        return task.get('status') === 'Avanzada' ? total + (task.get('points') as number) : total;
      }, 0);

      //Por hacer
      const noFulfilledPoints = tasks.reduce((total, task) => {
        return task.get('status') === 'Por hacer' ? total + (task.get('points') as number) : total;
      }, 0);

      //Finalizada Porcentage
      const totalTasks = tasks.length;
      const completedTasks = tasks.filter(task => task.get('status') === 'Finalizada').length;
      const donePorcentage = totalTasks > 0 ? (completedTasks / totalTasks) * 100 : 0;

      //Avanzada Porcentage
      const pendingTasks = tasks.filter(task => task.get('status') === 'Avanzada').length;
      const doingPorcentage = totalTasks > 0 ? (pendingTasks / totalTasks) * 100 : 0;

      //Por hacer Porcentage
      const todoTasks = tasks.filter(task => task.get('status') === 'Por hacer').length;
      const toDoPorcentage = totalTasks > 0 ? (todoTasks / totalTasks) * 100 : 0;

      const sprint = await Sprint.findByPk(idsprint);
      if (sprint) {
        await sprint.update({
          committedPoints,
          fulfilledPoints,
          pendingPoints,
          noFulfilledPoints,
          toDoPorcentage,
          doingPorcentage,
          donePorcentage,
         });

         // New logic for prediction calculations
        const completedSprints = await Sprint.findAll({
          where: { sprintstatus: 'Completado' }
        });

        if (completedSprints.length >= 5 && idsprint >= 6) {
          const fulfilledPointsArray = completedSprints.map(s => s.get('fulfilledPoints') as number);
          const mean = fulfilledPointsArray.reduce((acc, val) => acc + val, 0) / fulfilledPointsArray.length;
          const variance = fulfilledPointsArray.reduce((acc, val) => acc + Math.pow(val - mean, 2), 0) / fulfilledPointsArray.length;
          const stdDev = Math.sqrt(variance);

          const predictedPointsLower = Math.max(0, mean - stdDev);
          const predictedPointsUpper = Math.max(predictedPointsLower, mean + stdDev);
          const confidenceInterval = `${predictedPointsLower} - ${predictedPointsUpper}`;

          // Update sprint with prediction values
          await sprint.update({
            predictedPointsLower,
            predictedPointsUpper,
            confidenceInterval
          });
        }
      }
    }
    res.json({ msg: "Task deleted" });
  } catch (error) {
    if (error instanceof Error) {
      res.status(500).json({ error: error.message });
    } else {
      res.status(500).json({ error: "An unexpected error occurred" });
    }
  }
};

export const getTasksBySprintId = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const tasks = await Task.findAll({
      where: { id }
    });
    res.json(tasks);
  } catch (error) {
    if (error instanceof Error) {
      res.status(500).json({ error: error.message });
    } else {
      res.status(500).json({ error: "An unexpected error occurred" });
    }
  }
};

