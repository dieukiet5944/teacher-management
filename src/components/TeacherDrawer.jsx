import { Fragment, useState, useEffect } from 'react';
import { Dialog, Transition } from '@headlessui/react';
import { XMarkIcon } from '@heroicons/react/24/outline';

const TeacherDrawer = ({ isOpen, onClose, teacher, onSuccess }) => {
  const [loading, setLoading] = useState(false);

  const [form, setForm] = useState({
    name: '',
    email: '',
    phoneNumber: '',
    identity: '',
    address: '',
    dob: '',
  });

  // ===== RESET FORM WHEN OPEN / EDIT =====
  useEffect(() => {
    if (!isOpen) return;

    if (teacher) {
      // mode: VIEW DETAIL
      setForm({
        name: teacher.name || '',
        email: teacher.email || '',
        phoneNumber: teacher.phoneNumber || '',
        identity: teacher.identity || '',
        address: teacher.address || '',
        dob: teacher.dob ? teacher.dob.substring(0, 10) : '',
      });
    } else {
      // mode: CREATE
      setForm({
        name: '',
        email: '',
        phoneNumber: '',
        identity: '',
        address: '',
        dob: '',
      });
    }
  }, [isOpen, teacher]);

  // ===== HANDLE CHANGE =====
  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  // ===== SUBMIT CREATE TEACHER =====
  const handleSubmit = async (e) => {
    e.preventDefault();

    if (teacher) return; // view mode → không submit

    try {
      setLoading(true);

      const res = await fetch('http://localhost:5000/api/teachers', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(form),
      });

      const data = await res.json();

      if (!res.ok) {
        throw new Error(data.message || 'Error creating teacher');
      }

      // notify parent
      if (onSuccess) onSuccess();

      onClose();
    } catch (error) {
      console.error(error);
      alert(error.message);
    } finally {
      setLoading(false);
    }
  };

  const isViewMode = !!teacher;

    return (
    <Transition show={isOpen} as={Fragment}>
      <Dialog onClose={onClose} className="relative z-50">
        {/* Overlay */}
        <div className="fixed inset-0 bg-black/40" />

        <div className="fixed inset-0 overflow-y-auto">
          <div className="flex min-h-full items-center justify-end">
            
            <Dialog.Panel className="w-full max-w-2xl h-screen bg-white shadow-2xl flex flex-col">

              {/* HEADER */}
              <div className="sticky top-0 bg-white border-b px-6 py-4 flex justify-between items-center">
                <h2 className="text-xl font-semibold">
                  {teacher ? 'Chi tiết giáo viên' : 'Tạo giáo viên mới'}
                </h2>

                <button onClick={onClose}>
                  <XMarkIcon className="w-6 h-6 text-gray-500 hover:text-gray-700" />
                </button>
              </div>

              {/* FORM */}
              <form
                onSubmit={handleSubmit}
                className="flex-1 overflow-y-auto p-6 space-y-6"
              >

                {/* AVATAR */}
                <div className="flex justify-center">
                  <div className="w-28 h-28 rounded-2xl bg-gradient-to-br from-blue-100 to-indigo-100 flex items-center justify-center text-5xl">
                    👨‍🏫
                  </div>
                </div>

                {/* NAME */}
                <div>
                  <label className="text-sm font-medium">Họ và tên</label>
                  <input
                    name="name"
                    value={form.name}
                    onChange={handleChange}
                    disabled={isViewMode}
                    className="w-full border rounded-lg px-4 py-2 mt-1"
                  />
                </div>

                {/* EMAIL */}
                <div>
                  <label className="text-sm font-medium">Email</label>
                  <input
                    name="email"
                    value={form.email}
                    onChange={handleChange}
                    disabled={isViewMode}
                    className="w-full border rounded-lg px-4 py-2 mt-1"
                  />
                </div>

                {/* PHONE */}
                <div>
                  <label className="text-sm font-medium">Số điện thoại</label>
                  <input
                    name="phoneNumber"
                    value={form.phoneNumber}
                    onChange={handleChange}
                    disabled={isViewMode}
                    className="w-full border rounded-lg px-4 py-2 mt-1"
                  />
                </div>

                {/* CCCD */}
                <div>
                  <label className="text-sm font-medium">CCCD</label>
                  <input
                    name="identity"
                    value={form.identity}
                    onChange={handleChange}
                    disabled={isViewMode}
                    className="w-full border rounded-lg px-4 py-2 mt-1"
                  />
                </div>

                {/* DOB */}
                <div>
                  <label className="text-sm font-medium">Ngày sinh</label>
                  <input
                    type="date"
                    name="dob"
                    value={form.dob}
                    onChange={handleChange}
                    disabled={isViewMode}
                    className="w-full border rounded-lg px-4 py-2 mt-1"
                  />
                </div>

                {/* ADDRESS */}
                <div>
                  <label className="text-sm font-medium">Địa chỉ</label>
                  <input
                    name="address"
                    value={form.address}
                    onChange={handleChange}
                    disabled={isViewMode}
                    className="w-full border rounded-lg px-4 py-2 mt-1"
                  />
                </div>

                {/* ACTIONS */}
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