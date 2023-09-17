import routerx from "express-promise-router";
import ProductoRouter from "./productos.routes";

const router=routerx();

router.use('/producto',ProductoRouter);

export default router;