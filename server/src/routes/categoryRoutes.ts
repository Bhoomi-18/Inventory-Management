import express from "express";
import { authenticate, requireTenant } from "../middleware/auth";
import { addCategory } from "../controllers/categories/addCategory";
import { getCategory } from "../controllers/categories/getCategory";
import { deleteCategory } from "../controllers/categories/deleteCategory";
import { updateCategory } from "../controllers/categories/updateCategory";

const router = express.Router();

router.use(authenticate, requireTenant);

router.get("/", getCategory);
router.post("/", addCategory);
router.delete("/:name", deleteCategory);
router.put("/:name", updateCategory);

export default router;