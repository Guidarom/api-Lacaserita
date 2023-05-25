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
exports.initDatabase = void 0;
const config_1 = __importDefault(require("./config"));
const recetas_1 = __importDefault(require("../models/recetas"));
const favoritas_1 = __importDefault(require("../models/favoritas"));
const like_1 = __importDefault(require("../models/like"));
function initDatabase() {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            yield config_1.default.authenticate();
            console.log('Conexión a la base de datos establecida.');
            // Sincronizar los modelos con la base de datos
            yield recetas_1.default.sync();
            yield favoritas_1.default.sync();
            yield like_1.default.sync();
            console.log('Base de datos y tablas creadas exitosamente.');
        }
        catch (error) {
            console.error('Error al conectar a la base de datos:', error);
        }
    });
}
exports.initDatabase = initDatabase;
//# sourceMappingURL=init.js.map