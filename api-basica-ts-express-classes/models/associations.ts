// associations.ts

import Usuario from './usuario';
import Receta from './recetas';
import Favorita from './favoritas';
import Like from './like';

// Usuario - Receta - Favorita- Like
Usuario.hasMany(Receta, { foreignKey: 'usuarioId' });
Usuario.hasMany(Favorita, { foreignKey: 'usuarioId' });
Usuario.belongsToMany(Receta, { through: Favorita, as: 'recetasFavoritas', foreignKey: 'usuarioId' });

Receta.belongsTo(Usuario, { foreignKey: 'usuarioId' });
Receta.hasMany(Favorita, { foreignKey: 'recetaId' });
Receta.belongsToMany(Usuario, { through: Favorita, as: 'usuarios', foreignKey: 'recetaId' });

Favorita.belongsTo(Usuario, { foreignKey: 'usuarioId' });
Favorita.belongsTo(Receta, { foreignKey: 'recetaId' });

Receta.belongsToMany(Usuario, {
    through: Like,
    foreignKey: 'recetaId',
    as: 'usuariosQueGustan', // Esto te permitirá acceder a los usuarios que han dado "Me gusta" a una receta con `receta.usuariosQueGustan`
  });
  
  Usuario.belongsToMany(Receta, {
    through: Like,
    foreignKey: 'usuarioId',
    as: 'recetasGustadas', // Esto te permitirá acceder a las recetas que un usuario ha dado "Me gusta" con `usuario.recetasGustadas`
  });
  