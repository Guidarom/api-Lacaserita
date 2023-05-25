import { Request, Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';
import Usuario from '../models/usuario';

interface CustomRequest extends Request {
    sub?: string;
    usuario?: Usuario;
}



export const validarJWT = async (req: CustomRequest, res: Response, next: NextFunction) => {
    // x-token headers
    const token = req.header('x-token');
   
    if (!token) {
        return res.status(401).json({
            ok: false,
            msg: 'No hay token en la petición'
        });
    }
    
    try {
        const { sub } = jwt.verify(token, process.env.SECRETORPRIVATEKEY) as { sub: string };
        
        const usuario = await Usuario.findByPk(sub);
    
        
        if (usuario?.estado===false)  {      
            return res.status(401).json({
                ok: false,
                msg: 'usuario no valido - estado: false'         
            });
        }
        
        { 
            
           
        req.usuario = usuario||undefined;

        next();
        }

    }catch (error) {
        return res.status(401).json({
            ok: false,
            msg: 'Token no válido'
        });
    }

};
