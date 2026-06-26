import { useEffect, useState } from 'react';
import { PlusIcon } from '@heroicons/react/24/outline';

const PositionList = () => {
  const [positions, setPositions] = useState([]); 
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchPositions = async () => {
      try {
        const res = await fetch('http://localhost:5000/api/positions');
        const result = await res.json();
        const data = Array.isArray(result) ? result : result?.data || [];
        setPositions(data);
      } catch (error) {
        console.error('Failed to load positions:', error);
        setPositions([]);
      } finally {
        setLoading(false);
      }
    };

    fetchPositions();
  }, []);

  return (
    <div className="bg-white rounded-2xl shadow overflow-hidden">
      <div className="px-6 py-5 border-b flex items-center justify-between">
        <h2 className="text-2xl font-semibold text-gray-800">
          Danh sách vị trí làm việc (công tác) của giáo viên
        </h2>
        <button className="flex items-center gap-2 bg-blue-600 hover:bg-blue-700 text-white px-5 py-2.5 rounded-xl transition-all">
          <PlusIcon className="w-5 h-5" />
          Tạo vị trí mới
        </button>
      </div>

      <div className="overflow-x-auto">
        <table className="w-full">
          <thead>
            <tr className="bg-gray-50 text-sm text-gray-600 border-b">
              <th className="px-6 py-4 text-left">STT</th>
              <th className="px-6 py-4 text-left">Mã</th>
              <th className="px-6 py-4 text-left">Tên</th>
              <th className="px-6 py-4 text-left">Trạng thái</th>
              <th className="px-6 py-4 text-left">Mô tả</th>
              <th className="px-6 py-4 text-center">Hành động</th>
            </tr>
          </thead>
          <tbody className="divide-y">
      {loading ? (
        <tr>
          <td colSpan="6" className="px-6 py-8 text-center text-gray-500">
            Đang tải dữ liệu...
          </td>
        </tr>
      ) : (
        positions.map((pos, index) => (
          <tr key={pos._id || index} className="hover:bg-gray-50">
            <td className="px-6 py-4">{index + 1}</td>
            <td className="px-6 py-4 font-mono">{pos.code || ''}</td>
            <td className="px-6 py-4 font-medium">{pos.name || ''}</td>
            <td className="px-6 py-4">
              <span className="bg-green-100 text-green-700 px-3 py-1 rounded-full text-sm font-medium">
                {pos.isActive ? 'Hoạt động' : 'Ngừng'}
              </span>
            </td>
            <td className="px-6 py-4 text-gray-600">
              {pos.des || pos.description || ''}
            </td>
            <td className="px-6 py-4 text-center">
              <button className="text-blue-600 hover:underline font-medium">Sửa</button>
            </td>
          </tr>
        ))
      )}
    </tbody>
        </table>
      </div>
    </div>
  );
};

export default PositionList;