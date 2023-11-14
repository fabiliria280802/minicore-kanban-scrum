import {Request, Response, query} from 'express';
import connection from '../db/connection';

export const getUser = (req: Request, res: Response) => {
    const { id } = req.params;
    connection.query('SELECT * FROM user WHERE iduser = ?', id, (error, data) => {
        if (error) throw error;
        if (data.length === 0) {
            res.status(404).json({
                msg: "User not found",
                id: id
            });
        } else {
            res.json(data[0]);
        }
    });
};

export const getUsers = (req: Request,res: Response)=>{
    connection.query('SELECT * FROM user',(error, data)=>{
        if(error) throw error;
        res.json(data)
    })
}

export const postUser = (req: Request, res: Response) => {
    const { body } = req;
    const query = 'INSERT INTO user SET ?';
    connection.query(query, body, (error, data) => {
        if (error) {
            res.status(500).json({
                error: "Error al insertar usuario"
            });
        } else {
            res.json({
                msg: "Persona agregada con éxito"
            });
        }
    });
};

export const putUser = (req: Request,res: Response)=>{
    const {id} = req.params;
    const {body} = req;
    const query = 'UPDATE user SET ? WHERE iduser =?';
    connection.query(query,[body,id],(error, data)=>{
        if(error) throw error;
        if(data.length === 0){
            res.status(404).json({
                msg: "User not found",
                id: id
            });
        }else{
            res.json({
                msg: "User updated"
            });
        }
    })
}

export const deleteUser = (req: Request, res: Response) => {
    const { id } = req.params;
    connection.query('SELECT * FROM user WHERE iduser = ?', id, (error, result) => {
        if (error) throw error;
        if (result.length === 0) {
            res.status(404).json({
                msg: "User not found",
                id: id
            });
        } else {
            connection.query('DELETE FROM user WHERE iduser = ?', id, (deleteError, data) => {
                if (deleteError) throw deleteError;
                res.json({
                    msg: "User deleted"
                });
            });
        }
    });
};