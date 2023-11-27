import {Request, Response, query} from 'express';
import connection from '../db/connection';
import bcrypt from 'bcrypt';
import User from '../models/user';
import jwt from 'jsonwebtoken';

export const getUser = (req: Request, res: Response) => {
    const { id } = req.params;
    const query = 'SELECT * FROM user WHERE iduser = ?';
    /*
    connection.query(query, id, (error, data) => {
        if (error) throw error;
        if (data.length === 0) {
            res.status(404).json({
                msg: "User not found",
                id: id
            });
        } else {
            res.json(data[0]);
        }
    });*/
};

export const loginUser = async (req: Request, res: Response) => {
    const { username, password } = req.body;
    const user: any = await User.findOne({ where: { username: username } });
    if (user) {
      return res.status(400).json({
        msg: `No existe un usuario con el nombre ${username} en la base de datos`
      });
    }

    const passwordValid = await bcrypt.compare(password, user.password);
    if (!passwordValid) {
        return res.status(400).json({
            msg: 'Password Incorrecta'
        });
    }

    const token = jwt.sign({
        username: username
    },process.env.SECRET_KEY ?? '773H3LL');
    res.json(token);
};
  

export const getUsers = (req: Request,res: Response)=>{
    const query = 'SELECT * FROM user';
    /*
    connection.query(query,(error, data)=>{
        if(error) throw error;
        res.json(data)
    })*/
}

//new user equal
export const postUser = async (req: Request, res: Response) => {
    const { username, password } = req.body;
    const user = await User.findOne({ where: { username: username } });

    if (user) {
      return res.status(400).json({
        msg: `Ya existe un usuario con el nombre ${username}`
      });
    }
    
    console.log('sigo');
    

    const hashedPassword = await bcrypt.hash(password, 10);
    try{
        await User.create({
            username: username,
            password: hashedPassword
          });
        
          res.json({
            msg: `Usuario ${username} creado exitosamente`
          });
    }catch(error){
        res.status(404).json({
            msg:"Ups ocurrio un error", 
            error
        })
    }
  };
  
    
    /*
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
    });*/

export const putUser = (req: Request,res: Response)=>{
    const {id} = req.params;
    const {body} = req;
    const query = 'UPDATE user SET ? WHERE iduser =?';
    /*
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
    })*/
}

export const deleteUser = (req: Request, res: Response) => {
    const { id } = req.params;
    const query = 'DELETE FROM user WHERE iduser = ?';
    /*
    connection.query(query, id, (error, result) => {
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
    });*/
};

