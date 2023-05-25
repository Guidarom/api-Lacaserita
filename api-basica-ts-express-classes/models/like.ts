import { Model, DataTypes } from 'sequelize';
import db from '../database/config';
import Receta from './recetas';
import Usuario from './usuario';

class Like extends Model {
  public id!: number;
  public usuarioId!: number;
  public recetaId!: number;
}

Like.init(
  {
    id: {
      type: DataTypes.INTEGER.UNSIGNED,
      autoIncrement: true,
      primaryKey: true,
    },
    usuarioId: {
      type: DataTypes.INTEGER.UNSIGNED,
      allowNull: false,
      references: {
        model: Usuario,
        key: 'id',
      },
    },
    recetaId: {
      type: DataTypes.INTEGER.UNSIGNED,
      allowNull: false,
      references: {
        model: Receta,
        key: 'id',
      },
    },
  },
  {
    sequelize: db,
    modelName: 'Like',
  }
);

export default Like;
