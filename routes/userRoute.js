
const { createClient } = require('@supabase/supabase-js');
require('dotenv').config();

const supabase = createClient(process.env.SUPABASE_URL, process.env.SUPABASE_KEY);


const express = require('express');
const router = express.Router();

const User = require('../models/User'); // Mongoose model for users

// User Registration
router.post('/register', async (req, res) => {
    const { email, password } = req.body;

    // Register with Supabase
    const { data, error } = await supabase.auth.signUp({ email, password });

    if (error) return res.status(400).json({ error: error.message });

    // Store user information in MongoDB
    const newUser = new User({
        email: data.user.email,
        supabase_id: data.user.id,
    });

    await newUser.save();

    res.status(201).json({ message: 'User registered successfully!' });
});

// User Login
router.post('/login', async (req, res) => {
    const { email, password } = req.body;

    // Login with Supabase
    const { data, error } = await supabase.auth.signInWithPassword({ email, password });

    if (error) return res.status(400).json({ error: error.message });

    // Create a session in MongoDB
    const user = await User.findOne({ supabase_id: data.user.id });
    if (!user) return res.status(404).json({ error: 'User not found' });

    // Store session details
    // (You might want to use a separate session model)
    user.sessions.push({ loginTime: new Date(), ipAddress: req.ip });
    await user.save();

    res.status(200).json({ message: 'Login successful!', user: data.user });
});

module.exports = router;
