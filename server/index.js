import express from 'express';
import mongoose from 'mongoose';
import authRoutes from './Routes/auth.js';  // Import auth routes
import dotenv from 'dotenv'; // For environment variables
import cors from 'cors';
import path from 'path';
import { exec } from 'child_process';
import { fileURLToPath } from 'url';

dotenv.config(); // Load environment variables

const app = express();

// Middleware to parse JSON
app.use(express.json());

//cors
app.use(cors({
  origin: 'http://localhost:3000', // Allow requests from this origin
  credentials: true // Allow cookies and authorization headers
}));

// Connect to MongoDB without deprecated options
mongoose.connect(process.env.MONGO_URI)
  .then(() => console.log('MongoDB connected'))
  .catch((err) => console.log('MongoDB connection error:', err));

// Use the auth routes
app.use('/api/auth', authRoutes);

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

app.get('/run-script', (req, res) => {
    const scriptPath = path.join(__dirname, 'scripts', 'your_script.py'); // Update with your actual script path

    exec(`python ${scriptPath}`, (error, stdout, stderr) => {
        if (error) {
            console.error(`exec error: ${error}`);
            return res.status(500).json({ error: stderr || 'An error occurred while executing the script.' });
        }
        res.json({ output: stdout });
    });
});


// Start the server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
