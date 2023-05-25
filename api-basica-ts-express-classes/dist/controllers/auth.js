"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
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
exports.googleSignIn = exports.login = void 0;
const usuario_1 = __importDefault(require("../models/usuario"));
const bcrypt = __importStar(require("bcrypt"));
const generarJWT_1 = require("../helpers/generarJWT");
const google_verify_1 = require("../helpers/google-verify");
const login = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { email, password } = req.body;
    try {
        //verificar si el email existe
        const usuario = yield usuario_1.default.findOne({ where: { email } });
        if (!usuario) {
            return res.status(400).json({
                msg: `El usuario con el email ${email} no existe`
            });
        }
        //verificar si el usuario esta activo
        const usuarioActivo = yield usuario_1.default.findOne({ where: { email, estado: true } });
        if (!usuarioActivo) {
            return res.status(400).json({
                msg: `Usuario o password incorrectos - estado: false`
            });
        }
        //verificar la contraseña
        const validPassword = bcrypt.compareSync(password, usuario.password);
        if (!validPassword) {
            return res.status(400).json({
                msg: `El usuario o la contraseña no son validos - password`
            });
        }
        //generar el JWT
        const token = yield (0, generarJWT_1.generarJWT)(usuario.id.toString());
        res.json({
            msg: 'login correcto',
            usuario,
            token
        });
    }
    catch (error) {
        console.log(error);
        res.status(500).json({
            msg: 'Hable con el administrador'
        });
    }
});
exports.login = login;
const googleSignIn = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id_token } = req.body;
    try {
        const { email, nombre } = yield (0, google_verify_1.GoogleVerify)(id_token);
        let usuario = yield usuario_1.default.findOne({ where: { email } });
        if (!usuario) {
            //si no existe, crear usuario
            const data = {
                id: 0,
                nombre,
                email,
                password: ':P',
                google: true,
                estado: true,
                rol: 'USER_ROLE'
            };
            usuario = yield usuario_1.default.create(data);
            //si el usuario en DB
            //if (!usuario.estado) {
            //      return res.status(401).json({
            //      msg: 'Hable con el administrador, usuario bloqueado'
            //      })
            //     }
            const token = yield (0, generarJWT_1.generarJWT)(usuario.id.toString());
            res.json({
                msg: 'google sign in',
                usuario,
                token
            });
        }
    }
    catch (error) {
        res.status(400).json({
            msg: 'Token de google no es válido o no se pudo verificar'
        });
    }
});
exports.googleSignIn = googleSignIn;
//# sourceMappingURL=auth.js.map