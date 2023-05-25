import { Request, Response } from 'express';
import Usuario  from '../models/usuario';
import  UsuarioAttributes  from '../models/usuario';
import * as bcrypt from 'bcrypt';
import { generarJWT } from '../helpers/generarJWT';
import { GoogleVerify } from '../helpers/google-verify';


export const login = async (req:Request, res:Response) => {

    const {email, password} = req.body;

    try {

        //verificar si el email existe
        const usuario: UsuarioAttributes | null = await Usuario.findOne({where: {email}});
        if (!usuario) {
            return res.status(400).json({
                msg: `El usuario con el email ${email} no existe`
            })
        }

        //verificar si el usuario esta activo

        const usuarioActivo: UsuarioAttributes | null = await Usuario.findOne({where: {email, estado: true}});
        if (!usuarioActivo) {
            return res.status(400).json({
                msg: `Usuario o password incorrectos - estado: false`
            })
        }


        //verificar la contraseña
        
        const validPassword = bcrypt.compareSync(password, usuario.password);
        if (!validPassword) {
            return res.status(400).json({
                msg: `El usuario o la contraseña no son validos - password`
            })
        }

        //generar el JWT

        const token = await generarJWT(usuario.id.toString());


        res.json({
            msg: 'login correcto',
            usuario,
            token
        })
    } catch (error) {
        console.log(error)
        res.status(500).json({
            msg: 'Hable con el administrador'
        })
    
    }       
}


export const googleSignIn = async (req:Request, res:Response) => {


    const {id_token} = req.body;

    try {
        
        const {email, nombre} = await GoogleVerify(id_token);
        
        let usuario: UsuarioAttributes | null = await Usuario.findOne({where: {email}});
        
        if (!usuario) {
            //si no existe, crear usuario
            const data = {
                id : 0,
                nombre,
                email,
                password: ':P',
                google: true,
                estado: true,
                rol: 'USER_ROLE'

            }
            
            usuario = await Usuario.create(data);
        

        //si el usuario en DB

            //if (!usuario.estado) {
            //      return res.status(401).json({
            //      msg: 'Hable con el administrador, usuario bloqueado'
            //      })
            //     }
        const token = await generarJWT(usuario.id.toString());
  

        res.json({
            msg: 'google sign in',
            usuario,
            token
        })

    }

    } catch (error) {
        res.status(400).json({
            msg: 'Token de google no es válido o no se pudo verificar'
        })
    }       
}


