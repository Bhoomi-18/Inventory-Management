import express from "express";
import { authenticate, requireTenant } from "../middleware/auth";
import { addSales } from "../controllers/sales/addSales";
import { getSales } from "../controllers/sales/getSales";
import { editSales } from "../controllers/sales/editSales";
import { deleteSales } from "../controllers/sales/deleteSales";

const router = express.Router();

router.use(authenticate, requireTenant);

router.post("/", addSales);
router.get("/", getSales);
router.put("/:id", editSales);
router.delete("/:id", deleteSales);

export default router;