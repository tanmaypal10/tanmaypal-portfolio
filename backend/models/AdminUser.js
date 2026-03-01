import mongoose from 'mongoose';

const adminUserSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      default: 'Administrator',
      trim: true,
      maxlength: 60,
    },
    email: {
      type: String,
      required: true,
      lowercase: true,
      trim: true,
    },
    passwordHash: {
      type: String,
      required: true,
    },
    role: {
      type: String,
      enum: ['admin'],
      default: 'admin',
    },
    lastLoginAt: Date,
  },
  {
    timestamps: true,
  }
);

adminUserSchema.index({ email: 1 }, { unique: true });

export const AdminUser = mongoose.model('AdminUser', adminUserSchema);
