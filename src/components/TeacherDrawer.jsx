import { Fragment, useState, useEffect } from 'react';
import { Dialog, Transition } from '@headlessui/react';
import { XMarkIcon } from '@heroicons/react/24/outline';

const TeacherDrawer = ({ isOpen, onClose, teacher, onSuccess }) => {
  const [loading, setLoading] = useState(false);

  const [positions, setPositions] = useState([]);

  const [form, setForm] = useState({
    name: '',
    email: '',
    phoneNumber: '',
    identity: '',
    address: '',
    dob: '',
    teacherPositions: [],
  });

  // ===========================
  // Load position list
  // ===========================
  useEffect(() => {
    if (!isOpen) return;

    const fetchPositions = async () => {
      try {
        const res = await fetch(
          'http://localhost:5000/api/positions?page=1&limit=100'
        );

        const result = await res.json();

        setPositions(result.data || []);
      } catch (err) {
        console.error('Load positions failed:', err);
      }
    };

    fetchPositions();
  }, [isOpen]);

  // ===========================
  // Reset form
  // ===========================
  useEffect(() => {
    if (!isOpen) return;

    if (teacher) {
      setForm({
        name: teacher.name || '',
        email: teacher.email || '',
        phoneNumber: teacher.phoneNumber || '',
        identity: teacher.identity || '',
        address: teacher.address || '',
        dob: teacher.dob ? teacher.dob.substring(0, 10) : '',
        teacherPositions:
          teacher.teacherPositions?.map((p) => p._id) || [],
      });
    } else {
      setForm({
        name: '',
        email: '',
        phoneNumber: '',
        identity: '',
        address: '',
        dob: '',
        teacherPositions: [],
      });
    }
  }, [teacher, isOpen]);

  // ===========================
  // Handle input
  // ===========================
  const handleChange = (e) => {
    const { name, value } = e.target;

    setForm((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  // ===========================
  // Handle Position Change
  // ===========================
  const handlePositionChange = (e) => {
    setForm((prev) => ({
      ...prev,
      teacherPositions: [e.target.value],
    }));
  };

  // ===========================
  // Submit
  // ===========================
  const handleSubmit = async (e) => {
    e.preventDefault();

    if (teacher) return;

    try {
      setLoading(true);

      const res = await fetch(
        'http://localhost:5000/api/teachers',
        {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(form),
        }
      );

      const data = await res.json();

      if (!res.ok) {
        throw new Error(data.message || 'Create failed');
      }

      onSuccess?.();

      onClose();
    } catch (err) {
      console.error(err);
      alert(err.message);
    } finally {
      setLoading(false);
    }
  };

  const isViewMode = !!teacher;

  return (
    <Transition show={isOpen} as={Fragment}>
      <Dialog
        onClose={onClose}
        className="relative z-50"
      >
```
```jsx
        {/* Overlay */}
        <div className="fixed inset-0 bg-black/40" />

        <div className="fixed inset-0 overflow-y-auto">
          <div className="flex min-h-full items-center justify-end">

            <Dialog.Panel className="w-full max-w-2xl h-screen bg-white shadow-2xl flex flex-col">

              {/* Header */}
              <div className="sticky top-0 bg-white border-b px-6 py-4 flex justify-between items-center">
                <h2 className="text-xl font-semibold">
                  {isViewMode ? 'Chi tiết giáo viên' : 'Tạo giáo viên mới'}
                </h2>

                <button onClick={onClose}>
                  <XMarkIcon className="w-6 h-6 text-gray-500 hover:text-gray-700" />
                </button>
              </div>

              <form
                onSubmit={handleSubmit}
                className="flex-1 overflow-y-auto p-6 space-y-4"
              >

                <div className="flex justify-center">
                  <div className="w-24 h-24 rounded-2xl bg-blue-100 flex items-center justify-center text-5xl">
                    👨‍🏫
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-4">

                  <div>
                    <label className="block mb-1 font-medium">
                      Họ và tên
                    </label>
                    <input
                      name="name"
                      value={form.name}
                      onChange={handleChange}
                      disabled={isViewMode}
                      className="w-full border rounded-lg px-3 py-2"
                    />
                  </div>

                  <div>
                    <label className="block mb-1 font-medium">
                      Email
                    </label>
                    <input
                      name="email"
                      value={form.email}
                      onChange={handleChange}
                      disabled={isViewMode}
                      className="w-full border rounded-lg px-3 py-2"
                    />
                  </div>

                  <div>
                    <label className="block mb-1 font-medium">
                      Số điện thoại
                    </label>
                    <input
                      name="phoneNumber"
                      value={form.phoneNumber}
                      onChange={handleChange}
                      disabled={isViewMode}
                      className="w-full border rounded-lg px-3 py-2"
                    />
                  </div>

                  <div>
                    <label className="block mb-1 font-medium">
                      CCCD
                    </label>
                    <input
                      name="identity"
                      value={form.identity}
                      onChange={handleChange}
                      disabled={isViewMode}
                      className="w-full border rounded-lg px-3 py-2"
                    />
                  </div>

                  <div>
                    <label className="block mb-1 font-medium">
                      Ngày sinh
                    </label>
                    <input
                      type="date"
                      name="dob"
                      value={form.dob}
                      onChange={handleChange}
                      disabled={isViewMode}
                      className="w-full border rounded-lg px-3 py-2"
                    />
                  </div>

                  <div>
                    <label className="block mb-1 font-medium">
                      Địa chỉ
                    </label>
                    <input
                      name="address"
                      value={form.address}
                      onChange={handleChange}
                      disabled={isViewMode}
                      className="w-full border rounded-lg px-3 py-2"
                    />
                  </div>

                  {/* ===== Position ===== */}

                  <div className="col-span-2">
                    <label className="block mb-1 font-medium">
                      Vị trí công tác
                    </label>

                    <select
                      value={form.teacherPositions[0] || ''}
                      onChange={handlePositionChange}
                      disabled={isViewMode}
                      className="w-full border rounded-lg px-3 py-2"
                    >
                      <option value="">
                        -- Chọn vị trí --
                      </option>

                      {positions.map((position) => (
                        <option
                          key={position._id}
                          value={position._id}
                        >
                          {position.name}
                        </option>
                      ))}
                    </select>
                  </div>

                </div>

                <div className="flex justify-end gap-3 pt-6 border-t">

                  <button
                    type="button"
                    onClick={onClose}
                    className="px-5 py-2 border rounded-lg"
                  >
                    {isViewMode ? 'Đóng' : 'Hủy'}
                  </button>

                  {!isViewMode && (
                    <button
                      type="submit"
                      disabled={loading}
                      className="px-5 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
                    >
                      {loading ? 'Đang lưu...' : 'Lưu giáo viên'}
                    </button>
                  )}

                </div>

              </form>

            </Dialog.Panel>

          </div>
        </div>

      </Dialog>
    </Transition>
  );
};

export default TeacherDrawer;
