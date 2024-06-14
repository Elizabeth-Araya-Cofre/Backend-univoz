import mongoose from "mongoose";
import dotenv from "dotenv"

dotenv.config()

const dbConnection = mongoose.connect(process.env.urlMongoDb)
.then(()=>{
    console.log('Conectado a MongoDB')
})
.catch((error)=>{
    console.log('Error al conectarse a MongoDb ',error)
})

export default dbConnection;