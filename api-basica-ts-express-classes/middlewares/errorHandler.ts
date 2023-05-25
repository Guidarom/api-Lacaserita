import { Request, Response, NextFunction } from 'express';

const errorHandler = (err: any, req: Request, res: Response, next: NextFunction) => {
  console.error(err);

  // Verificar si el error es una instancia de ValidationError de express-validator
  if (err.name === 'ValidationError') {
    return res.status(400).json({ success: false, message: err.message });
  }

  // Otros tipos de errores
  res.status(500).json({ success: false, message: 'Error interno del servidor' });
};

export default errorHandler;
