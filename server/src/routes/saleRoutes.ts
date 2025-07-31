import express from "express";
import { addSales } from "../controllers/sales/addSales";
import { getSales } from "../controllers/sales/getSales";
import { editSales } from "../controllers/sales/editSales";
import { deleteSales } from "../controllers/sales/deleteSales";

const router = express.Router();

router.post("/", addSales);
router.get("/", getSales);
router.put("/:id", editSales);
router.delete("/:id", deleteSales);

export default router;