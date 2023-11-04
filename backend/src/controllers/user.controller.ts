import {Request, Response} from 'express';

export const getUser = (req: Request,res: Response)=>{
    const {id} = req.params;
    res.json({
        msg: "getUser",
        id: id,
    })
}

export const getUsers = (req: Request,res: Response)=>{
    res.json({
        msg: "getUsers"
    })
}

export const postUser = (req: Request,res: Response)=>{
    const {body} = req;
    res.json({
        msg: "postUser",
        body: body,
    })
}

export const putUser = (req: Request,res: Response)=>{
    const {id} = req.params;
    const {body} = req;
    res.json({
        msg: "putUser",
        id: id,
        body: body,
    })
}

export const deleteUser = (req: Request,res: Response)=>{
    const {id} = req.params;
    res.json({
        msg: "deleteUser",
        id: id,
    })
}