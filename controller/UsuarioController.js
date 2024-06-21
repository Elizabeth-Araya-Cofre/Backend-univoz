import express, { response } from "express";
import bcrypt from "bcrypt";
import {Usuario} from '../models/UsuarioModel.js'


const router = express.Router();

router.post('/registrar-usuario',async (request,response)=>{
    try{
        if (!request.body.usuario || !request.body.email || !request.body.password) {
            return response.status(400).send({
                message:'Todos los campos son obligatorios!',
            })
        }

       const usuarioExistente = await Usuario.findOne({
           $or:[
               {usuario:request.body.usuario},
               {email:request.body.email}
           ]
       });

       if(usuarioExistente){
           return response.status(400).send({
               message:'El usuario o email ya existe',
           })
       }

       const hashedPassword = await bcrypt.hashSync(request.body.password, 10);

        const nuevoUsuario = {
            usuario: request.body.usuario,
            email: request.body.email,
            password: hashedPassword
        };

       const usuario = await Usuario.create(nuevoUsuario);
       return response.status(200).send('registro exitoso!');
    }catch(error){
        console.log('Error al registrar un usuario ',error)
        return response.status(400).send({
            message:'Error al registrar un usuario'
        })
    }

})

router.post('/iniciar-sesion', async (request, response) => {
    try {
        const { usuario, password } = request.body;

        if (!usuario || !password) {
            return response.status(400).send({
                message: 'Todos los campos son obligatorios!',
            });
        }

        const usuarios = await Usuario.findOne({ usuario: usuario });

        if (!usuarios) {
            return response.status(400).send({
                message: 'Usuario o contraseña incorrectos!',
            });
        }

        const isPasswordValid = bcrypt.compareSync(request.body.password, usuarios.password);
           console.log (isPasswordValid)
        if (!isPasswordValid) {
            return response.status(400).send({
                message: 'Usuario o contraseña incorrecta!',
            });
        }

        return response.status(200).send({
            message: 'Inicio de sesión exitoso',
            usuarios: {
                usuario: request.body.usuario,
                password: isPasswordValid
            }
        });

    } catch (error) {
        console.log('Error al iniciar sesión ', error);
        return response.status(500).send({
            message: 'Error al iniciar sesión'
        });
    }
});

export default router;