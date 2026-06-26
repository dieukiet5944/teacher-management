import mongoose from 'mongoose';
import dotenv from 'dotenv';
import User from '../models/User.js';
import Teacher from '../models/Teacher.js';
import TeacherPosition from '../models/TeacherPosition.js';

dotenv.config();

const rawUri = process.env.MONGODB_URI || process.env.MONGODB_URL || 'mongodb://127.0.0.1:27017/teacher_management';
const MONGODB_URI = /<username>|<password>|<cluster-name>/.test(rawUri)
  ? 'mongodb://127.0.0.1:27017/teacher_management'
  : rawUri;
const MONGODB_DB_NAME = process.env.MONGODB_DB_NAME || process.env.MONGODB_COLLECTION || 'teacher_management';

const SAMPLE_URLS = {
  users: 'https://raw.githubusercontent.com/khoatranpc/WEB/mock-data-fullstack/school.users.json',
  teachers: 'https://raw.githubusercontent.com/khoatranpc/WEB/mock-data-fullstack/school.teachers.json',
  teacherPositions: 'https://raw.githubusercontent.com/khoatranpc/WEB/mock-data-fullstack/school.teacherpositions.json'
};

function toObjectId(value) {
  if (!value) return undefined;
  if (typeof value === 'string') return new mongoose.Types.ObjectId(value);
  if (value?.$oid) return new mongoose.Types.ObjectId(value.$oid);
  return value;
}

function toDate(value) {
  if (!value) return undefined;
  if (value?.$date) return new Date(value.$date);
  if (value instanceof Date) return value;
  return new Date(value);
}

async function fetchJson(url) {
  const res = await fetch(url);
  if (!res.ok) {
    throw new Error(`Failed to fetch ${url}: ${res.status}`);
  }
  return res.json();
}

async function main() {
  await mongoose.connect(MONGODB_URI, { dbName: MONGODB_DB_NAME });
  console.log(`✅ Connected to MongoDB: ${MONGODB_URI} (db: ${MONGODB_DB_NAME})`);

  await Promise.all([
    User.deleteMany({}),
    Teacher.deleteMany({}),
    TeacherPosition.deleteMany({})
  ]);

  const usersData = await fetchJson(SAMPLE_URLS.users);
  const positionsData = await fetchJson(SAMPLE_URLS.teacherPositions);
  const teachersData = await fetchJson(SAMPLE_URLS.teachers);

  const userDocs = usersData.map((item) => ({
    _id: toObjectId(item._id),
    name: item.name,
    email: item.email || undefined,
    phoneNumber: item.phoneNumber,
    address: item.address,
    identity: item.identity,
    dob: toDate(item.dob),
    role: item.role || 'TEACHER',
    isDeleted: false,
    createdAt: toDate(item.createdAt),
    updatedAt: toDate(item.updatedAt)
  }));

  const positionDocs = positionsData.map((item) => ({
    _id: toObjectId(item._id),
    name: item.name,
    code: item.code,
    des: item.des,
    isActive: item.isActive !== false,
    isDeleted: false,
    createdAt: toDate(item.createdAt),
    updatedAt: toDate(item.updatedAt)
  }));

  const teacherDocs = teachersData.map((item) => ({
    _id: toObjectId(item._id),
    code: item.code,
    startDate: toDate(item.startDate),
    endDate: toDate(item.endDate),
    isActive: item.isActive !== false,
    isDeleted: false,
    userId: toObjectId(item.userId),
    teacherPositions: (item.teacherPositionsId || []).map(toObjectId),
    degrees: (item.degrees || []).map((degree) => ({
      type: degree.type,
      school: degree.school,
      major: degree.major,
      year: degree.year,
      isGraduated: degree.isGraduated,
      _id: toObjectId(degree._id)
    })),
    createdAt: toDate(item.createdAt),
    updatedAt: toDate(item.updatedAt)
  }));

  await User.insertMany(userDocs, { ordered: false });
  await TeacherPosition.insertMany(positionDocs, { ordered: false });
  await Teacher.insertMany(teacherDocs, { ordered: false });

  console.log(`✅ Imported ${userDocs.length} users`);
  console.log(`✅ Imported ${positionDocs.length} teacher positions`);
  console.log(`✅ Imported ${teacherDocs.length} teachers`);

  await mongoose.disconnect();
}

main().catch((error) => {
  console.error('❌ Import failed:', error);
  process.exit(1);
});
