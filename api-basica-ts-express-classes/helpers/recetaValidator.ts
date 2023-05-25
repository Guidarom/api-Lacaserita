import { body,param, ValidationChain } from 'express-validator';


export const validateCreateReceta: ValidationChain[] = [
  body('nombre').notEmpty().withMessage('El nombre es obligatorio'),
  body('imagen').notEmpty().withMessage('La imagen es obligatoria'),
  body('descripcion').notEmpty().withMessage('La descripción es obligatoria'),
  body('tiempoPreparacion').notEmpty().withMessage('El tiempo de preparación es obligatorio'),
  body('ingredientes').isArray({ min: 1 }).withMessage('Debe proporcionar al menos un ingrediente'),
  body('pasos').isArray({ min: 1 }).withMessage('Debe proporcionar al menos un paso'),
  body('porciones').notEmpty().withMessage('El número de porciones es obligatorio'),
  body('tipoComida').notEmpty().withMessage('El tipo de comida es obligatorio'),
];


export const validateUpdateReceta: ValidationChain[] = [
  param('id').notEmpty().withMessage('El ID de receta es obligatorio'),
  body('nombre').optional().notEmpty().withMessage('El nombre es obligatorio'),
  body('imagen').optional().notEmpty().withMessage('La imagen es obligatoria'),
  body('descripcion').optional().notEmpty().withMessage('La descripción es obligatoria'),
  body('tiempoPreparacion').optional().notEmpty().withMessage('El tiempo de preparación es obligatorio'),
  body('ingredientes').optional().isArray({ min: 1 }).withMessage('Debe proporcionar al menos un ingrediente'),
  body('pasos').optional().isArray({ min: 1 }).withMessage('Debe proporcionar al menos un paso'),
  body('porciones').optional().notEmpty().withMessage('El número de porciones es obligatorio'),
  body('tipoComida').optional().notEmpty().withMessage('El tipo de comida es obligatorio'),
];
