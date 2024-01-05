import { Request, Response } from "express";
import Task from "../models/task";
import Sprint from "../models/sprint"
import Prediction from "../models/prediction";

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
      const toDoPorcentage = totalTasks > 0 ? (completedTasks / totalTasks) * 100 : 0;

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

         // Verificar y calcular los puntos de predicción
        const completedSprints = await Sprint.findAll({
          where: { sprintstatus: 'completado' }
        });
        if (completedSprints.length >= 5) {
          // Calcular media y desviación estándar
          const fulfilledPointsArray = completedSprints.map(s => s.get('fulfilledPoints') as number);
          const mean = fulfilledPointsArray.reduce((acc, val) => acc + val, 0) / fulfilledPointsArray.length;
          const stdDev = Math.sqrt(fulfilledPointsArray.map(val => Math.pow(val - mean, 2)).reduce((acc, val) => acc + val, 0) / fulfilledPointsArray.length);

          let predictedPointsLower = Math.max(0, mean - stdDev);
          let predictedPointsUpper = Math.max(predictedPointsLower, mean + stdDev);
          let confidenceInterval = `${{predictedPointsLower}} - ${{predictedPointsUpper}}`;
          // Actualizar la tabla 'prediction'
          const idPrediction = sprint.get('idprediction') as number;
          if (idPrediction) {
            await Prediction.update(
              {
                predictedPointsLower,
                predictedPointsUpper,
                confidenceInterval
              },
              {
                where: { id: idPrediction }
              }
            );
          }
        }
      }
    }
    res.status(201).json(newTask);
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
      const toDoPorcentage = totalTasks > 0 ? (completedTasks / totalTasks) * 100 : 0;

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
         // Verificar y calcular los puntos de predicción
         const completedSprints = await Sprint.findAll({
          where: { sprintstatus: 'completado' }
        });
        if (completedSprints.length >= 5) {
          // Calcular media y desviación estándar
          const fulfilledPointsArray = completedSprints.map(s => s.get('fulfilledPoints') as number);
          const mean = fulfilledPointsArray.reduce((acc, val) => acc + val, 0) / fulfilledPointsArray.length;
          const stdDev = Math.sqrt(fulfilledPointsArray.map(val => Math.pow(val - mean, 2)).reduce((acc, val) => acc + val, 0) / fulfilledPointsArray.length);

          let predictedPointsLower = Math.max(0, mean - stdDev);
          let predictedPointsUpper = Math.max(predictedPointsLower, mean + stdDev);
          let confidenceInterval = `${{predictedPointsLower}} - ${{predictedPointsUpper}}`;
          // Actualizar la tabla 'prediction'
          const idPrediction = sprint.get('idprediction') as number;
          if (idPrediction) {
            await Prediction.update(
              {
                predictedPointsLower,
                predictedPointsUpper,
                confidenceInterval
              },
              {
                where: { id: idPrediction }
              }
            );
          }
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
      const toDoPorcentage = totalTasks > 0 ? (completedTasks / totalTasks) * 100 : 0;

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
         // Verificar y calcular los puntos de predicción
         const completedSprints = await Sprint.findAll({
          where: { sprintstatus: 'completado' }
        });
        if (completedSprints.length >= 5) {
          // Calcular media y desviación estándar
          const fulfilledPointsArray = completedSprints.map(s => s.get('fulfilledPoints') as number);
          const mean = fulfilledPointsArray.reduce((acc, val) => acc + val, 0) / fulfilledPointsArray.length;
          const stdDev = Math.sqrt(fulfilledPointsArray.map(val => Math.pow(val - mean, 2)).reduce((acc, val) => acc + val, 0) / fulfilledPointsArray.length);

          let predictedPointsLower = Math.max(0, mean - stdDev);
          let predictedPointsUpper = Math.max(predictedPointsLower, mean + stdDev);
          let confidenceInterval = `${{predictedPointsLower}} - ${{predictedPointsUpper}}`;
          // Actualizar la tabla 'prediction'
          const idPrediction = sprint.get('idprediction') as number;
          if (idPrediction) {
            await Prediction.update(
              {
                predictedPointsLower,
                predictedPointsUpper,
                confidenceInterval
              },
              {
                where: { id: idPrediction }
              }
            );
          }
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

