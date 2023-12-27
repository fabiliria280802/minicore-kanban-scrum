import { Request, Response } from "express";
import Subtask from "../models/subtask";

export const getSubtask = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const subtask = await Subtask.findByPk(id);
    if (!subtask) {
      return res.status(404).json({ msg: "Subtask not found", id });
    }
    res.json(subtask);
  } catch (error) {
    if (error instanceof Error) {
      res.status(500).json({ error: error.message });
    } else {
      res.status(500).json({ error: "An unexpected error occurred" });
    }
  }
};

export const getSubtasks = async (req: Request, res: Response) => {
  try {
    const subtasks = await Subtask.findAll();
    res.json(subtasks);
  } catch (error) {
    if (error instanceof Error) {
      res.status(500).json({ error: error.message });
    } else {
      res.status(500).json({ error: "An unexpected error occurred" });
    }
  }
};

export const postSubtask = async (req: Request, res: Response) => {
  try {
    const newSubtask = await Subtask.create(req.body);
    res.status(201).json(newSubtask);
  } catch (error) {
    if (error instanceof Error) {
      res.status(500).json({ error: error.message });
    } else {
      res.status(500).json({ error: "Error al insertar subtask" });
    }
  }
};

export const putSubtask = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const subtask = await Subtask.findByPk(id);
    if (!subtask) {
      return res.status(404).json({ msg: "Subtask not found", id });
    }
    await subtask.update(req.body);
    res.json({ msg: "Subtask updated", subtask });
  } catch (error) {
    if (error instanceof Error) {
      res.status(500).json({ error: error.message });
    } else {
      res.status(500).json({ error: "Error al actualizar subtask" });
    }
  }
};

export const deleteSubtask = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const subtask = await Subtask.findByPk(id);
    if (!subtask) {
      return res.status(404).json({ msg: "Subtask not found", id });
    }
    await subtask.destroy();
    res.json({ msg: "Subtask deleted" });
  } catch (error) {
    if (error instanceof Error) {
      res.status(500).json({ error: error.message });
    } else {
      res.status(500).json({ error: "Error al eliminar subtask" });
    }
  }
};
