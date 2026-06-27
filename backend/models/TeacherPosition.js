import mongoose from 'mongoose';
import process from 'node:process';

const collectionName = process.env.MONGODB_POSITIONS_COLLECTION || 'teacherpositions';

const teacherPositionSchema = new mongoose.Schema({
  name: { type: String, required: true },
  code: { type: String, required: true, unique: true },
  des: String,
  isActive: { type: Boolean, default: true },
  isDeleted: { type: Boolean, default: false }
}, { timestamps: true });

export default mongoose.model('TeacherPosition', teacherPositionSchema, collectionName);