import { useEffect, useState } from 'react';
import { PlusIcon } from '@heroicons/react/24/outline';

const PositionList = () => {
  const [positions, setPositions] = useState([]);

  useEffect(() => {
    const fetchPositions = async () => {
      try {
        const res = await fetch('http://localhost:5000/api/positions');
        const data = await res.json();
        setPositions(data);
      } catch (error) {
        console.error('Failed to load positions:', error);
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
        <button className="flex items-center gap-2 bg-blue-600 hover:bg-blue-700 text-white px-5 py-2.5 rounded-xl transition">
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
            {positions.map((pos, index) => (
              <tr key={pos._id} className="hover:bg-gray-50">
                <td className="px-6 py-4">{index + 1}</td>
                <td className="px-6 py-4 font-mono">{pos.code}</td>
                <td className="px-6 py-4 font-medium">{pos.name}</td>
                <td className="px-6 py-4">
                  <span className="inline-flex px-3 py-1 rounded-full text-sm bg-green-100 text-green-700 font-medium">
                    {pos.isActive ? 'Hoạt động' : 'Không hoạt động'}
                  </span>
                </td>
                <td className="px-6 py-4 text-gray-600">{pos.des}</td>
                <td className="px-6 py-4 text-center">
                  <button className="text-blue-600 hover:text-blue-700 font-medium">Sửa</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default PositionList;