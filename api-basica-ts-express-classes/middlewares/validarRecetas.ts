const { body } = require('express-validator');

// Reglas de validación para la creación de recetas
exports.createRecetaValidators = [
  body('nombre').notEmpty().withMessage('El nombre de la receta es requerido'),
  body('imagen').notEmpty().withMessage('La imagen de la receta es requerida'),
  body('descripcion').notEmpty().withMessage('La descripción de la receta es requerida'),
  body('tiempoPreparacion').isInt({ min: 1 }).withMessage('El tiempo de preparación debe ser un número entero positivo'),
  body('ingredientes').isArray({ min: 1 }).withMessage('Los ingredientes deben ser un arreglo con al menos un elemento'),
  body('pasos').isArray({ min: 1 }).withMessage('Los pasos deben ser un arreglo con al menos un elemento'),
  body('porciones').isInt({ min: 1 }).withMessage('El número de porciones debe ser un número entero positivo'),
  body('tipoComida').notEmpty().withMessage('El tipo de comida es requerido'),
];
