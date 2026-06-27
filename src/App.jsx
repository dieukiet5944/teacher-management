// import { useState } from 'react';
// import TeacherList from './pages/TeacherList';
// import PositionList from './pages/PositionList';
// import TeacherDrawer from './components/TeacherDrawer';

// function App() {
//   const [isDrawerOpen, setIsDrawerOpen] = useState(false);
//   const [editingTeacher, setEditingTeacher] = useState(null);

//   // Trigger để TeacherList fetch lại dữ liệu
//   const [reload, setReload] = useState(false);

//   const handleEdit = (teacher) => {
//     setEditingTeacher(teacher);
//     setIsDrawerOpen(true);
//   };

//   const handleCreate = () => {
//     setEditingTeacher(null);
//     setIsDrawerOpen(true);
//   };

//   // Được gọi sau khi tạo giáo viên thành công
//   const handleSuccess = () => {
//     setReload((prev) => !prev);
//     setIsDrawerOpen(false);
//   };

//   return (
//     <div className="min-h-screen bg-gray-50">
//       <div className="max-w-7xl mx-auto px-6 py-8">

//         <div className="mb-8">
//           <h1 className="text-4xl font-bold text-gray-900">
//             Quản lý Giáo viên
//           </h1>

//           <p className="text-gray-500 mt-1">
//             Danh sách giáo viên
//           </p>
//         </div>

//         <TeacherList
//           reload={reload}
//           onEdit={handleEdit}
//           onCreate={handleCreate}
//         />

//         <div className="mt-12">
//           <PositionList />
//         </div>

//       </div>

//       <TeacherDrawer
//         isOpen={isDrawerOpen}
//         onClose={() => setIsDrawerOpen(false)}
//         teacher={editingTeacher}
//         onSuccess={handleSuccess}
//       />
//     </div>
//   );
// }

// export default App;
import { Routes, Route, Navigate, Link } from 'react-router-dom';
import TeacherList from './pages/TeacherList';
import PositionList from './pages/PositionList';

function App() {
  return (
    <div className="min-h-screen bg-gray-50">

      <div className="flex gap-4 p-4 bg-white border-b">
        <Link to="/teachers">Teachers</Link>
        <Link to="/teacher-positions">Positions</Link>
      </div>

      <Routes>
        <Route path="/" element={<Navigate to="/teachers" />} />
        <Route path="/teachers" element={<TeacherList />} />
        <Route path="/teacher-positions" element={<PositionList />} />
      </Routes>

    </div>
  );
}

export default App;