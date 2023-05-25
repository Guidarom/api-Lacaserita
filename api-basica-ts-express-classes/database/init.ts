import db from './config';
import Receta from '../models/recetas';
import Favorita from '../models/favoritas';
import Like from '../models/like';
export async function initDatabase() {
  try {
    await db.authenticate();
    console.log('Conexión a la base de datos establecida.');

    // Sincronizar los modelos con la base de datos
    await Receta.sync();
    await Favorita.sync();
    await Like.sync();
   
    console.log('Base de datos y tablas creadas exitosamente.');
  } catch (error) {
    console.error('Error al conectar a la base de datos:', error);
  }
}
