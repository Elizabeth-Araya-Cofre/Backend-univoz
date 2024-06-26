import express from 'express';
import dotenv from 'dotenv';
import cors from 'cors';
import dbConnection  from './database/connection.js'
import UsuarioController from "./controller/UsuarioController.js";

dotenv.config();
const app = express();
app.use(cors())
app.use(express.json());


app.use('/usuario',UsuarioController)


app.listen(process.env.PORT, () => {
    console.log('Servidor corriendo en puerto ', process.env.PORT);
})

dbConnection;

