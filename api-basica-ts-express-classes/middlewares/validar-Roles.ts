


//middlewares/validar-roles.ts
 
import { Request, Response, NextFunction } from 'express';
import  Usuario  from '../models/usuario';

interface CustomRequest extends Request {
    id?: number;
    usuario?: Usuario;
}

export const esAdminRole = (req: CustomRequest, res: Response, next: NextFunction) => {
    if (!req.usuario) {
        return res.status(500).json({
            msg: 'Se quiere verificar el role sin validar el token primero'
        });
    }
    const { rol, nombre } = req.usuario;
    if (rol !== 'ADMIN_ROLE') {
        return res.status(401).json({
            msg: `${nombre} no es administrador - No puede hacer esto`
        });
    }
    next();
}

