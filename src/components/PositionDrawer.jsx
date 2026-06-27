import { Fragment, useEffect, useState } from 'react';
import { Dialog, Transition } from '@headlessui/react';
import { XMarkIcon } from '@heroicons/react/24/outline';

const PositionDrawer = ({ isOpen, onClose, onSuccess, editingPosition }) => {
  const [form, setForm] = useState({
    name: '',
    code: '',
    des: '',
  });

  useEffect(() => {
    if (isOpen) {
      if (editingPosition) {
        setForm({
          name: editingPosition.name || '',
          code: editingPosition.code || '',
          des: editingPosition.des || '',
        });
      } else {
        setForm({
          name: '',
          code: '',
          des: '',
        });
      }
    }
  }, [isOpen, editingPosition]);

  const handleChange = (e) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const res = await fetch('http://localhost:5000/api/teacher-positions', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(form),
      });

      const data = await res.json();

      if (!res.ok) {
        alert(data.message || 'Lỗi tạo vị trí');
        return;
      }

      alert('Tạo vị trí thành công!');
      onSuccess?.();
      onClose();
    } catch (err) {
      console.error(err);
      alert('Server error');
    }
  };

  return (
    <Transition show={isOpen} as={Fragment}>
      <Dialog onClose={onClose} className="relative z-50">

        {/* overlay */}
        <div className="fixed inset-0 bg-black/40" />

        <div className="fixed inset-0 flex justify-end">
          <Dialog.Panel className="w-full max-w-xl bg-white h-full shadow-xl flex flex-col">

            {/* header */}
            <div className="flex justify-between items-center px-6 py-4 border-b">
              <h2 className="text-xl font-semibold">
                {editingPosition ? 'Cập nhật vị trí' : 'Tạo vị trí mới'}
              </h2>

              <button onClick={onClose}>
                <XMarkIcon className="w-6 h-6 text-gray-500" />
              </button>
            </div>

            {/* form */}
            <form onSubmit={handleSubmit} className="p-6 space-y-4">

              <div>
                <label className="text-sm">Tên vị trí</label>
                <input
                  name="name"
                  value={form.name}
                  onChange={handleChange}
                  className="w-full border px-4 py-2 rounded-lg"
                  required
                />
              </div>

              <div>
                <label className="text-sm">Mã vị trí</label>
                <input
                  name="code"
                  value={form.code}
                  onChange={handleChange}
                  className="w-full border px-4 py-2 rounded-lg"
                  required
                />
              </div>

              <div>
                <label className="text-sm">Mô tả</label>
                <textarea
                  name="des"
                  value={form.des}
                  onChange={handleChange}
                  className="w-full border px-4 py-2 rounded-lg"
                />
              </div>

              <div className="flex justify-end gap-3 pt-4 border-t">
                <button
                  type="button"
                  onClick={onClose}
                  className="px-4 py-2 border rounded-lg"
                >
                  Hủy
                </button>

                <button
                  type="submit"
                  className="px-4 py-2 bg-blue-600 text-white rounded-lg"
                >
                  Lưu
                </button>
              </div>

            </form>
          </Dialog.Panel>
        </div>
      </Dialog>
    </Transition>
  );
};

export default PositionDrawer;