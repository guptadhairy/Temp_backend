import express from "express";
import { newsLetter } from "../controllers/news.js";

const router = express.Router();

router.post("/newsletter",newsLetter);
export default router