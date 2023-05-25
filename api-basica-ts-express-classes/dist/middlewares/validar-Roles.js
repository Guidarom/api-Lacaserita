"use strict";
//middlewares/validar-roles.ts
Object.defineProperty(exports, "__esModule", { value: true });
exports.esAdminRole = void 0;
const esAdminRole = (req, res, next) => {
    if (!req.usuario) {
        return res.status(500).json({
            msg: 'Se quiere verificar el role sin validar el token primero'
        });
    }
    const { rol, nombre } = req.usuario;
    if (rol !== 'ADMIN_ROLE') {
        return res.status(401).json({
            msg: `${nombre} no es administrador - No puede hacer esto`
        });
    }
    next();
};
exports.esAdminRole = esAdminRole;
//# sourceMappingURL=validar-Roles.js.map