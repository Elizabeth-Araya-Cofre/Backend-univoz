import express from "express";
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

       const nuevoUsuario = {
           usuario:request.body.usuario,
           email:request.body.email,
           password:request.body.password
       }

       const usuario = await Usuario.create(nuevoUsuario);
       return response.status(200).send(usuario);
    }catch(error){
        console.log('Error al registrar un usuario ',error)
        return response.status(400).send({
            message:'Error al registrar un usuario'
        })
    }
    return response.status(200).send('registrado')
})

export default router;