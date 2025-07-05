import dotenv from 'dotenv';
dotenv.config();

import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import db from './db.js';

const secretkey = process.env.JWT_SECRET;

export function createUser(email,password){
    const user = db.prepare('Select * from users where email = ?').get(email);

    if (user) {
        throw new Error('User already exists');
    }

    const hashedPassword = bcrypt.hashSync(password, 12);

    const res = db.prepare('INSERT INTO users (email, password) VALUES (?, ?)')
      .run(email, hashedPassword);

    if (res.changes === 0){
        throw new Error('Failed to create user');   
    }

    const token = jwt.sign({ id: res.lastInsertRowid }, secretkey, { 
        expiresIn: '1h'
    });
    
    return token;
}

export function login(email,password){
    const user = db.prepare('SELECT * FROM users WHERE email = ?').get(email);
    
    if (!user) {
        throw new Error('User not found');
    }

    const isValidPassword = bcrypt.compareSync(password, user.password);

    if (!isValidPassword) {
        throw new Error('Invalid password');
    }

    const token = jwt.sign({ id: user.id }, secretkey, { 
        expiresIn: '1h'
    });

    return token;
}

export function enforceAuth(req, res, next) {
    const token = req.headers.authorization?.split(' ')[1];

    if (!token) {
        return res.status(401).json({ message: 'Authentication required' });
    }

    try {
        const decoded = jwt.verify(token, secretkey);
        req.userId = decoded.id;
        next();
    } catch (error) {
        return res.status(401).json({ message: 'Unauthorized' });
    }
}