import 'dotenv/config';
import cors from 'cors';

const app = express();
const port = process.env.PORT || 4000;

const allowedOrigins = [
  "https://medicare-frontend-o4li.onrender.com", 
  "https://medicare-admin-4h22.onrender.com",
];

app.use(
  cors({
    origin: function (origin, callback) {
      if (!origin) return callback(null, true);

      if (allowedOrigins.includes(origin)) {
        return callback(null, true);
      }

      return callback(new Error("Not allowed by CORS"));
    },
    credentials: true, 
    methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
    allowedHeaders: ["Content-Type", "Authorization"],
  })
);

import express from 'express';
app.use(express.json());

import { connectDB } from "./config/db.js";

import { clerkMiddleware } from "@clerk/express";

import doctorRouter from './routes/doctorRouter.js';
import serviceRouter from './routes/serviceRouter.js';
import appointmentRouter from './routes/appointmentRouter.js';
import serviceAppointmentRouter from './routes/serviceAppointmentRouter.js';



app.use(express.urlencoded({ limit: "20mb", extended: true }));
app.use(clerkMiddleware());

app.use("/api/doctors", doctorRouter);
app.use("/api/services",serviceRouter);
app.use("/api/appointments",appointmentRouter);
app.use("/api/service-appointments",serviceAppointmentRouter);

app.get('/', (req, res) => {
    res.send('API Working ');
});

connectDB();



app.listen(port, () => {
    console.log(`Server Started on http://localhost:${port}`);
});
