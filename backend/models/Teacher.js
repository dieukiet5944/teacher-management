import mongoose from 'mongoose';
import process from 'node:process';

const collectionName = process.env.MONGODB_TEACHERS_COLLECTION || 'teachers';

const degreeSchema = new mongoose.Schema({
  type: String,
  school: String,
  major: String,
  year: Number,
  isGraduated: Boolean
});

const teacherSchema = new mongoose.Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  isActive: { type: Boolean, default: true },
  isDeleted: { type: Boolean, default: false },
  code: { type: String, required: true, unique: true },
  startDate: Date,
  endDate: Date,
  teacherPositions: [{ type: mongoose.Schema.Types.ObjectId, ref: 'TeacherPosition' }],
  degrees: [degreeSchema]
}, { timestamps: true });

export default mongoose.model('Teacher', teacherSchema, collectionName);