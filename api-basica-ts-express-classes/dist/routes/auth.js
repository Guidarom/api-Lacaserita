"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.router = void 0;
const express_1 = require("express");
const express_validator_1 = require("express-validator");
const auth_1 = require("../controllers/auth");
const validarCampos_1 = require("../middlewares/validarCampos");
exports.router = (0, express_1.Router)();
exports.router.post('/login', [
    (0, express_validator_1.check)('email', 'El email es obligatorio').isEmail(),
    (0, express_validator_1.check)('password', 'El password es obligatorio').not().isEmpty(),
    validarCampos_1.validarCampos
], auth_1.login);
exports.router.post('/google', [
    (0, express_validator_1.check)('id_token', 'Se requiere autenticación con google (id_token)').not().isEmpty(),
    validarCampos_1.validarCampos
], auth_1.googleSignIn);
//# sourceMappingURL=auth.js.map