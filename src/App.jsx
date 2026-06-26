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
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-7xl mx-auto px-6 py-8">
        <div className="mb-8">
          <h1 className="text-4xl font-bold text-gray-900">Quản lý Giáo viên</h1>
          <p className="text-gray-500 mt-1">Danh sách giáo viên</p>
        </div>

        <TeacherList onEdit={handleEdit} onCreate={handleCreate} />
        
        <div className="mt-12">
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