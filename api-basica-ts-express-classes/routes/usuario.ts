import { Router,Request, Response, NextFunction } from 'express';
import { check } from 'express-validator';

import { validarCampos } from '../middlewares/validarCampos';
import { emailValidator, idValidator } from '../helpers/db-validators';
import { validarJWT } from '../middlewares/validar-JWT';
import { esAdminRole } from '../middlewares/validar-Roles';

import {getUsuarios,
        getUsuario,
        postUsuario,
        putUsuario,
        deleteUsuario } from '../controllers/usuarios'


const router = Router();

    router.get('/',       getUsuarios)
    router.get('/:id',    getUsuario)


    router.post('/',[
        check('nombre', 'El nombre no puede estar vacío').not().isEmpty(),
        check('password', 'El password debe tener al menos 6 caracteres').isLength({min: 6}),
        check('email', 'El email introducido no es válido').isEmail(),
        check('email').custom(emailValidator),
        (req:Request, res:Response, next:NextFunction) => {
            if (!req.body.rol) {
                req.body.rol = 'USER_ROLE';
            }
            next();
        },
        check('rol', 'El rol introducido no es válido').isIn(['ADMIN_ROLE', 'USER_ROLE']),
        validarCampos
    ], postUsuario)
    
        
    router.put('/:id',[
        check('id').custom(idValidator),
        validarCampos
    ] , putUsuario)

    
    router.delete('/:id',[
        validarJWT,
        esAdminRole,
        check('id').custom(idValidator),
        validarCampos
    ], deleteUsuario)



export default router; 