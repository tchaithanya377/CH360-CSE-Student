import React from 'react';
import { BrowserRouter as Router, Route, Routes, useLocation } from 'react-router-dom';
import Home from './components/Home';
import Login from './components/Login';
import StudentDashboard from './components/StudentDashboard';
import CourseList from './components/CourseList';
import CourseDetails from './components/CourseDetails';
import Assignments from './components/Assignments';
import DiscussionForum from './components/DiscussionForum';
import Navbar from './components/Navbar';
import AttendancePage from './components/AttendancePage';
import GradesPage from './components/GradesPage';
import ExamsPage from './components/ExamsPage';
import ProfilePage from './components/ProfilePage';
import RequestPage from './components/RequestPage';
import HelpPage from './components/HelpPage';

function App() {
  return (
    <Router>
      <MainLayout />
    </Router>
  );
}

const MainLayout = () => {
  const location = useLocation();
  const isHome = location.pathname === '/';
  const isLogin = location.pathname === '/login';

  return (
    <div className="flex flex-col md:flex-row h-screen">
      {!isHome && !isLogin && <Navbar />}
      <div className="flex-1 overflow-auto">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/login" element={<Login />} />
          <Route path="/dashboard" element={<StudentDashboard />} />
          <Route path="/courses" element={<CourseList />} />
          <Route path="/courses/:id" element={<CourseDetails />} />
          <Route path="/assignments" element={<Assignments />} />
          <Route path="/exams" element={<ExamsPage />} />
          <Route path="/discussion-forum" element={<DiscussionForum />} />
          <Route path="/attendance" element={<AttendancePage />} />
          <Route path="/grades" element={<GradesPage />} />
          <Route path="/profile" element={<ProfilePage />} />
          <Route path="/requests" element={<RequestPage />} />
          <Route path="/help" element={<HelpPage />} />


        </Routes>
      </div>
    </div>
  );
}

export default App;
