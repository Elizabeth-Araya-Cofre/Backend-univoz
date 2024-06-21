import mongoose from "mongoose"

const TagSchema = new mongoose.Schema({
    id:{
        type: Number,
        require: true
    },
    texto:{
        type: String,
        require: true
    }

})

const PublicacionSchema = new mongoose.Schema({

    usuario:{
     type: mongoose.Schema.Types.ObjectId,
     ref: 'Usuario', // este usuario es el mismo del model de usuario esta publicacion va a referenciar al otro usuario por su id 
     require: true
   },
   titulo:{
    type:String,
    require:true
   },
   descripcion:{
    type:String,
    require:true
   },
   tags:{
    type: [TagSchema],
    require: true
   },

   createdAt:{
    type: Date,
    require: true
   },
 
})

export const Publicacion = mongoose.model('Publicacion', PublicacionSchema)
