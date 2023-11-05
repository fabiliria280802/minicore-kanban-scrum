import {Request, Response, query} from 'express';
import connection from '../db/connection';

export const getTask = (req: Request, res: Response) => {
    const { id } = req.params;
    connection.query('SELECT * FROM task WHERE idtask = ?', id, (error, data) => {
        if (error) throw error;
        if (data.length === 0) {
            res.status(404).json({
                msg: "task not found",
                id: id
            });
        } else {
            res.json(data[0]);
        }
    });
};

export const getTasks = (req: Request,res: Response)=>{
    connection.query('SELECT * FROM task',(error, data)=>{
        if(error) throw error;
        res.json(data)
    })
}

export const postTask = (req: Request, res: Response) => {
    const { body } = req;
    const query = 'INSERT INTO task SET ?';
    connection.query(query, body, (error, data) => {
        if (error) {
            res.status(500).json({
                error: "Error al insertar task"
            });
        } else {
            res.json({
                msg: "task agregada con éxito"
            });
        }
    });
};

export const putTask = (req: Request,res: Response)=>{
    const {id} = req.params;
    const {body} = req;
    const query = 'UPDATE task SET ? WHERE idtask =?';
    connection.query(query,[body,id],(error, data)=>{
        if(error) throw error;
        if(data.length === 0){
            res.status(404).json({
                msg: "task not found",
                id: id
            });
        }else{
            res.json({
                msg: "task updated"
            });
        }
    })
}

export const deleteTask = (req: Request, res: Response) => {
    const { id } = req.params;
    connection.query('SELECT * FROM task WHERE idtask = ?', id, (error, result) => {
        if (error) throw error;
        if (result.length === 0) {
            res.status(404).json({
                msg: "task not found",
                id: id
            });
        } else {
            connection.query('DELETE FROM task WHERE idtask = ?', id, (deleteError, data) => {
                if (deleteError) throw deleteError;
                res.json({
                    msg: "task deleted"
                });
            });
        }
    });
};