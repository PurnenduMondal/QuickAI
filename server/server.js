import express from 'express';
import cors from 'cors';
import 'dotenv/config'
import { clerkMiddleware, requireAuth } from '@clerk/express'
import aiRouter from './routes/aiRoutes.js';
import connectCloudinary from './configs/cloudinary.js';
import path from 'path';
import { fileURLToPath } from 'url';
import userRouter from './routes/userRoutes.js';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const app = express();

await connectCloudinary()

app.use(cors())
app.use(express.json())
app.use(express.static(path.join(__dirname, 'uploads')))
app.use(clerkMiddleware())

app.get('/', (req, res) => res.send('Server is Live'))

app.use(requireAuth())

app.use('/api/ai', aiRouter)
app.use('/api/user', userRouter)

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
    console.log("Server is running on Port", PORT);
})