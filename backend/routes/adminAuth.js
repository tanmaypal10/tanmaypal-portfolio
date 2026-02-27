import express from 'express';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import Joi from 'joi';
import { AdminUser } from '../models/AdminUser.js';

const router = express.Router();

const loginSchema = Joi.object({
  email: Joi.string().email().required(),
  password: Joi.string().min(6).required()
});

router.post('/login', async (req, res) => {
  try {
    const { error, value } = loginSchema.validate(req.body);
    if (error) {
      return res.status(400).json({
        success: false,
        message: error.details[0].message
      });
    }

    const admin = await AdminUser.findOne({ email: value.email.toLowerCase() });
    console.log('Looking for admin with email:', value.email.toLowerCase());
    console.log('Found admin:', admin ? admin.email : 'Not found');
    
    if (!admin) {
      return res.status(401).json({ success: false, message: 'Invalid credentials' });
    }

    const isMatch = await bcrypt.compare(value.password, admin.passwordHash);
    console.log('Password comparison result:', isMatch);
    
    if (!isMatch) {
      return res.status(401).json({ success: false, message: 'Invalid credentials' });
    }

    const payload = {
      id: admin._id,
      email: admin.email,
      name: admin.name,
      role: admin.role
    };

    const token = jwt.sign(payload, process.env.JWT_SECRET, { expiresIn: '1d' });

    admin.lastLoginAt = new Date();
    await admin.save();

    res.json({
      success: true,
      token,
      admin: {
        email: admin.email,
        name: admin.name
      }
    });
  } catch (err) {
    console.error('Admin login error:', err);
    res.status(500).json({ success: false, message: 'Failed to login' });
  }
});

export default router;
