import express from 'express';
import Payment from '../models/Payment.js';
import authMiddleware from '../middleware/authMiddleware.js';

const router = express.Router();

// Test Route
router.get("/test", (req, res) => {
  res.send("Post route is working!");
});

// Get all posts
router.get('/', async (req, res) => {
  try {
    const posts = await Payment.find();
    res.json(posts);
  } catch (err) {
    res.status(500).json({ message: 'Internal Server Error', error: err.message });
  }
});

// Create a new post with payment fields
router.post("/", authMiddleware, async (req, res) => {
  const {
    transactionId, 
    amount, 
    paymentMethod, 
    email, 
    paymentStatus = 'Pending', 
    paymentDate = Date.now()
  } = req.body;

  if (!transactionId || !amount || !paymentMethod || !email) {
    return res.status(400).json({ message: "Please fill in all required fields for payment" });
  }

  const newPost = new Payment({ 
    transactionId, 
    amount, 
    paymentMethod, 
    paymentStatus, 
    email, 
    paymentDate 
  });

  try {
    const savedPost = await newPost.save();
    res.status(201).json({ message: "Post uploaded successfully", savedPost });
  } catch (err) {
    res.status(500).json({ message: "Server error", error: err.message });
  }
});

export default router;

