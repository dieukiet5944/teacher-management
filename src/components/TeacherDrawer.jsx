import { Fragment, useState, useEffect } from 'react';
import { Dialog, Transition } from '@headlessui/react';
import { XMarkIcon } from '@heroicons/react/24/outline';

const TeacherDrawer = ({ isOpen, onClose, teacher }) => {
  const [form, setForm] = useState({
    fullName: '',
    email: '',
    phone: '',
    cccd: '',
    address: '',
    dateOfBirth: '',
    department: '',
  });

  // Reset form khi drawer mở hoặc teacher thay đổi
  useEffect(() => {
    if (isOpen) {
      if (teacher) {
        setForm({
          fullName: teacher.fullName || '',
          email: teacher.email || '',
          phone: teacher.phone || '',
          cccd: teacher.cccd || '',
          address: teacher.address || '',
          dateOfBirth: teacher.dateOfBirth || '',
          department: teacher.department || '',
        });
      } else {
        setForm({
          fullName: '',
          email: '',
          phone: '',
          cccd: '',
          address: '',
          dateOfBirth: '',
          department: '',
        });
      }
    }
  }, [isOpen, teacher]);

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Đang lưu giáo viên:", form);
    alert(teacher ? "Cập nhật giáo viên thành công!" : "Thêm giáo viên mới thành công!");
    onClose();
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm(prev => ({ ...prev, [name]: value }));
  };

  return (
    <Transition show={isOpen} as={Fragment}>
      <Dialog onClose={onClose} className="relative z-50">
        <div className="fixed inset-0 bg-black/40" />

        <div className="fixed inset-0 overflow-y-auto">
          <div className="flex min-h-full items-center justify-end">
            <Dialog.Panel className="w-full max-w-2xl h-screen bg-white shadow-2xl flex flex-col">

              {/* Header */}
              <div className="sticky top-0 bg-white border-b px-6 py-4 flex justify-between items-center z-10">
                <h2 className="text-xl font-semibold">
                  {teacher ? "Chỉnh sửa thông tin giáo viên" : "Tạo thông tin giáo viên mới"}
                </h2>
                <button onClick={onClose}>
                  <XMarkIcon className="w-6 h-6 text-gray-500 hover:text-gray-700" />
                </button>
              </div>

              {/* Form */}
              <form onSubmit={handleSubmit} className="flex-1 overflow-y-auto p-6 space-y-8">
                {/* Avatar */}
                <div className="flex justify-center">
                  <div className="w-32 h-32 rounded-2xl bg-gradient-to-br from-blue-100 to-indigo-100 flex items-center justify-center text-6xl shadow">
                    👨‍🏫
                  </div>
                </div>

                <div>
                  <h3 className="text-lg font-medium mb-4">Thông tin cá nhân</h3>
                  <div className="grid grid-cols-2 gap-4">
                    <div className="col-span-2">
                      <label className="block text-sm font-medium mb-1">Họ và tên <span className="text-red-500">*</span></label>
                      <input 
                        type="text" 
                        name="fullName"
                        required
                        value={form.fullName} 
                        onChange={handleChange}
                        className="w-full border border-gray-300 rounded-lg px-4 py-2.5 focus:outline-none focus:border-blue-500"
                      />
                    </div>

                    <div>
                      <label className="block text-sm font-medium mb-1">Ngày sinh</label>
                      <input 
                        type="date" 
                        name="dateOfBirth"
                        value={form.dateOfBirth} 
                        onChange={handleChange}
                        className="w-full border border-gray-300 rounded-lg px-4 py-2.5"
                      />
                    </div>

                    <div>
                      <label className="block text-sm font-medium mb-1">Số điện thoại</label>
                      <input 
                        type="text" 
                        name="phone"
                        value={form.phone} 
                        onChange={handleChange}
                        className="w-full border border-gray-300 rounded-lg px-4 py-2.5"
                      />
                    </div>

                    <div>
                      <label className="block text-sm font-medium mb-1">Email</label>
                      <input 
                        type="email" 
                        name="email"
                        value={form.email} 
                        onChange={handleChange}
                        className="w-full border border-gray-300 rounded-lg px-4 py-2.5"
                      />
                    </div>

                    <div>
                      <label className="block text-sm font-medium mb-1">Số CCCD</label>
                      <input 
                        type="text" 
                        name="cccd"
                        value={form.cccd} 
                        onChange={handleChange}
                        className="w-full border border-gray-300 rounded-lg px-4 py-2.5"
                      />
                    </div>

                    <div className="col-span-2">
                      <label className="block text-sm font-medium mb-1">Địa chỉ</label>
                      <input 
                        type="text" 
                        name="address"
                        value={form.address} 
                        onChange={handleChange}
                        className="w-full border border-gray-300 rounded-lg px-4 py-2.5"
                      />
                    </div>
                  </div>
                </div>

                <div className="flex justify-end gap-4 pt-8 border-t">
                  <button 
                    type="button" 
                    onClick={onClose}
                    className="px-6 py-2.5 border border-gray-300 rounded-xl hover:bg-gray-50"
                  >
                    Hủy
                  </button>
                  <button 
                    type="submit"
                    className="px-6 py-2.5 bg-blue-600 text-white rounded-xl hover:bg-blue-700"
                  >
                    {teacher ? "Cập nhật" : "Lưu thông tin"}
                  </button>
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