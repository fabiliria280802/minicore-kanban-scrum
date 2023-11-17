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

export const loginUser = (req: Request, res: Response) => {
    const { username, password } = req.body;
    connection.query('SELECT * FROM user WHERE username = ? AND password = ?', [username, password], (error, data) => {
        if (error) {
            res.status(500).json({ msg: "Error al consultar la base de datos" });
            return;
        }
        if (data.length === 0) {
            res.status(404).json({ msg: "Usuario no encontrado o contraseña incorrecta" });
        } else {
            const user = data[0];
            if (user.role === 'Administrador') {
                res.json({ ...user, isAdmin: true });
            } else {
                res.json({ ...user, isAdmin: false });
            }
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

export const validateUser = (req: Request, res: Response) => {
    const { username, password } = req.body;
    const query = 'SELECT * FROM user WHERE username = ? AND password = ?';
    connection.query(query, [username, password], (error, data) => {
        if (error) {
            res.status(500).json({ error: "Error interno del servidor" });
        } else if (data.length === 0) {
            res.status(404).json({ msg: "Usuario o contraseña incorrectos" });
        } else {
            res.json({ msg: "Login exitoso", user: data[0] });
        }
    });
};
