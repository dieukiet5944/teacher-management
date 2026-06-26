import mongoose from 'mongoose';
import process from 'node:process';

const connectDB = async () => {
  try {
    const rawUri = process.env.MONGODB_URI || process.env.MONGODB_URL || 'mongodb://127.0.0.1:27017/teacher_management';
    const mongoUri = /<username>|<password>|<cluster-name>/.test(rawUri)
      ? 'mongodb://127.0.0.1:27017/teacher_management'
      : rawUri;
    const dbName = process.env.MONGODB_DB_NAME || process.env.MONGODB_COLLECTION || 'teacher_management';

    await mongoose.connect(mongoUri, { dbName });
    console.log(`✅ MongoDB Connected to database: ${dbName}`);
  } catch (error) {
    console.error('❌ MongoDB Connection Error:', error);
    process.exit(1);
  }
};

export default connectDB;