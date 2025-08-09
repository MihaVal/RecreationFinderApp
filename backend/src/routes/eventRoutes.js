import { Router } from "express";
import { listEvents, createEvent } from "../controllers/eventController.js";
import { auth } from "../middleware/auth.js";

const router = Router();
router.get("/", listEvents);
router.post("/", auth, createEvent);
export default router;
