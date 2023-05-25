"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const recetas_1 = __importDefault(require("../models/recetas"));
const recetaValidator_1 = require("../helpers/recetaValidator");
const like_1 = __importDefault(require("../models/like"));
const router = express_1.default.Router();
// Manejo de errores
const errorHandler = (error, req, res, next) => {
    console.error(error);
    res.status(500).json({ success: false, error: 'Error interno del servidor' });
};
// Obtener todas las recetas
router.get('/', (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const recetas = yield recetas_1.default.findAll();
        res.status(200).json({ success: true, data: recetas });
    }
    catch (error) {
        next(error);
    }
}));
// Obtener una receta específica
router.get('/:id', (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { id } = req.params;
        const receta = yield recetas_1.default.findByPk(id);
        if (!receta) {
            return res.status(404).json({ success: false, error: 'Receta no encontrada' });
        }
        res.status(200).json({ success: true, data: receta });
    }
    catch (error) {
        next(error);
    }
}));
// Crear una nueva receta
router.post('/', recetaValidator_1.validateCreateReceta, (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const receta = yield recetas_1.default.create(req.body);
        res.status(201).json({ success: true, data: receta });
    }
    catch (error) {
        next(error);
    }
}));
// Actualizar una receta existente
router.put('/:id', recetaValidator_1.validateUpdateReceta, (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { id } = req.params;
        const [updated] = yield recetas_1.default.update(req.body, {
            where: { id: id }
        });
        if (updated) {
            const updatedReceta = yield recetas_1.default.findByPk(id);
            return res.status(200).json({ success: true, data: updatedReceta });
        }
        throw new Error('Receta no encontrada');
    }
    catch (error) {
        next(error);
    }
}));
// Dar "Me gusta" a una receta específica
router.post('/:id/like', (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { id } = req.params;
        const receta = yield recetas_1.default.findByPk(id);
        if (!receta) {
            return res.status(404).json({ success: false, error: 'Receta no encontrada' });
        }
        // Verificar si el usuario ya ha dado "Me gusta" a la receta
        const userId = 123; // ID del usuario actualmente autenticado (debes obtenerlo de la autenticación)
        const existingLike = yield like_1.default.findOne({
            where: { usuarioId: userId, recetaId: receta.id },
        });
        if (existingLike) {
            return res.status(400).json({ success: false, error: 'Ya has dado "Me gusta" a esta receta' });
        }
        // Crear un nuevo registro de "Me gusta"
        const newLike = yield like_1.default.create({
            usuarioId: userId,
            recetaId: receta.id,
        });
        res.status(201).json({ success: true, message: '¡Me gusta agregado!', data: newLike });
    }
    catch (error) {
        next(error);
    }
}));
// Eliminar una receta existente
router.delete('/:id', (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { id } = req.params;
        const deleted = yield recetas_1.default.destroy({
            where: { id: id }
        });
        if (deleted) {
            return res.status(200).json({ success: true, message: 'Receta eliminada exitosamente' });
        }
        throw new Error('Receta no encontrada');
    }
    catch (error) {
        next(error);
    }
}));
// Agregar middleware de manejo de errores
router.use(errorHandler);
exports.default = router;
//# sourceMappingURL=recetas.js.map