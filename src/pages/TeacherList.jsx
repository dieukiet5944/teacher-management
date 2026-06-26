import { useEffect, useState } from 'react';
import { MagnifyingGlassIcon, PlusIcon } from '@heroicons/react/24/outline';

const TeacherList = ({ onEdit = (/** @type {any} */ _teacher) => {}, onCreate = () => {} }) => {
  const [teachers, setTeachers] = useState(/** @type {Array<any>} */ ([]));
  const [search, setSearch] = useState('');

  useEffect(() => {
    const fetchTeachers = async () => {
      try {
        const res = await fetch('http://localhost:5000/api/teachers');
        const result = await res.json();
        const teacherData = Array.isArray(result) ? result : result?.data || [];
        setTeachers(teacherData);
      } catch (error) {
        console.error('Failed to load teachers:', error);
        setTeachers([]);
      }
    };

    fetchTeachers();
  }, []);

  const keyword = search.toLowerCase();
  const filteredTeachers = (Array.isArray(teachers) ? teachers : []).filter((teacher) => {
    if (!teacher) return false;

    return (
      teacher.code?.toLowerCase?.().includes(keyword) ||
      teacher.userId?.name?.toLowerCase?.().includes(keyword) ||
      teacher.name?.toLowerCase?.().includes(keyword)
    );
  });

  return (
    <div className="bg-white rounded-2xl shadow overflow-hidden">
      <div className="px-6 py-5 border-b flex items-center justify-between bg-white">
        <h2 className="text-2xl font-semibold text-gray-800">Danh sách giáo viên</h2>
        <button
          onClick={onCreate}
          className="flex items-center gap-2 bg-blue-600 hover:bg-blue-700 text-white px-5 py-2.5 rounded-xl transition-all"
        >
          <PlusIcon className="w-5 h-5" />
          Thêm giáo viên
        </button>
      </div>

      <div className="p-4 border-b">
        <div className="relative">
          <MagnifyingGlassIcon className="w-5 h-5 absolute left-4 top-3.5 text-gray-400" />
          <input
            type="text"
            placeholder="Tìm kiếm theo tên hoặc mã..."
            className="w-full pl-11 pr-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:border-blue-500"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
        </div>
      </div>

      <div className="overflow-x-auto">
        <table className="w-full">
          <thead>
            <tr className="bg-gray-50 text-sm text-gray-600 border-b">
              <th className="px-6 py-4 text-left">Mã</th>
              <th className="px-6 py-4 text-left">Giáo viên</th>
              <th className="px-6 py-4 text-left">Trình độ</th>
              <th className="px-6 py-4 text-left">Bộ môn</th>
              <th className="px-6 py-4 text-left">Địa chỉ</th>
              <th className="px-6 py-4 text-left">Trạng thái</th>
              <th className="px-6 py-4 text-center">Hành động</th>
            </tr>
          </thead>
          <tbody className="divide-y">
            {filteredTeachers.map((teacher) => (
              <tr key={teacher._id} className="hover:bg-gray-50">
                <td className="px-6 py-4 font-mono">{teacher.code}</td>
                <td className="px-6 py-4">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 bg-blue-100 rounded-full flex items-center justify-center text-xl">👨‍🏫</div>
                    <div>
                      <div className="font-medium">{teacher.userId?.name || 'Chưa có tên'}</div>
                      <div className="text-sm text-gray-500">{teacher.userId?.email || ''}</div>
                    </div>
                  </div>
                </td>
                <td className="px-6 py-4">
                  <div>{teacher.degrees?.[0]?.type || 'Chưa cập nhật'}</div>
                  <div className="text-sm text-gray-500">{teacher.degrees?.[0]?.major || ''}</div>
                </td>
                <td className="px-6 py-4">{teacher.teacherPositions?.[0]?.name || 'Chưa cập nhật'}</td>
                <td className="px-6 py-4">{teacher.userId?.address || ''}</td>
                <td className="px-6 py-4">
                  <span className="bg-green-100 text-green-700 px-3 py-1 rounded-full text-sm font-medium">
                    {teacher.isActive ? 'Đang công tác' : 'Nghỉ việc'}
                  </span>
                </td>
                <td className="px-6 py-4 text-center">
                  <button onClick={() => onEdit(teacher)} className="text-blue-600 hover:underline font-medium">
                    Chi tiết
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default TeacherList;