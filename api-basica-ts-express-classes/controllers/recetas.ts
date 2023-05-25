import { Request, Response } from 'express';
import Receta from '../models/recetas';
import Favorita from '../models/favoritas';

export const getRecetas = async (req: Request, res: Response) => {
  try {
    const recetas = await Receta.findAll();
    res.json(recetas);
  } catch (error) {
    console.log(error);
    res.status(500).json({ msg: 'Hubo un error al obtener las recetas' });
  }
};

export const getReceta = async (req: Request, res: Response) => {
  const { id } = req.params;
  try {
    const receta = await Receta.findByPk(id);
    if (receta) {
      res.json(receta);
    } else {
      res.status(404).json({ msg: `No existe una receta con el id ${id}` });
    }
  } catch (error) {
    console.log(error);
    res.status(500).json({ msg: 'Hubo un error al obtener la receta' });
  }
};

export const crearReceta = async (req: Request, res: Response) => {
  const { body } = req;
  try {
    const receta = await Receta.create(body);
    res.json(receta);
  } catch (error) {
    console.log(error);
    res.status(500).json({ msg: 'Hubo un error al crear la receta' });
  }
};

export const actualizarReceta = async (req: Request, res: Response) => {
  const { id } = req.params;
  const { body } = req;
  try {
    const receta = await Receta.findByPk(id);
    if (!receta) {
      return res
        .status(404)
        .json({ msg: `No existe una receta con el id ${id}` });
    }
    await receta.update(body);
    res.json(receta);
  } catch (error) {
    console.log(error);
    res.status(500).json({ msg: 'Hubo un error al actualizar la receta' });
  }
};

export const borrarReceta = async (req: Request, res: Response) => {
  const { id } = req.params;
  try {
    const receta = await Receta.findByPk(id);
    if (!receta) {
      return res
        .status(404)
        .json({ msg: `No existe una receta con el id ${id}` });
    }
    await receta.destroy();
    res.json({ msg: `Receta con id ${id} eliminada correctamente` });
  } catch (error) {
    console.log(error);
    res.status(500).json({ msg: 'Hubo un error al eliminar la receta' });
  }
};

export const marcarFavorita = async (req: Request, res: Response) => {
  const { usuarioId, recetaId } = req.params;
  try {
    const favorita = await Favorita.create({
      id: 0,
      recetaId: parseInt(recetaId),
      usuarioId: parseInt(usuarioId),
    });
    res.json(favorita);
  } catch (error) {
    console.log(error);
    res.status(500).json({ msg: 'Hubo un error al marcar la receta como favorita' });
  }
};
