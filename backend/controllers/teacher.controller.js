import Teacher from '../models/Teacher.js';
import TeacherPosition from '../models/TeacherPosition.js';
import User from '../models/User.js';

const generateRandomCode = async (model) => {
  let code;
  let exists = true;

  while (exists) {
    code = String(Math.floor(100000 + Math.random() * 900000));
    exists = await model.exists({ code, isDeleted: false });
  }

  return code;
};

const serializeTeacher = (teacher) => ({
  _id: teacher._id,
  code: teacher.code,
  name: teacher.userId?.name || '',
  email: teacher.userId?.email || '',
  phoneNumber: teacher.userId?.phoneNumber || '',
  address: teacher.userId?.address || '',
  isActive: teacher.isActive,
  startDate: teacher.startDate,
  endDate: teacher.endDate,
  teacherPositions: (teacher.teacherPositions || []).map((position) => ({
    _id: position._id,
    name: position.name,
    code: position.code,
    des: position.des,
  })),
  degrees: (teacher.degrees || []).map((degree) => ({
    type: degree.type,
    school: degree.school,
    major: degree.major,
    year: degree.year,
    isGraduated: degree.isGraduated,
  })),
});

export const getAllTeachers = async (req, res) => {
  try {
    const page = Math.max(1, Number.parseInt(req.query.page, 10) || 1);
    const limit = Math.min(100, Math.max(1, Number.parseInt(req.query.limit, 10) || 10));
    const skip = (page - 1) * limit;

    const [teachers, total] = await Promise.all([
      Teacher.find({ isDeleted: false })
        .populate('userId')
        .populate('teacherPositions')
        .sort({ createdAt: -1 })
        .skip(skip)
        .limit(limit),
      Teacher.countDocuments({ isDeleted: false }),
    ]);

    res.json({
      data: teachers.map(serializeTeacher),
      pagination: {
        page,
        limit,
        total,
        totalPages: Math.ceil(total / limit),
      },
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const createTeacher = async (req, res) => {
  try {
    const body = req.body || {};
    const userData = body.userData || {};
    const teacherData = body.teacherData || {};

    const name = body.name || userData.name || teacherData.name;
    const email = body.email || userData.email;
    const phoneNumber = body.phoneNumber || body.phone || userData.phoneNumber;
    const address = body.address || userData.address;
    const identity = body.identity || userData.identity;
    const dob = body.dob || userData.dob;
    const role = body.role || userData.role || 'TEACHER';
    const isActive = body.isActive ?? teacherData.isActive ?? true;
    const startDate = body.startDate ?? teacherData.startDate;
    const endDate = body.endDate ?? teacherData.endDate;
    const teacherPositions = body.teacherPositions ?? teacherData.teacherPositions ?? body.positions ?? [];
    const degrees = body.degrees ?? teacherData.degrees ?? [];

    if (!name || !email) {
      return res.status(400).json({ message: 'Tên và email là bắt buộc' });
    }

    const existingUser = await User.findOne({ email, isDeleted: false });
    if (existingUser) {
      return res.status(409).json({ message: 'Email đã tồn tại' });
    }

    const code = await generateRandomCode(Teacher);

    const user = await User.create({
      name,
      email,
      phoneNumber,
      address,
      identity,
      dob,
      role,
      isDeleted: false,
    });

    const teacher = await Teacher.create({
      userId: user._id,
      code,
      isActive,
      startDate,
      endDate,
      teacherPositions,
      degrees,
      isDeleted: false,
    });

    const populatedTeacher = await Teacher.findById(teacher._id).populate('userId').populate('teacherPositions');

    res.status(201).json({
      message: 'Tạo giáo viên thành công',
      teacher: serializeTeacher(populatedTeacher),
      user,
    });
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

export const getAllPositions = async (req, res) => {
  try {
    const positions = await TeacherPosition.find({ isDeleted: false }).sort({ createdAt: -1 });
    res.json(positions);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const createPosition = async (req, res) => {
  try {
    const body = req.body || {};
    const code = body.code || (await generateRandomCode(TeacherPosition));

    const existingPosition = await TeacherPosition.findOne({ code, isDeleted: false });
    if (existingPosition) {
      return res.status(409).json({ message: 'Mã vị trí công tác đã tồn tại' });
    }

    const position = await TeacherPosition.create({
      ...body,
      code,
      isDeleted: false,
    });

    res.status(201).json(position);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};