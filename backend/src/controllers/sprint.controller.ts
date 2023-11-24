import { Request, Response } from 'express';
import Sprint from '../models/sprint';

export const getSprint = async (req: Request, res: Response) => {
    try {
        const { id } = req.params;
        const sprint = await Sprint.findByPk(id);
        if (!sprint) {
            return res.status(404).json({ msg: "Sprint not found", id });
        }
        res.json(sprint);
    } catch (error) {
        if (error instanceof Error) {
            res.status(500).json({ error: error.message });
        } else {
            res.status(500).json({ error: "An unexpected error occurred" });
        }
    }
};

export const getSprints = async (req: Request, res: Response) => {
    try {
        const sprints = await Sprint.findAll();
        res.json(sprints);
    } catch (error) {
        if (error instanceof Error) {
            res.status(500).json({ error: error.message });
        } else {
            res.status(500).json({ error: "An unexpected error occurred" });
        }
    }
};

export const postSprint = async (req: Request, res: Response) => {
    try {
        const newSprint = await Sprint.create(req.body);
        res.status(201).json(newSprint);
    } catch (error) {
        if (error instanceof Error) {
            res.status(500).json({ error: error.message });
        } else {
            res.status(500).json({ error: "Error al insertar sprint" });
        }
    }
};

export const putSprint = async (req: Request, res: Response) => {
    try {
        const { id } = req.params;
        const sprint = await Sprint.findByPk(id);
        if (!sprint) {
            return res.status(404).json({ msg: "Sprint not found", id });
        }
        await sprint.update(req.body);
        res.json({ msg: "Sprint updated", sprint });
    } catch (error) {
        if (error instanceof Error) {
            res.status(500).json({ error: error.message });
        } else {
            res.status(500).json({ error: "Error al actualizar sprint" });
        }
    }
};

export const deleteSprint = async (req: Request, res: Response) => {
    try {
        const { id } = req.params;
        const sprint = await Sprint.findByPk(id);
        if (!sprint) {
            return res.status(404).json({ msg: "Sprint not found", id });
        }
        await sprint.destroy();
        res.json({ msg: "Sprint deleted" });
    } catch (error) {
        if (error instanceof Error) {
            res.status(500).json({ error: error.message });
        } else {
            res.status(500).json({ error: "Error al eliminar sprint" });
        }
    }
};
