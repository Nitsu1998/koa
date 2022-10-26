import Router from "koa-router";
import productsController from "../controllers/products.controller.js";

const router = new Router({
  prefix: "/products",
});

router.get("/", productsController.getProducts);

router.get("/:id", productsController.getProduct);

router.post("/", productsController.createProduct);

router.put("/:id", productsController.updateProduct);

router.delete("/:id", productsController.deleteProduct);

export default router;
