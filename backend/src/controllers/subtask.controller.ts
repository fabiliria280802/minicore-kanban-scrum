import {Request, Response, query} from 'express';
import connection from '../db/connection';

export const getSubtask = (req: Request, res: Response) => {
    const { id } = req.params;
    connection.query('SELECT * FROM subtask WHERE idsubtask = ?', id, (error, data) => {
        if (error) throw error;
        if (data.length === 0) {
            res.status(404).json({
                msg: "Subtask not found",
                id: id
            });
        } else {
            res.json(data[0]);
        }
    });
};


export const getSubtasks = (req: Request,res: Response)=>{
    connection.query('SELECT * FROM subtask',(error, data)=>{
        if(error) throw error;
        res.json(data)
    })
}

export const postSubtask = (req: Request, res: Response) => {
    const { body } = req;
    const query = 'INSERT INTO subtask SET ?';
    connection.query(query, body, (error, data) => {
        if (error) {
            res.status(500).json({
                error: "Error al insertar subtask"
            });
        } else {
            res.json({
                msg: "subtask agregada con éxito"
            });
        }
    });
};


export const putSubtask = (req: Request,res: Response)=>{
    const {id} = req.params;
    const {body} = req;
    const query = 'UPDATE subtask SET ? WHERE idsubtask =?';
    connection.query(query,[body,id],(error, data)=>{
        if(error) throw error;
        if(data.length === 0){
            res.status(404).json({
                msg: "subtask not found",
                id: id
            });
        }else{
            res.json({
                msg: "subtask updated"
            });
        }
    })
}

export const deleteSubtask = (req: Request, res: Response) => {
    const { id } = req.params;
    connection.query('SELECT * FROM subtask WHERE idsubtask = ?', id, (error, result) => {
        if (error) throw error;
        if (result.length === 0) {
            res.status(404).json({
                msg: "subtask not found",
                id: id
            });
        } else {
            connection.query('DELETE FROM subtask WHERE idsubtask = ?', id, (deleteError, data) => {
                if (deleteError) throw deleteError;
                res.json({
                    msg: "subtask deleted"
                });
            });
        }
    });
};