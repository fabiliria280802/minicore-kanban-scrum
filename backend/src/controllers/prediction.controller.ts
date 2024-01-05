import { Request, Response } from "express";
import Prediction from "../models/prediction";
import Sprint from "../models/sprint"

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


