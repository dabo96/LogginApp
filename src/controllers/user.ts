import { Request, Response } from "express";
import bcrypt from "bcrypt";
import { User } from "../models/user";
import jwt from "jsonwebtoken";

export const newUser = async (req: Request, res: Response) =>{
    const { username, password } = req.body;

    //validacion si el usuario existe
    const user = await User.findOne({
         where: {
            userName: username
         }
    });

    if(user){
        return res.status(400).json({
            msg: "Usuario ya existente"
        });
    }

    const hashedPassword = await bcrypt.hash(password, 10);
    
    try {
        await User.create({
            userName: username,
            password: hashedPassword
        });
    
        res.json({
            msg: `Usuario ${username} Creado Correctamente`,
            
        });
    } catch (error) {
        res.status(400).json({
            msg: "Ocurrio un error",
            error
        });
    }
}

export const loginUser = async (req: Request, res: Response) =>{
    const { username, password } = req.body;

    //validamos si usuario existe
    const user: any = await User.findOne({
        where: {
           userName: username
        }
    });
    if(!user){
        return res.status(400).json({
            msg: `Usuario ${username} no existe en la base de datos`
        });
    }
    //validamos password
    const isValidPassword = await bcrypt.compare(password, user.password);

    if(!isValidPassword){
        return res.status(400).json({
            msg: `Contraseña Incorrecta`
        })
    }

    //generamos el token
    const token = jwt.sign({
        userName: username
    }, process.env.SECRET_KEY || 'prueba123');

    res.json({
        token
    });
}