import './config.js';  // Ensure this file correctly sets JWT_SECRET and other environment variables
import express from 'express';
import cors from 'cors';
import https from 'https';
import fs from 'fs';
import helmet from 'helmet';
import morgan from 'morgan';
import connectDB from './db/conn.js';  // Ensure this file is correctly located
import authRoutes from './Routes/auth.js';  // Ensure the path is correct
import postRoutes from './Routes/post.js';  // Ensure the path is correct

const app = express();
const PORT = process.env.PORT || 5008;

// Connect to the database
connectDB()
  .then(() => {
    console.log("Database connected successfully.");
  })
  .catch((err) => {
    console.error("Database connection error:", err);
    process.exit(1); // Exit the process if DB connection fails
  });

// SSL Certificate and Key Options
const options = {
  key: fs.readFileSync('keys/cert.key'),  // Ensure this path is correct
  cert: fs.readFileSync('keys/cert.pem'), // Ensure this path is correct
  secureProtocol: 'TLSv1_2_method',
};

// Middleware
app.use(cors());
app.use(express.json());  // This line is sufficient, remove the duplicate
app.use(helmet());
app.use(morgan('combined'));

// Basic Routes - Ensure '/api' is set up before other routes
app.get('/api', (req, res) => {
  res.send("Welcome to the API");  // Return a response here as well
});

// Define the routes after the '/api' route
app.use('/api/auth', authRoutes);   // Auth route
app.use('/api/posts', postRoutes);  // Post route

// Catch-all route for undefined paths
app.use('*', (req, res) => {
  res.status(404).send("Route not found!");
});

// HTTPS Server Creation - Uncomment and fix this for secure HTTPS connections
https.createServer(options, app).listen(PORT, () => {
  console.log(`Server is running securely on https://localhost:${PORT}`);
});

