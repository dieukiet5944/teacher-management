import { useState } from 'react';
import TeacherList from './pages/TeacherList';
import PositionList from './pages/PositionList';
import TeacherDrawer from './components/TeacherDrawer';

function App() {
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);
  const [editingTeacher, setEditingTeacher] = useState(null);

  const handleEdit = (teacher) => {
    setEditingTeacher(teacher);
    setIsDrawerOpen(true);
  };

  const handleCreate = () => {
    setEditingTeacher(null);
    setIsDrawerOpen(true);
  };

  return (
    <div className="min-h-screen bg-[#0f172a]">
      <div className="max-w-7xl mx-auto px-6 py-10">
        <h1 className="text-4xl font-bold text-white mb-2">Quản lý Giáo viên</h1>
        <p className="text-slate-400 mb-10">Danh sách giáo viên</p>

        <TeacherList onEdit={handleEdit} onCreate={handleCreate} />
        
        <div className="mt-16">
          <PositionList />
        </div>
      </div>

      <TeacherDrawer 
        isOpen={isDrawerOpen} 
        onClose={() => setIsDrawerOpen(false)} 
        teacher={editingTeacher}
      />
    </div>
  );
}

export default App;