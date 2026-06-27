import { useEffect, useState } from 'react';
import { PlusIcon } from '@heroicons/react/24/outline';
import PositionDrawer from '../components/PositionDrawer';

const PositionList = () => {
  const [positions, setPositions] = useState([]);
  const [pagination, setPagination] = useState({
    page: 1,
    limit: 10,
    total: 0,
    totalPages: 1,
  });
  const [loading, setLoading] = useState(false);
  const [isOpen, setIsOpen] = useState(false);
const [editingPosition, setEditingPosition] = useState(null);
  const fetchPositions = async (page = 1) => {
    setLoading(true);

    try {
      const res = await fetch(
        `http://localhost:5000/api/positions?page=${page}&limit=${pagination.limit}`
      );

      const result = await res.json();

      setPositions(result.data || []);
      setPagination(result.pagination || pagination);

    } catch (err) {
      console.error('Fetch positions error:', err);
      setPositions([]);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchPositions(1);
  }, []);

  const handlePageChange = (newPage) => {
    if (newPage < 1 || newPage > pagination.totalPages) return;

    setPagination(prev => ({ ...prev, page: newPage }));
    fetchPositions(newPage);
  };

  const handleCreate = () => {
  console.log("CLICKED CREATE POSITION");
  setEditingPosition(null);
  setIsOpen(true);
};

const reload = () => {
  fetchPositions(pagination.page, pagination.limit);
};

  return (
    <div className="bg-white rounded-2xl shadow overflow-hidden">
      <div className="px-6 py-5 border-b flex items-center justify-between">
        <h2 className="text-2xl font-semibold text-gray-800">
          Danh sách vị trí làm việc
        </h2>

        <button
          onClick={handleCreate}
          className="flex items-center gap-2 bg-blue-600 hover:bg-blue-700 text-white px-5 py-2.5 rounded-xl"
        >
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
            </tr>
          </thead>

          <tbody className="divide-y">
            {loading ? (
              <tr>
                <td colSpan="5" className="text-center py-6">
                  Loading...
                </td>
              </tr>
            ) : (
              positions.map((pos, index) => (
                <tr key={pos._id}>
                  <td className="px-6 py-4">
                    {(pagination.page - 1) * pagination.limit + index + 1}
                  </td>
                  <td className="px-6 py-4 font-mono">{pos.code}</td>
                  <td className="px-6 py-4">{pos.name}</td>
                  <td className="px-6 py-4">
                    {pos.isActive ? 'Hoạt động' : 'Ngừng'}
                  </td>
                  <td className="px-6 py-4">{pos.des}</td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>

      {/* PAGINATION */}
      {pagination.totalPages > 1 && (
        <div className="flex justify-between px-6 py-4 border-t">
          <button
            disabled={pagination.page === 1}
            onClick={() => handlePageChange(pagination.page - 1)}
          >
            Trước
          </button>

          <button
            disabled={pagination.page === pagination.totalPages}
            onClick={() => handlePageChange(pagination.page + 1)}
          >
            Sau
          </button>
        </div>
      )}

      {/* DRAWER */}
      <PositionDrawer
        isOpen={isOpen}
        onClose={() => setIsOpen(false)}
        onSuccess={reload}
        editingPosition={editingPosition}
      />
    </div>
  );

};

export default PositionList;
