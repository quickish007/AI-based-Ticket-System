import express from 'express';
import mongoose from 'mongoose';
import cors from 'cors';
import  { } from '../routes/user.js';
import userRoutes from './AI Ticket Assistant/routes/user.js';



const port = process.env.PORT || 3000;
const app = express();

app.use(cors());
app.use(express.json());

app.use("/api/auth", userRoutes);

mongoose
    .connect(process.env.MONGO_URL)
    .then(() => {console.log("Connected to MongoDB 🥳")
        app.listen(port, ()=> console.log("🚀 Server is running on port 3000"))
    })
    .catch((err) => console.error("❌ MongoDB connection error:", err)); 