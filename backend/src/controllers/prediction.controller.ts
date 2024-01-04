import { Request, Response } from "express";
import Prediction from "../models/prediction";
import Sprint from "../models/sprint"

async function calculatePredictionForSprint(): Promise<{ lower: number, upper: number }> {
    // Obtener los últimos 5 sprints con estado 'Completado'.
    const completedSprints = await Sprint.findAll({
      where: { sprintstatus: 'Completado' },
      order: [['finalDate', 'DESC']],
      limit: 5
    });
    if (completedSprints.length < 5) {
      throw new Error('No hay suficientes sprints completados para hacer una predicción.');
    }
    let fulfilledPointsArray = completedSprints.map(sprint => sprint.get('fulfilledPoints') as number);
    let mean = fulfilledPointsArray.reduce((acc, val) => acc + val, 0) / fulfilledPointsArray.length;
    let stdDev = Math.sqrt(fulfilledPointsArray.map(val => Math.pow(val - mean, 2)).reduce((acc, val) => acc + val, 0) / fulfilledPointsArray.length);

    // Rango de predicción.
    let predictedPointsLower = mean - stdDev;
    let predictedPointsUpper = mean + stdDev;

    // Validacon de valores posibles
    predictedPointsLower = Math.max(0, predictedPointsLower);
    predictedPointsUpper = Math.max(predictedPointsLower, predictedPointsUpper);

    return { lower: Math.round(predictedPointsLower), upper: Math.round(predictedPointsUpper) };
  }

export const getPrediction = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const prediction = await Prediction.findByPk(id);
    if (!prediction) {
      return res.status(404).json({ msg: "Prediction not found", id });
    }
    res.json(prediction);
  } catch (error) {
    if (error instanceof Error) {
      res.status(500).json({ error: error.message });
    } else {
      res.status(500).json({ error: "An unexpected error occurred" });
    }
  }
};

export const getPredictions = async (req: Request, res: Response) => {
  try {
    const predictions = await Prediction.findAll();
    res.json(predictions);
  } catch (error) {
    if (error instanceof Error) {
      res.status(500).json({ error: error.message });
    } else {
      res.status(500).json({ error: "An unexpected error occurred" });
    }
  }
};

export const postPrediction = async (req: Request, res: Response) => {
    try {
      const { lower, upper } = await calculatePredictionForSprint();
      const newPrediction = await Prediction.create({
        idsprint: req.body.idsprint,
        predictedPointsLower: lower,
        predictedPointsUpper: upper,
        confidenceInterval:`${lower} - ${upper}`,
      });

      res.status(201).json(newPrediction);
    } catch (error) {
      if (error instanceof Error) {
        res.status(500).json({ error: error.message });
      } else {
        res.status(500).json({ error: "Error al insertar prediction" });
      }
    }
  };

