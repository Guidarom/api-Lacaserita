"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const sequelize_1 = require("sequelize");
const db = new sequelize_1.Sequelize('railway', 'root', '8RhUHoMS39nq93A40iH1', {
    host: 'containers-us-west-9.railway.app' || 'localhost:8000',
    dialect: 'mysql',
    port: parseInt('7366' || '3306')
});
exports.default = db;
/* export const dbConnection = async () => {

    try {
      const mongoUri = process.env.MONGODB_CNN;
      await mongoose.connect(process.env.MONGODB_CNN, {
        useNewUrlParser: true,
        useUnifiedTopology: true,
      })
      
    } catch (error) {
        console.log(error)
        throw new Error ('Error al iniciar la base de datos')
    }
}
  */
/*

export const dbConnection = async (): Promise<void> => {
  
  try {
    
    const mongoDB_CNN = process.env.MONGODB_CNN;
    if (!mongoDB_CNN) {
      throw new Error('La variable de entorno MONGODB_CNN no está definida');
    }

    await mongoose.connect(mongoDB_CNN, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
      
    console.log('Base de datos Online');
  } catch (error) {
    console.log(error);
    throw new Error('Error al iniciar la base de datos');
  }
};
  */
/*
export const dbConnection = async (): Promise<void> => {
    
    try {
      
      const mongoDB_CNN = process.env.MONGODB_CNN;
      if (!mongoDB_CNN) {
        throw new Error('La variable de entorno MONGODB_CNN no está definida');
      }
  
      await mongoose.createConnection(mongoDB_CNN);
        
      console.log('Base de datos Online');
    } catch (error) {
      console.log(error);
      throw new Error('Error al iniciar la base de datos');
    }
  }; */ 
//# sourceMappingURL=config.js.map