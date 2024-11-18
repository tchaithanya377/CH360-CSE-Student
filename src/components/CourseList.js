import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import './courseList.css';

import { FiSearch } from 'react-icons/fi'; // Importing an icon for search input

const coursesData = [
  {
    id: 1,
    name: 'Introduction to Computer Science',
    description: 'Learn the basics of computer science and programming.',
    instructor: 'Dr. John Doe',
    credits: 3,
    assignments: [
      { id: 1, title: 'Assignment 1', description: 'Introduction to algorithms', dueDate: '2024-07-10' },
      { id: 2, title: 'Assignment 2', description: 'Basic programming concepts', dueDate: '2024-07-17' },
    ],
    announcements: [
      { id: 1, title: 'Class Canceled', description: 'Class on 2024-07-05 is canceled.' },
    ],
  },
  {
    id: 2,
    name: 'Advanced Mathematics',
    description: 'Explore advanced topics in mathematics.',
    instructor: 'Prof. Jane Smith',
    credits: 4,
    assignments: [
      { id: 1, title: 'Assignment 1', description: 'Advanced calculus problems', dueDate: '2024-07-12' },
      { id: 2, title: 'Assignment 2', description: 'Linear algebra applications', dueDate: '2024-07-19' },
    ],
    announcements: [
      { id: 1, title: 'Exam Schedule', description: 'Midterm exam on 2024-07-15.' },
    ],
  },
];

const AssignmentCard = ({ assignment }) => (
  <div className="card p-4 rounded-lg shadow-md mt-4 transition-transform transform hover:scale-105">
    <h4 className="text-lg font-semibold">{assignment.title}</h4>
    <p className="text-gray-700">{assignment.description}</p>
    <p className="text-sm text-gray-600">Due: {assignment.dueDate}</p>
  </div>
);

const AnnouncementCard = ({ announcement }) => (
  <div className="card p-4 rounded-lg shadow-md mt-4 transition-transform transform hover:scale-105">
    <h4 className="text-lg font-semibold">{announcement.title}</h4>
    <p className="text-gray-700">{announcement.description}</p>
  </div>
);

const CourseCard = ({ course }) => (
  <div className="card p-6 rounded-lg shadow-lg overflow-hidden hover:shadow-2xl transition-shadow duration-300 animate-fadeIn">
    <h3 className="text-2xl font-bold text-gray-900">{course.name}</h3>
    <p className="text-gray-700 mt-2">{course.description}</p>
    <div className="mt-4 flex justify-between items-center">
      <span className="text-sm text-gray-600">Instructor: {course.instructor}</span>
      <span className="text-sm text-gray-600">Credits: {course.credits}</span>
    </div>
    <div className="mt-4">
      <Link to={`/courses/${course.id}`} className="text-blue-500 hover:underline">View Details</Link>
    </div>
    <div className="mt-4">
      <h4 className="text-xl font-semibold">Assignments</h4>
      {course.assignments.map((assignment) => (
        <AssignmentCard key={assignment.id} assignment={assignment} />
      ))}
    </div>
    <div className="mt-4">
      <h4 className="text-xl font-semibold">Announcements</h4>
      {course.announcements.map((announcement) => (
        <AnnouncementCard key={announcement.id} announcement={announcement} />
      ))}
    </div>
  </div>
);

const CourseList = () => {
  const [courses, setCourses] = useState([]);
  const [search, setSearch] = useState('');

  useEffect(() => {
    // Simulate fetching data
    setCourses(coursesData);
  }, []);

  const filteredCourses = courses.filter((course) =>
    course.name.toLowerCase().includes(search.toLowerCase()) ||
    course.assignments.some(assignment =>
      assignment.title.toLowerCase().includes(search.toLowerCase())
    ) ||
    course.announcements.some(announcement =>
      announcement.title.toLowerCase().includes(search.toLowerCase())
    )
  );

  return (
    <div className="min-h-screen bg-light p-8">
      <h1 className="text-4xl font-bold text-gray-800 mb-6 text-center">Course List</h1>
      <div className="mb-6 relative max-w-md mx-auto">
        <input
          type="text"
          placeholder="Search for a course, assignment, or announcement..."
          className="p-4 pl-10 border border-gray-300 rounded w-full focus:outline-none focus:ring-2 focus:ring-primary"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />
        <FiSearch className="absolute left-3 top-3 text-gray-400" size={24} />
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredCourses.length > 0 ? (
          filteredCourses.map((course) => (
            <CourseCard key={course.id} course={course} />
          ))
        ) : (
          <div className="text-gray-600 text-center col-span-full">No courses, assignments, or announcements found.</div>
        )}
      </div>
    </div>
  );
};

export default CourseList;
