import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBars, faTimes, faHome, faBook, faUser, faSignOutAlt, faClipboardList, faCalendarAlt, faFileAlt, faBell, faCog, faQuestionCircle } from '@fortawesome/free-solid-svg-icons';

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);

  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

  return (
    <>
      <div className="bg-gray-900 text-white flex justify-between items-center px-4 py-3 md:hidden">
        <h2 className="text-2xl font-bold">CampusHub360 Student</h2>
        <button onClick={toggleMenu}>
          <FontAwesomeIcon icon={faBars} className="text-xl" />
        </button>
      </div>
      {isOpen && (
        <div className="fixed inset-0 z-50 bg-gray-900 text-white md:hidden">
          <div className="flex justify-between items-center px-4 py-3">
            <h2 className="text-2xl font-bold">CampusHub360</h2>
            <button onClick={toggleMenu}>
              <FontAwesomeIcon icon={faTimes} className="text-xl" />
            </button>
          </div>
          <nav className="flex-1 px-4 space-y-2">
            <Link to="/dashboard" className="block py-3 px-4 rounded-lg hover:bg-gray-700 flex items-center" onClick={toggleMenu}>
              <FontAwesomeIcon icon={faHome} className="mr-3" /> Home
            </Link>
            <Link to="/courses" className="block py-3 px-4 rounded-lg hover:bg-gray-700 flex items-center" onClick={toggleMenu}>
              <FontAwesomeIcon icon={faBook} className="mr-3" /> Courses
            </Link>
            <Link to="/attendance" className="block py-3 px-4 rounded-lg hover:bg-gray-700 flex items-center" onClick={toggleMenu}>
              <FontAwesomeIcon icon={faClipboardList} className="mr-3" /> Attendance
            </Link>
            <Link to="/grades" className="block py-3 px-4 rounded-lg hover:bg-gray-700 flex items-center" onClick={toggleMenu}>
              <FontAwesomeIcon icon={faFileAlt} className="mr-3" /> Grades
            </Link>
            <Link to="/exams" className="block py-3 px-4 rounded-lg hover:bg-gray-700 flex items-center" onClick={toggleMenu}>
              <FontAwesomeIcon icon={faCalendarAlt} className="mr-3" /> Exams
            </Link>
            <Link to="/profile" className="block py-3 px-4 rounded-lg hover:bg-gray-700 flex items-center" onClick={toggleMenu}>
              <FontAwesomeIcon icon={faUser} className="mr-3" /> Profile
            </Link>
            <Link to="/requests" className="block py-3 px-4 rounded-lg hover:bg-gray-700 flex items-center" onClick={toggleMenu}>
              <FontAwesomeIcon icon={faBell} className="mr-3" /> Requests
            </Link>
            <Link to="/help" className="block py-3 px-4 rounded-lg hover:bg-gray-700 flex items-center" onClick={toggleMenu}>
              <FontAwesomeIcon icon={faQuestionCircle} className="mr-3" /> Help
            </Link>
            <Link to="/settings" className="block py-3 px-4 rounded-lg hover:bg-gray-700 flex items-center" onClick={toggleMenu}>
              <FontAwesomeIcon icon={faCog} className="mr-3" /> Settings
            </Link>
            <Link to="/logout" className="block py-3 px-4 rounded-lg hover:bg-gray-700 flex items-center" onClick={toggleMenu}>
              <FontAwesomeIcon icon={faSignOutAlt} className="mr-3" /> Logout
            </Link>
          </nav>
        </div>
      )}
      <aside className="hidden md:block md:w-64 bg-gray-900 text-white flex flex-col min-h-screen">
        <div className="py-6 px-4">
          <h2 className="text-2xl font-bold">CampusHub360</h2>
        </div>
        <nav className="flex-1 px-4 space-y-2">
          <Link to="/dashboard" className="block py-3 px-4 rounded-lg hover:bg-gray-700 flex items-center">
            <FontAwesomeIcon icon={faHome} className="mr-3" /> Home
          </Link>
          <Link to="/courses" className="block py-3 px-4 rounded-lg hover:bg-gray-700 flex items-center">
            <FontAwesomeIcon icon={faBook} className="mr-3" /> Courses
          </Link>
          <Link to="/attendance" className="block py-3 px-4 rounded-lg hover:bg-gray-700 flex items-center">
            <FontAwesomeIcon icon={faClipboardList} className="mr-3" /> Attendance
          </Link>
          <Link to="/grades" className="block py-3 px-4 rounded-lg hover:bg-gray-700 flex items-center">
            <FontAwesomeIcon icon={faFileAlt} className="mr-3" /> Grades
          </Link>
          <Link to="/exams" className="block py-3 px-4 rounded-lg hover:bg-gray-700 flex items-center">
            <FontAwesomeIcon icon={faCalendarAlt} className="mr-3" /> Exams
          </Link>
          <Link to="/profile" className="block py-3 px-4 rounded-lg hover:bg-gray-700 flex items-center">
            <FontAwesomeIcon icon={faUser} className="mr-3" /> Profile
          </Link>
          <Link to="/requests" className="block py-3 px-4 rounded-lg hover:bg-gray-700 flex items-center">
            <FontAwesomeIcon icon={faBell} className="mr-3" /> Requests
          </Link>
          <Link to="/help" className="block py-3 px-4 rounded-lg hover:bg-gray-700 flex items-center">
            <FontAwesomeIcon icon={faQuestionCircle} className="mr-3" /> Help
          </Link>
          <Link to="/settings" className="block py-3 px-4 rounded-lg hover:bg-gray-700 flex items-center">
            <FontAwesomeIcon icon={faCog} className="mr-3" /> Settings
          </Link>
          <Link to="/logout" className="block py-3 px-4 rounded-lg hover:bg-gray-700 flex items-center">
            <FontAwesomeIcon icon={faSignOutAlt} className="mr-3" /> Logout
          </Link>
        </nav>
      </aside>
    </>
  );
};

export default Navbar;
