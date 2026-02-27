import mongoose from 'mongoose';
import dotenv from 'dotenv';
import bcrypt from 'bcryptjs';
import { AdminUser } from '../models/AdminUser.js';

dotenv.config();

const MONGODB_URI = process.env.MONGODB_URI || 'mongodb://localhost:27017/portfolio';

const ADMIN_EMAIL = 'tanmaypal626@gmail.com';
const ADMIN_PASSWORD = 'Tanmay@12345';
const ADMIN_NAME = 'Tanmay Pal';

async function ensureAdmin() {
  try {
    await mongoose.connect(MONGODB_URI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });

    const passwordHash = await bcrypt.hash(ADMIN_PASSWORD, 12);

    const admin = await AdminUser.findOneAndUpdate(
      { email: ADMIN_EMAIL },
      {
        name: ADMIN_NAME,
        email: ADMIN_EMAIL,
        passwordHash,
      },
      { upsert: true, new: true, setDefaultsOnInsert: true }
    );

    console.log('✅ Admin user ready:', admin.email);
  } catch (error) {
    console.error('❌ Failed to create admin user:', error);
  } finally {
    await mongoose.disconnect();
    process.exit(0);
  }
}

ensureAdmin();
