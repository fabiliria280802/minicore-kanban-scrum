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
    const { title, initialDate, finalDate } = req.body;
    try {
        const startDate = new Date(initialDate);
        const endDate = new Date(finalDate);
        if (isNaN(startDate.getTime()) || isNaN(endDate.getTime())) {
            return res.status(400).json({ error: 'Las fechas proporcionadas no son válidas.' });
        }
        if (endDate <= startDate) {
            return res.status(400).json({ error: 'La fecha final no puede ser anterior o igual a la fecha inicial.' });
        }
        const timeDiff = endDate.getTime() - startDate.getTime();
        const dayDiff = timeDiff / (1000 * 3600 * 24);
        if (dayDiff > 15) {
            return res.status(400).json({ error: 'La diferencia entre la fecha inicial y final no puede ser mayor a 15 días.' });
        }
        const newSprint = await Sprint.create(req.body);
        res.status(201).json(newSprint);
    } catch (error) {
        if (error instanceof Error) {
            res.status(500).json({ error: error.message });
        } else {
            res.status(500).json({ error: 'Error al insertar sprint' });
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
