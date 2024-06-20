import express, { request, response } from "express";
import { Usuario } from "../models/UsuarioModel.js";
import { Publicacion } from "../models/PublicacionesModel.js";

const router =express.Router();

router.post('/crear-publicacion', async (request, response)=> {
    try{
        // if (!request.body.usuario || !request.body.titulo || !request.body.descripcion || !request.body.tags){
        //     return response.status(400).send({
        //         message: 'Todos los campos son obligatorios'
        //     })
        // }

        const usuario = await Usuario.findOne({
            usuario: "eli"

        })
        console.table(usuario)


        const nuevaPublicacion = {
            usuario: usuario._id,
            titulo: request.body.titulo,
            descripcion: request.body.descripcion,
            tags: request.body.tags
        }

        const publicacion = await Publicacion.create(nuevaPublicacion)
        return response.status(200).send(publicacion)

    }catch(error){
        console.log(error)
        return response.status(500).send('Error al crear publicación')
     }



}) 

router.get("/listar-publicaciones", async(request, response ) =>{
    try{
        const publicaciones = await Publicacion.find({}).populate("usuario", "usuario")
        return response.status(200).send(publicaciones)

    }catch(error){
        console.log(error)
        return response.status(500).send('Error al listar publicaciones')


    }
})

export default router;