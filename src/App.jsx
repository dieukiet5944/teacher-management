import { useState } from "react";
import { Routes, Route, Navigate, Link } from "react-router-dom";

import TeacherList from "./pages/TeacherList";
import PositionList from "./pages/PositionList";
import TeacherDrawer from "./components/TeacherDrawer";

function App() {
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);
  const [editingTeacher, setEditingTeacher] = useState(null);

  const handleCreate = () => {
    setEditingTeacher(null);
    setIsDrawerOpen(true);
  };

  const handleEdit = (teacher) => {
    setEditingTeacher(teacher);
    setIsDrawerOpen(true);
  };

  return (
    <div className="min-h-screen bg-gray-50">

      {/* NAV BAR */}
      <div className="flex gap-4 p-4 bg-white border-b">
        <Link to="/teachers">Teachers</Link>
        <Link to="/teacher-positions">Positions</Link>
      </div>

      {/* ROUTES */}
      <Routes>
        <Route
          path="/teachers"
          element={
            <TeacherList
              onCreate={handleCreate}
              onEdit={handleEdit}
            />
          }
        />

        <Route path="/teacher-positions" element={<PositionList />} />

        <Route path="/" element={<Navigate to="/teachers" />} />
      </Routes>

      {/* DRAWER GLOBAL */}
      <TeacherDrawer
        isOpen={isDrawerOpen}
        teacher={editingTeacher}
        onClose={() => setIsDrawerOpen(false)}
      />
    </div>
  );
}

export default App;