import 'dotenv/config';
import cors from 'cors';

const app = express();
const port = process.env.PORT || 4000;

import express from 'express';
app.use(express.json());

import { connectDB } from "./config/db.js";

import { clerkMiddleware } from "@clerk/express";

import doctorRouter from './routes/doctorRouter.js';



app.use(express.urlencoded({ limit: "20mb", extended: true }));

app.use("/api/doctors", doctorRouter);

app.get('/', (req, res) => {
    res.send('API Working ');
});

connectDB();



app.listen(port, () => {
    console.log(`Server Started on http://localhost:${port}`);
});
