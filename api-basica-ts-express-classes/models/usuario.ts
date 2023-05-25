import { Model, DataTypes } from 'sequelize';
import db from '../database/config';
import Favorita from './favoritas';
import Receta from './recetas';

export interface UsuarioAttributes {
  id: number;
  nombre: string;
  email: string;
  password: string;
  estado: boolean;
  rol: string;
}

export class Usuario extends Model<UsuarioAttributes> implements UsuarioAttributes {
  public id!: number;
  public nombre!: string;
  public email!: string;
  public password!: string;
  public estado!: boolean;
  public rol!: string;
}

Usuario.init(
  {
    id: {
      type: DataTypes.INTEGER.UNSIGNED,
      autoIncrement: true,
      primaryKey: true,
    },
    nombre: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    email: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
    },
    password: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    estado: {
      type: DataTypes.BOOLEAN,
      allowNull: false,
      defaultValue: true,
    },
    rol: {
      type: DataTypes.STRING,
      defaultValue: 'USER_ROLE',
    },
  },
  {
    sequelize: db,
    modelName: 'Usuario',
  }
);


export default Usuario;
