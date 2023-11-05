import {Request, Response, query} from 'express';
import connection from '../db/connection';

export const getSprint = (req: Request, res: Response) => {
    const { id } = req.params;
    connection.query('SELECT * FROM sprint WHERE idsprint = ?', id, (error, data) => {
        if (error) throw error;
        if (data.length === 0) {
            res.status(404).json({
                msg: "sprint not found",
                id: id
            });
        } else {
            res.json(data[0]);
        }
    });
};


export const getSprints = (req: Request,res: Response)=>{
    connection.query('SELECT * FROM sprint',(error, data)=>{
        if(error) throw error;
        res.json(data)
    })
}

export const postSprint = (req: Request, res: Response) => {
    const { body } = req;
    const query = 'INSERT INTO sprint SET ?';
    connection.query(query, body, (error, data) => {
        if (error) {
            res.status(500).json({
                error: "Error al insertar usuario"
            });
        } else {
            res.json({
                msg: "sprint agregada con éxito"
            });
        }
    });
};


export const putSprint = (req: Request,res: Response)=>{
    const {id} = req.params;
    const {body} = req;
    const query = 'UPDATE sprint SET ? WHERE idsprint =?';
    connection.query(query,[body,id],(error, data)=>{
        if(error) throw error;
        if(data.length === 0){
            res.status(404).json({
                msg: "sprint not found",
                id: id
            });
        }else{
            res.json({
                msg: "sprint updated"
            });
        }
    })
}

export const deleteSprint = (req: Request, res: Response) => {
    const { id } = req.params;
    connection.query('SELECT * FROM sprint WHERE idsprint = ?', id, (error, result) => {
        if (error) throw error;
        if (result.length === 0) {
            res.status(404).json({
                msg: "sprint not found",
                id: id
            });
        } else {
            connection.query('DELETE FROM sprint WHERE idsprint = ?', id, (deleteError, data) => {
                if (deleteError) throw deleteError;
                res.json({
                    msg: "sprint deleted"
                });
            });
        }
    });
};