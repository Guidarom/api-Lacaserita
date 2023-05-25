import dotenv from "dotenv"
import Server from "./models/server"
//import 'models/associations.ts';

dotenv.config()




const server = new Server()

server.listen ()

