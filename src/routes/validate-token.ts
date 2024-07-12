import { Request, Response, NextFunction } from "express";
import jwt from 'jsonwebtoken';

const validateToken = (req : Request, res: Response,  next: NextFunction)=>{
    
    const headerToken = req.headers['authorization'];

    if(headerToken != undefined && headerToken.startsWith('Bearer ')){
        //validar el token
        try {
            const bearerToken = headerToken.slice(7);
        jwt.verify(bearerToken, process.env.SECRET_KEY || 'prueba123');

        next();
        } catch (error) {
            res.status(401).json({
                msg: `Token invalido`
            })
        }
        
    }else{
        res.status(400).json({
            msg: `Acceso denegado`
        });
    }    
}

export default validateToken;