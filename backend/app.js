import dotenv from 'dotenv';
dotenv.config();

import express from 'express';
import { createUser, enforceAuth, login } from './auth.js';

const app = express();
app.use(express.json());

app.use((req, res, next) => {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Methods', 'POST, OPTIONS');
    res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization');
    next();
});

// Signup route
app.post('/signup', async (req, res) => {
    try{
        const { email, password } = req.body;
        if (!email || !email.includes('@') ||!password || password.trim().length < 7) {
            return res.status(400).json({ message: 'Email and password (min 7 chars) required.' });
        }

        const token = createUser(email, password);

        res.status(201).json({ message: 'User created.' , token});

    } catch (error) {
        res.status(500).json({ message: 'Creating user failed - '. concat(error) });
    }
});

app.post('/login', async (req, res) => {
    try {
        const { email, password } = req.body;
        const token = login(email, password);

        res.status(200).json({ message: 'Login successful.', token });
    }catch (error) {
        res.status(401).json({ message: 'Login failed - '.concat(error) });
    }
});

app.post('gerenate-image', enforceAuth, async (req, res) => {
    try {
        const { prompt, options } = req.body;
        if (!prompt || prompt.trim().length < 5) {
            return res.status(400).json({ message: 'Prompt (min 5 chars) required.' });
        }   

        const {image , format} = await generateImage(prompt, options)

        res.type(format);
        res.status(200).send(image);
    } catch (error) {
        res.status(500).json({ message: 'Image generation failed - '.concat(error) });
    }
});

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => console.log('Server running on port 3000'));
