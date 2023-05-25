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
exports.marcarFavorita = exports.borrarReceta = exports.actualizarReceta = exports.crearReceta = exports.getReceta = exports.getRecetas = void 0;
const recetas_1 = __importDefault(require("../models/recetas"));
const favoritas_1 = __importDefault(require("../models/favoritas"));
const getRecetas = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const recetas = yield recetas_1.default.findAll();
        res.json(recetas);
    }
    catch (error) {
        console.log(error);
        res.status(500).json({ msg: 'Hubo un error al obtener las recetas' });
    }
});
exports.getRecetas = getRecetas;
const getReceta = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = req.params;
    try {
        const receta = yield recetas_1.default.findByPk(id);
        if (receta) {
            res.json(receta);
        }
        else {
            res.status(404).json({ msg: `No existe una receta con el id ${id}` });
        }
    }
    catch (error) {
        console.log(error);
        res.status(500).json({ msg: 'Hubo un error al obtener la receta' });
    }
});
exports.getReceta = getReceta;
const crearReceta = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { body } = req;
    try {
        const receta = yield recetas_1.default.create(body);
        res.json(receta);
    }
    catch (error) {
        console.log(error);
        res.status(500).json({ msg: 'Hubo un error al crear la receta' });
    }
});
exports.crearReceta = crearReceta;
const actualizarReceta = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = req.params;
    const { body } = req;
    try {
        const receta = yield recetas_1.default.findByPk(id);
        if (!receta) {
            return res
                .status(404)
                .json({ msg: `No existe una receta con el id ${id}` });
        }
        yield receta.update(body);
        res.json(receta);
    }
    catch (error) {
        console.log(error);
        res.status(500).json({ msg: 'Hubo un error al actualizar la receta' });
    }
});
exports.actualizarReceta = actualizarReceta;
const borrarReceta = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = req.params;
    try {
        const receta = yield recetas_1.default.findByPk(id);
        if (!receta) {
            return res
                .status(404)
                .json({ msg: `No existe una receta con el id ${id}` });
        }
        yield receta.destroy();
        res.json({ msg: `Receta con id ${id} eliminada correctamente` });
    }
    catch (error) {
        console.log(error);
        res.status(500).json({ msg: 'Hubo un error al eliminar la receta' });
    }
});
exports.borrarReceta = borrarReceta;
const marcarFavorita = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { usuarioId, recetaId } = req.params;
    try {
        const favorita = yield favoritas_1.default.create({
            id: 0,
            recetaId: parseInt(recetaId),
            usuarioId: parseInt(usuarioId),
        });
        res.json(favorita);
    }
    catch (error) {
        console.log(error);
        res.status(500).json({ msg: 'Hubo un error al marcar la receta como favorita' });
    }
});
exports.marcarFavorita = marcarFavorita;
//# sourceMappingURL=recetas.js.map