import routerx from "express-promise-router";
import productosController from "../controllers/productos.controller";

const router=routerx();

//rutas para el controlador producto
router.post('/guardarProducto',productosController.addProduct);
router.get("/consultarProducto",productosController.consultarProducto);
router.delete("/eliminarProducto/:id",productosController.eliminarProducto);
router.patch("/updateProducto/:id",productosController.updateProducto);
router.get("/oneProducto/:id",productosController.consultarOneProduct);

export default router;