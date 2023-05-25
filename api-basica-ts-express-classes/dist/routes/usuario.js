"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const express_validator_1 = require("express-validator");
const validarCampos_1 = require("../middlewares/validarCampos");
const db_validators_1 = require("../helpers/db-validators");
const validar_JWT_1 = require("../middlewares/validar-JWT");
const validar_Roles_1 = require("../middlewares/validar-Roles");
const usuarios_1 = require("../controllers/usuarios");
const router = (0, express_1.Router)();
router.get('/', usuarios_1.getUsuarios);
router.get('/:id', usuarios_1.getUsuario);
router.post('/', [
    (0, express_validator_1.check)('nombre', 'El nombre no puede estar vacío').not().isEmpty(),
    (0, express_validator_1.check)('password', 'El password debe tener al menos 6 caracteres').isLength({ min: 6 }),
    (0, express_validator_1.check)('email', 'El email introducido no es válido').isEmail(),
    (0, express_validator_1.check)('email').custom(db_validators_1.emailValidator),
    (req, res, next) => {
        if (!req.body.rol) {
            req.body.rol = 'USER_ROLE';
        }
        next();
    },
    (0, express_validator_1.check)('rol', 'El rol introducido no es válido').isIn(['ADMIN_ROLE', 'USER_ROLE']),
    validarCampos_1.validarCampos
], usuarios_1.postUsuario);
router.put('/:id', [
    (0, express_validator_1.check)('id').custom(db_validators_1.idValidator),
    validarCampos_1.validarCampos
], usuarios_1.putUsuario);
router.delete('/:id', [
    validar_JWT_1.validarJWT,
    validar_Roles_1.esAdminRole,
    (0, express_validator_1.check)('id').custom(db_validators_1.idValidator),
    validarCampos_1.validarCampos
], usuarios_1.deleteUsuario);
exports.default = router;
//# sourceMappingURL=usuario.js.map