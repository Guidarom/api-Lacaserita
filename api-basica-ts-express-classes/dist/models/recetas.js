"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const sequelize_1 = require("sequelize");
const config_1 = __importDefault(require("../database/config"));
class Receta extends sequelize_1.Model {
}
Receta.init({
    id: {
        type: sequelize_1.DataTypes.INTEGER.UNSIGNED,
        autoIncrement: true,
        primaryKey: true,
    },
    usuarioId: {
        type: sequelize_1.DataTypes.INTEGER.UNSIGNED,
        allowNull: false,
    },
    nombre: {
        type: sequelize_1.DataTypes.STRING(50),
        allowNull: false,
    },
    imagen: {
        type: sequelize_1.DataTypes.STRING(255),
        allowNull: false,
    },
    descripcion: {
        type: sequelize_1.DataTypes.STRING(255),
        allowNull: false,
    },
    tiempoPreparacion: {
        type: sequelize_1.DataTypes.INTEGER.UNSIGNED,
        allowNull: false,
    },
    ingredientes: {
        type: sequelize_1.DataTypes.TEXT,
        allowNull: false,
        get: function () {
            return JSON.parse(this.getDataValue('ingredientes'));
        },
        set: function (val) {
            this.setDataValue('ingredientes', JSON.stringify(val));
        }
    },
    pasos: {
        type: sequelize_1.DataTypes.TEXT,
        allowNull: false,
        get: function () {
            return JSON.parse(this.getDataValue('pasos'));
        },
        set: function (val) {
            this.setDataValue('pasos', JSON.stringify(val));
        }
    },
    porciones: {
        type: sequelize_1.DataTypes.INTEGER.UNSIGNED,
        allowNull: false,
    },
    tipoComida: {
        type: sequelize_1.DataTypes.STRING(50),
        allowNull: false,
    },
    estado: {
        type: sequelize_1.DataTypes.BOOLEAN,
        allowNull: false,
        defaultValue: true,
    },
}, {
    sequelize: config_1.default,
    modelName: 'Receta',
});
exports.default = Receta;
//# sourceMappingURL=recetas.js.map