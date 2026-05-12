import express from "express";
import { createSaleDeed,  } from "../Controller/Saledeed.js";

const router = express.Router();

router.post("/create",createSaleDeed);
// router.post("/createDocx",createSaleDeedDocx);
// router.get("/:id", getSaleDeedById);
// router.delete("/:id", deleteSaleDeed);

export default router;