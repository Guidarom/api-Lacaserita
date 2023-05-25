import { Router } from 'express';
import { check } from 'express-validator';
import { login, googleSignIn } from '../controllers/auth';
import { validarCampos } from '../middlewares/validarCampos';
export const router = Router();

router.post('/login', [
    check('email', 'El email es obligatorio').isEmail(),
    check('password', 'El password es obligatorio').not().isEmpty(),
    validarCampos
],login)



router.post('/google', [
    check('id_token', 'Se requiere autenticación con google (id_token)').not().isEmpty(),
    
    validarCampos
],googleSignIn)






