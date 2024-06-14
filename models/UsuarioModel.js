import mongoose from "mongoose";

const UsuarioSchema = new mongoose.Schema({
    usuario:{
        type:String,
        unique:true
    },
    email:{
        type:String,
        unique:true
    },
    password:{
        type:String,
        unique:false
    }
})

export const Usuario = mongoose.model('Usuario',UsuarioSchema)