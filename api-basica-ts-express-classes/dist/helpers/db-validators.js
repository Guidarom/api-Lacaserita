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
exports.idValidator = exports.emailValidator = void 0;
const usuario_1 = __importDefault(require("../models/usuario"));
const emailValidator = (email = '') => __awaiter(void 0, void 0, void 0, function* () {
    const existeEmail = yield usuario_1.default.findOne({
        where: {
            email: email
        }
    });
    if (existeEmail) {
        throw new Error(`Ya existe un usuario con el email: ${email}`);
    }
});
exports.emailValidator = emailValidator;
const idValidator = (id = '') => __awaiter(void 0, void 0, void 0, function* () {
    const existeId = yield usuario_1.default.findByPk(id);
    if (!existeId) {
        throw new Error(`No existe un usuario con el id: ${id}`);
    }
});
exports.idValidator = idValidator;
//# sourceMappingURL=db-validators.js.map