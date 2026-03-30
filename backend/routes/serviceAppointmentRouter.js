
import express from "express";
import { clerkMiddleware, requireAuth } from "@clerk/express";

import {
  getServiceAppointments,
  getServiceAppointmentById,
  createServiceAppointment,
  
  updateServiceAppointment,
  cancelServiceAppointment,
  getServiceAppointmentStats,
  getServiceAppointmentsByPatient,
} from "../controllers/serviceAppointmentController.js";

const router = express.Router();


router.get("/", getServiceAppointments);

router.get("/stats/summary", getServiceAppointmentStats);

router.post("/", clerkMiddleware(), requireAuth(), createServiceAppointment);


router.get(
  "/me",
  clerkMiddleware(),
  requireAuth(),
  getServiceAppointmentsByPatient
);

router.get("/:id", getServiceAppointmentById);
router.put("/:id", updateServiceAppointment);
router.post("/:id/cancel", cancelServiceAppointment);

export default serviceAppointmentRouter;
