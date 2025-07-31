import express from "express";
import { addCategory } from "../controllers/categories/addCategory";
import { getCategory } from "../controllers/categories/getCategory"; 

const router = express.Router();

router.get("/", getCategory );
router.post("/", addCategory );

export default router;