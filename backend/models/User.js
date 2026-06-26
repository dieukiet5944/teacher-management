import mongoose from 'mongoose';
import process from 'node:process';

const collectionName = process.env.MONGODB_USERS_COLLECTION || 'users';

const userSchema = new mongoose.Schema({
  name: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  phoneNumber: String,
  address: String,
  identity: String,
  dob: Date,
  isDeleted: { type: Boolean, default: false },
  role: {
    type: String,
    enum: ['STUDENT', 'TEACHER', 'ADMIN'],
    default: 'TEACHER'
  }
}, { timestamps: true });

export default mongoose.model('User', userSchema, collectionName);