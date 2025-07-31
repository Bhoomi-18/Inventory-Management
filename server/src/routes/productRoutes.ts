import { Router } from "express";
import { addProduct } from "../controllers/product/addProduct";
import { getProduct } from "../controllers/product/getProduct";
import { getLowStock } from "../controllers/product/getLowStock";
import { productByCat } from "../controllers/product/productByCat";
import { editProduct } from "../controllers/product/editProduct";
import { deleteProduct } from "../controllers/product/deleteProduct";

const router = Router();

router.post("/", addProduct);
router.get("/", getProduct);
router.get("/low-stock", getLowStock);
router.get("/category/:name", productByCat);
router.put("/:id", editProduct);
router.delete("/:id", deleteProduct);

export default router;