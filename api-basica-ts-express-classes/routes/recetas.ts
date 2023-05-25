import express, { Request, Response, NextFunction } from 'express';
import Receta from '../models/recetas';
import { validateCreateReceta, validateUpdateReceta } from '../helpers/recetaValidator';
import like from '../models/like';
const router = express.Router();

// Manejo de errores
const errorHandler = (error: Error, req: Request, res: Response, next: NextFunction) => {
  console.error(error);
  res.status(500).json({ success: false, error: 'Error interno del servidor' });
};

// Obtener todas las recetas
router.get('/', async (req: Request, res: Response, next: NextFunction) => {
  try {
    const recetas = await Receta.findAll();
    res.status(200).json({ success: true, data: recetas });
  } catch (error) {
    next(error);
  }
});

// Obtener una receta específica
router.get('/:id', async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { id } = req.params;
    const receta = await Receta.findByPk(id);
    if (!receta) {
      return res.status(404).json({ success: false, error: 'Receta no encontrada' });
    }
    res.status(200).json({ success: true, data: receta });
  } catch (error) {
    next(error);
  }
});

// Crear una nueva receta
router.post('/', validateCreateReceta, async (req: Request, res: Response, next: NextFunction) => {
  try {
    const receta = await Receta.create(req.body);
    res.status(201).json({ success: true, data: receta });
  } catch (error) {
    next(error);
  }
});


// Actualizar una receta existente
router.put('/:id', validateUpdateReceta, async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { id } = req.params;
    const [updated] = await Receta.update(req.body, {
      where: { id: id }
    });
    if (updated) {
      const updatedReceta = await Receta.findByPk(id);
      return res.status(200).json({ success: true, data: updatedReceta });
    }
    throw new Error('Receta no encontrada');
  } catch (error) {
    next(error);
  }
});

// Dar "Me gusta" a una receta específica
router.post('/:id/like', async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { id } = req.params;
    const receta = await Receta.findByPk(id);

    if (!receta) {
      return res.status(404).json({ success: false, error: 'Receta no encontrada' });
    }

    // Verificar si el usuario ya ha dado "Me gusta" a la receta
    const userId = 123; // ID del usuario actualmente autenticado (debes obtenerlo de la autenticación)
    const existingLike = await like.findOne({
      where: { usuarioId: userId, recetaId: receta.id },
    });

    if (existingLike) {
      return res.status(400).json({ success: false, error: 'Ya has dado "Me gusta" a esta receta' });
    }

    // Crear un nuevo registro de "Me gusta"
    const newLike = await like.create({
      usuarioId: userId,
      recetaId: receta.id,
    });

    res.status(201).json({ success: true, message: '¡Me gusta agregado!', data: newLike });
  } catch (error) {
    next(error);
  }
});


// Eliminar una receta existente
router.delete('/:id', async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { id } = req.params;
    const deleted = await Receta.destroy({
      where: { id: id }
    });
    if (deleted) {
      return res.status(200).json({ success: true, message: 'Receta eliminada exitosamente' });
    }
    throw new Error('Receta no encontrada');
  } catch (error) {
    next(error);
  }
});

// Agregar middleware de manejo de errores
router.use(errorHandler);

export default router;
