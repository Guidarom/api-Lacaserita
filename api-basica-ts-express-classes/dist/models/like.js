"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const sequelize_1 = require("sequelize");
const config_1 = __importDefault(require("../database/config"));
const recetas_1 = __importDefault(require("./recetas"));
const usuario_1 = __importDefault(require("./usuario"));
class Like extends sequelize_1.Model {
}
Like.init({
    id: {
        type: sequelize_1.DataTypes.INTEGER.UNSIGNED,
        autoIncrement: true,
        primaryKey: true,
    },
    usuarioId: {
        type: sequelize_1.DataTypes.INTEGER.UNSIGNED,
        allowNull: false,
        references: {
            model: usuario_1.default,
            key: 'id',
        },
    },
    recetaId: {
        type: sequelize_1.DataTypes.INTEGER.UNSIGNED,
        allowNull: false,
        references: {
            model: recetas_1.default,
            key: 'id',
        },
    },
}, {
    sequelize: config_1.default,
    modelName: 'Like',
});
exports.default = Like;
//# sourceMappingURL=like.js.map