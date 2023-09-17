
import Models from "../models";
import fs from "fs-extra";

export default {
  addProduct: async (req, res, next) => {
    try {
      const { nombre, precio, cantidad, descripcion } = req.body;

      const agregarProducto = new Models.Producto({
        nombre,
        precio,
        cantidad,
        descripcion
      });

      agregarProducto.image={ 
        filename:req.file.filename,
        path: 'public/images/'+req.file.filename
      }

      //agregarProducto.filename=req.file.filename;
      //agregarProducto.path='public/images/'+req.file.filename;

      const agregarP = await agregarProducto.save();
      res.status(200).json(agregarP);
      console.log(req.body);
    } catch (error) {
      res.status(500).send({
        message: "Ocurrio un error al guardar en la BD",
      });
      next(error);
    }
  },

  consultarProducto: async (req, res, next) => {
    try {
      const consultarProd = await Models.Producto.find();
      res.json(consultarProd);
    } catch (error) {
      res.status(500).send({
        message: "Ocurrio un error al consultar",
      });
      next(error);
    }
  },

  eliminarProducto: async (req, res, next) => {
    try {
      const eliminarPro = await Models.Producto.findByIdAndDelete(
        req.params.id
      );

      const delIma=eliminarPro.image.path;

      const fsRemove= await fs.unlink(delIma);
      res.status(200).json(fsRemove);
      console.log('Imagen eliminado',);
    } catch (error) {
      res.status(500).send({
        message: "Ocurrio un error al eliminar",
      });
      next(error);
    }
  },

  updateProducto: async (req, res, next) => {
    try {
        const updateDatos=req.body;
       const updat= await Models.Producto.findByIdAndUpdate(req.params.id,updateDatos);
       /*if(req.image.filename){
        await fs.unlink(req.image.path)
       }else{
        updat.image={
          filename:req.file.filename,
          path: 'public/images/'+req.file.filename
        }
       }*/

        res.json({
            message:"Datos modificados"
        })
    } catch (error) {
        res.status(500).send({
            message:"Error al actualizar"
        })
        next(error);
    }
  },

  consultarOneProduct:async(req,res,next)=>{
    try {
        const consultarOne=await Models.Producto.findById(req.params.id);
        if(!consultarOne){
            res.status(404).send({
                message:"No se encuentra el dato"
            })
        }else{
            res.status(200).json(consultarOne);
        }
    } catch (error) {
        res.status(500).send({
            message:"La consulta no pudo lograrse"
        })
    }
  }
};
