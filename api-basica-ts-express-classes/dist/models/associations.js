"use strict";
// associations.ts
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const usuario_1 = __importDefault(require("./usuario"));
const recetas_1 = __importDefault(require("./recetas"));
const favoritas_1 = __importDefault(require("./favoritas"));
const like_1 = __importDefault(require("./like"));
// Usuario - Receta - Favorita- Like
usuario_1.default.hasMany(recetas_1.default, { foreignKey: 'usuarioId' });
usuario_1.default.hasMany(favoritas_1.default, { foreignKey: 'usuarioId' });
usuario_1.default.belongsToMany(recetas_1.default, { through: favoritas_1.default, as: 'recetasFavoritas', foreignKey: 'usuarioId' });
recetas_1.default.belongsTo(usuario_1.default, { foreignKey: 'usuarioId' });
recetas_1.default.hasMany(favoritas_1.default, { foreignKey: 'recetaId' });
recetas_1.default.belongsToMany(usuario_1.default, { through: favoritas_1.default, as: 'usuarios', foreignKey: 'recetaId' });
favoritas_1.default.belongsTo(usuario_1.default, { foreignKey: 'usuarioId' });
favoritas_1.default.belongsTo(recetas_1.default, { foreignKey: 'recetaId' });
recetas_1.default.belongsToMany(usuario_1.default, {
    through: like_1.default,
    foreignKey: 'recetaId',
    as: 'usuariosQueGustan', // Esto te permitirá acceder a los usuarios que han dado "Me gusta" a una receta con `receta.usuariosQueGustan`
});
usuario_1.default.belongsToMany(recetas_1.default, {
    through: like_1.default,
    foreignKey: 'usuarioId',
    as: 'recetasGustadas', // Esto te permitirá acceder a las recetas que un usuario ha dado "Me gusta" con `usuario.recetasGustadas`
});
//# sourceMappingURL=associations.js.map