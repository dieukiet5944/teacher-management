import { useEffect, useState } from 'react';
import { MagnifyingGlassIcon, PlusIcon } from '@heroicons/react/24/outline';

const TeacherList = ({
  reload,
  onEdit = () => {},
  onCreate = () => {},
}) => {
  const [teachers, setTeachers] = useState([]);
  const [pagination, setPagination] = useState({ page: 1, limit: 10, total: 0, totalPages: 1 });
  const [search, setSearch] = useState('');
  const [loading, setLoading] = useState(false);

  const fetchTeachers = async (page = 1, limit = 10) => {
    setLoading(true);
    try {
      const res = await fetch(`http://localhost:5000/api/teachers?page=${page}&limit=${limit}`);
      const result = await res.json();
      
      setTeachers(result.data || []);
      setPagination(result.pagination || { page: 1, limit: 10, total: 0, totalPages: 1 });
    } catch (error) {
      console.error('Failed to load teachers:', error);
      setTeachers([]);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchTeachers(1, 10);
  }, [reload]);

  
  const handlePageChange = (newPage) => {
  if (
    newPage < 1 ||
    newPage > pagination.totalPages
  ) {
    return;
  }

  fetchTeachers(newPage, pagination.limit);
};

  const keyword = search.toLowerCase();
  const filteredTeachers =
  teachers?.length > 0
    ? teachers.filter((teacher) => {
        const keyword = search.toLowerCase();
        return (
          teacher.code?.toLowerCase().includes(keyword) ||
          (teacher.userId?.name || teacher.name)
            ?.toLowerCase()
            .includes(keyword)
        );
      })
    : [];

useEffect(() => {
  console.log("filteredTeachers:", filteredTeachers);
}, [filteredTeachers]);


const startItem =
  pagination.total === 0
    ? 0
    : (pagination.page - 1) * pagination.limit + 1;

const endItem = Math.min(
  pagination.page * pagination.limit,
  pagination.total
);

const isEmpty = !loading && filteredTeachers.length === 0;
const isSearching = search.trim().length > 0;

if (loading) {
  return <div>Đang tải...</div>;
}

  return (
    <div className="bg-white rounded-2xl shadow overflow-hidden">
      <div className="px-6 py-5 border-b flex items-center justify-between">
        <h2 className="text-2xl font-semibold text-gray-800">Danh sách giáo viên</h2>
        <button
          onClick={onCreate}
          className="flex items-center gap-2 bg-blue-600 hover:bg-blue-700 text-white px-5 py-2.5 rounded-xl transition-all"
        >
          <PlusIcon className="w-5 h-5" />
          Thêm giáo viên
        </button>
      </div>

      {/* Search */}
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

      {/* Table */}
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
            {/* {loading ? (
              <tr><td colSpan="7" className="text-center py-10">Đang tải...</td></tr>
            ) : filteredTeachers.length === 0 ? (
              <tr><td colSpan="7" className="text-center py-10 text-gray-500">Không có dữ liệu</td></tr>
            ) : ( */}
            
            {loading ? (
  <tr>
    <td colSpan="7" className="text-center py-10">
      Đang tải...
    </td>
  </tr>
) : isEmpty ? (
  <tr>
    <td colSpan="7" className="text-center py-10 text-gray-500">
      {isSearching ? "Không tìm thấy kết quả" : "Không có dữ liệu"}
    </td>
  </tr>
) : (
              filteredTeachers.map((teacher) => (
                <tr key={teacher._id} className="hover:bg-gray-50">
                  <td className="px-6 py-4 font-mono text-sm">{teacher.code}</td>
                  <td className="px-6 py-4">
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 bg-blue-100 rounded-full flex items-center justify-center text-xl">👨‍🏫</div>
                      <div>
                        <div className="font-medium">{teacher.name || 'Chưa có tên'}</div>
                        <div className="text-sm text-gray-500">{teacher.email}</div>
                      </div>
                    </div>
                  </td>
                  <td className="px-6 py-4">
                    <div>{teacher.degrees?.[0]?.type || 'Chưa cập nhật'}</div>
                    <div className="text-sm text-gray-500">{teacher.degrees?.[0]?.school || ''}</div>
                  </td>
                  <td className="px-6 py-4">
                    {teacher.teacherPositions?.length > 0
  ? teacher.teacherPositions.map(p => p.name).join(', ')
  : 'Chưa cập nhật'}
                  </td>
                  <td className="px-6 py-4 text-sm">{teacher.address || 'Chưa cập nhật'}</td>
                  <td className="px-6 py-4">
                    <span className={`px-3 py-1 rounded-full text-sm font-medium ${
                      teacher.isActive ? 'bg-green-100 text-green-700' : 'bg-red-100 text-red-700'
                    }`}>
                      {teacher.isActive ? 'Đang công tác' : 'Nghỉ việc'}
                    </span>
                  </td>
                  <td className="px-6 py-4 text-center">
                    <button
  type="button"
  onClick={() => onEdit(teacher)}
  className="text-blue-600 hover:underline font-medium"
>
  Chi tiết
</button>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>

      {/* Phân trang */}
      {pagination.totalPages > 1 && (
        <div className="flex items-center justify-between px-6 py-4 border-t bg-gray-50">
          
<div className="text-sm text-gray-600">
  Hiển thị {startItem} đến {endItem} trong tổng {pagination.total} giáo viên
</div>
          {/* <div className="text-sm text-gray-600">
            Hiển thị {(pagination.page - 1) * pagination.limit + 1} đến{' '}
            {Math.min(pagination.page * pagination.limit, pagination.total)} trong tổng {pagination.total} giáo viên
          </div> */}
          
          <div className="flex gap-2">
            <button
              onClick={() => handlePageChange(pagination.page - 1)}
              disabled={pagination.page === 1}
              className="px-4 py-2 border rounded-lg disabled:opacity-50"
            >
              Trước
            </button>
            <button
              onClick={() => handlePageChange(pagination.page + 1)}
              disabled={pagination.page === pagination.totalPages}
              className="px-4 py-2 border rounded-lg disabled:opacity-50"
            >
              Sau
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default TeacherList;