import { File } from "@babel/core";
import mongoose,{Schema} from "mongoose";

const productos=new Schema({
    nombre:String,
    precio:Number,
    cantidad:Number,
    descripcion:String,
    image:{
        filename:String,
        path:String
        },
    
    
    createdArt:{type:Date, default:Date.now}
});

const Producto=mongoose.model('productos',productos);
export default Producto;