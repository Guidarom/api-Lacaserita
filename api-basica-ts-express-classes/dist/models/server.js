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
const usuario_1 = __importDefault(require("../routes/usuario"));
const recetas_1 = __importDefault(require("../routes/recetas"));
const cors_1 = __importDefault(require("cors"));
const config_1 = __importDefault(require("../database/config"));
const auth_1 = require("../routes/auth");
const init_1 = require("../database/init");
class Server {
    constructor() {
        this.apiPaths = {
            auth: '/api/auth',
            usuarios: '/api/usuarios',
            recetas: '/api/recetas',
        };
        this.app = (0, express_1.default)();
        this.port = process.env.PORT || '8000';
        this.dbConnection();
        this.middlewares();
        this.routes();
        this.initDatabase();
    }
    dbConnection() {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                yield config_1.default.authenticate();
                console.log('Conexión a la base de datos establecida.');
            }
            catch (error) {
                console.error('Error al conectar a la base de datos:', error);
                throw new Error('Error al iniciar la base de datos');
            }
        });
    }
    middlewares() {
        // CORS
        this.app.use((0, cors_1.default)());
        // Parseo/Lectura del Body
        this.app.use(express_1.default.json());
        // Carpeta pública
        this.app.use(express_1.default.static('public'));
    }
    routes() {
        this.app.use(this.apiPaths.auth, auth_1.router);
        this.app.use(this.apiPaths.usuarios, usuario_1.default);
        this.app.use(this.apiPaths.recetas, recetas_1.default);
    }
    initDatabase() {
        return __awaiter(this, void 0, void 0, function* () {
            yield (0, init_1.initDatabase)();
        });
    }
    listen() {
        this.app.listen(parseInt(this.port), '0.0.0.0', () => {
            console.log(`Servidor corriendo en el Puerto ${this.port}`);
        });
    }
}
exports.default = Server;
//# sourceMappingURL=server.js.map