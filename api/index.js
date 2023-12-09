import express from "express";
import mongoose from "mongoose";
import userRouter from './routes/user.route.js'
import authRouter from './routes/auth.route.js'
import 'dotenv/config.js'
import cors from 'cors'

console.log(process.env.MONGO)


const app = express();
app.use(express.json())
app.use(cors())


mongoose.connect(process.env.MONGO)
    .then(() => {
        console.log("Connected to MongoDB!!");
        console.log("Starting the server now.")
        app.listen(3000, (err) => {
            if (err) throw err;
            console.log("The server is running on port 3000")
        })

        app.use('/api/user', userRouter)
        app.use('/api/auth', authRouter)

        app.use((err, req, res, next) => {
            console.log("In the error handler middleware")
            const statusCode = err.statusCode || 500;
            const message = err.message || "Something went wrong";
            res.status(statusCode).json({
                success: false,
                message,
                statusCode
            });
        })
    })
    .catch((err) => { console.log("ERROR in MongoDB Connection", err) })



