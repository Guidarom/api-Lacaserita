
import Usuario  from "../models/usuario";



export const emailValidator = async (email = '') => {
  const existeEmail = await Usuario.findOne({
    where: {
      email: email
    }
  });

  if (existeEmail) {
    throw new Error(`Ya existe un usuario con el email: ${email}`);
  }
}

export const idValidator = async (id = '') => {
  const existeId = await Usuario.findByPk(id);

  if (!existeId) {
    throw new Error(`No existe un usuario con el id: ${id}`);
  }
}