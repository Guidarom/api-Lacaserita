"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.validateUpdateReceta = exports.validateCreateReceta = void 0;
const express_validator_1 = require("express-validator");
exports.validateCreateReceta = [
    (0, express_validator_1.body)('nombre').notEmpty().withMessage('El nombre es obligatorio'),
    (0, express_validator_1.body)('imagen').notEmpty().withMessage('La imagen es obligatoria'),
    (0, express_validator_1.body)('descripcion').notEmpty().withMessage('La descripción es obligatoria'),
    (0, express_validator_1.body)('tiempoPreparacion').notEmpty().withMessage('El tiempo de preparación es obligatorio'),
    (0, express_validator_1.body)('ingredientes').isArray({ min: 1 }).withMessage('Debe proporcionar al menos un ingrediente'),
    (0, express_validator_1.body)('pasos').isArray({ min: 1 }).withMessage('Debe proporcionar al menos un paso'),
    (0, express_validator_1.body)('porciones').notEmpty().withMessage('El número de porciones es obligatorio'),
    (0, express_validator_1.body)('tipoComida').notEmpty().withMessage('El tipo de comida es obligatorio'),
];
exports.validateUpdateReceta = [
    (0, express_validator_1.param)('id').notEmpty().withMessage('El ID de receta es obligatorio'),
    (0, express_validator_1.body)('nombre').optional().notEmpty().withMessage('El nombre es obligatorio'),
    (0, express_validator_1.body)('imagen').optional().notEmpty().withMessage('La imagen es obligatoria'),
    (0, express_validator_1.body)('descripcion').optional().notEmpty().withMessage('La descripción es obligatoria'),
    (0, express_validator_1.body)('tiempoPreparacion').optional().notEmpty().withMessage('El tiempo de preparación es obligatorio'),
    (0, express_validator_1.body)('ingredientes').optional().isArray({ min: 1 }).withMessage('Debe proporcionar al menos un ingrediente'),
    (0, express_validator_1.body)('pasos').optional().isArray({ min: 1 }).withMessage('Debe proporcionar al menos un paso'),
    (0, express_validator_1.body)('porciones').optional().notEmpty().withMessage('El número de porciones es obligatorio'),
    (0, express_validator_1.body)('tipoComida').optional().notEmpty().withMessage('El tipo de comida es obligatorio'),
];
//# sourceMappingURL=recetaValidator.js.map