
import { Request, Response } from "express"
import Usuario from '../models/usuario'
import * as bcrypt from 'bcrypt';
import { validationResult } from "express-validator";


//TODO: 1. Crear un PromiseAll para optimizar el código

export const getUsuarios = async (req: Request, res: Response) => {
    const limite = parseInt(req.query.limite as string, 10) || 5;
    const desde = parseInt(req.query.desde as string, 10) || 0;
    const query = { where: { estado: true } };
    const usuarios = await Usuario.findAll({
      limit: limite,
      offset: desde,
      where: query.where,
    });
    const total = await Usuario.count(query);
    res.json({
      usuarios,
      total
    });
};

  
  

export const getUsuario = async (req: Request, res: Response) => {
    const {id} = req.params
    const usuario = await Usuario.findByPk(id)
    if (usuario) {
    res.json(usuario);
}
    else {
    res.status(404).json({msg: `No existe un usuario con el id ${id}`})
}
    }

    export const postUsuario = async (req: Request, res: Response) => {
      const errors = validationResult(req);
      if (!errors.isEmpty()) {
        return res.status(400).json(errors);
      }
      const { body } = req;
    
      // encrypta la contraseña
      const salt = bcrypt.genSaltSync();
      body.password = bcrypt.hashSync(body.password, salt);
    
      try {
        const existeEmail = await Usuario.findOne({
          where: {
            email: body.email,
          },
        });
    
        if (existeEmail) {
          return res.status(400).json({
            msg: `Ya existe un usuario con el email  ${body.email}`,
          });
        } else {
          const { email, password, rol } = body;
          const usuario = await Usuario.create({
            id: body.id,
            email,
            password,
            rol,
            nombre: body.nombre,
            estado: true
          });
          

          res.json(usuario);
        }
      } catch (error) {
        console.log(error);
        res.status(500).json({
          msg: "Hable con el administrador",
        });
      }
    };

export const putUsuario = async (req: Request, res: Response) => {
    const {id} = req.params
    const {_id, password, google, ...resto} = req.body
    if (password) {
        // encryptar la contraseña  
        const salt = bcrypt.genSaltSync();
        resto.password = bcrypt.hashSync(password, salt)
    }
    const body = resto

try {

    const usuario = await Usuario.findByPk(id)  

    if (!usuario) {
        return res.status(404).json({
            msg: `No existe un usuario con el id ${id}`
        })
    }
    await usuario.update(body)

    res.json(usuario)


    } catch (error) {
        console.log(error)
        res.status(500).json({
            msg: 'Hable con el administrador'
        })
        }
    }

    interface CustomRequest extends Request {
      id?: number;
      usuario?: Usuario;
    }
    
    export const deleteUsuario = async (req: CustomRequest, res: Response) => {
      const { id } = req.params;
      const usuarioAutenticado = req.usuario  ;
      
      try {
        
        const usuario = await Usuario.findOne({
          where: { id, estado: true }
        });
        
        if (!usuario) {
          return res.status(404).json({
            msg: `No existe un usuario con el id ${id} o ya fue dado de baja anteriormente`,
          });
        }
        
    await usuario.update({ estado: false });
    
    res.json({
      id,
      msg: `El usuario con id: ${id} ha sido borrado por: `,
      usuarioAutenticado
    });
    
  } catch (error) {
    console.log(error);
    res.status(500).json({
      msg: "Hable con el administrador",
    });
  }
};





