import React, { useState } from 'react';
import Calendar from 'react-calendar';
import 'react-calendar/dist/Calendar.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCheckCircle, faTimesCircle, faCalendarAlt } from '@fortawesome/free-solid-svg-icons';

const StudentDashboard = () => {
  const [selectedDate, setSelectedDate] = useState(new Date());

  const handleDateChange = (date) => {
    setSelectedDate(date);
  };

  // Dummy data for attendance
  const attendance = {
    '2024-06-01': 'present',
    '2024-06-02': 'absent',
    '2024-06-03': 'holiday',
    '2024-06-04': 'present',
    // Add more dates as needed
  };

  // Dummy data for classes
  const classes = [
    { id: 1, name: 'Math 101', total: 20, present: 18, absent: 2 },
    { id: 2, name: 'Science 102', total: 22, present: 20, absent: 2 },
    { id: 3, name: 'History 201', total: 18, present: 16, absent: 2 },
    // Add more classes as needed
  ];

  const calculateAttendancePercentage = (present, total) => (present / total) * 100;

  // Dummy data for weekly timetable
  const timetable = {
    Monday: [
      { time: '09:00 - 10:00', subject: 'Math 101' },
      { time: '11:00 - 12:00', subject: 'Science 102' },
    ],
    Tuesday: [
      { time: '10:00 - 11:00', subject: 'History 201' },
      { time: '12:00 - 13:00', subject: 'Math 101' },
    ],
    Wednesday: [
      { time: '09:00 - 10:00', subject: 'Science 102' },
      { time: '11:00 - 12:00', subject: 'Math 101' },
    ],
    Thursday: [
      { time: '10:00 - 11:00', subject: 'History 201' },
      { time: '12:00 - 13:00', subject: 'Science 102' },
    ],
    Friday: [
      { time: '09:00 - 10:00', subject: 'Math 101' },
      { time: '11:00 - 12:00', subject: 'History 201' },
    ],
  };

  const daysOfWeek = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
  const currentDay = daysOfWeek[new Date().getDay()];
  const todaysClasses = timetable[currentDay] || [];

  return (
    <div className="flex flex-col md:flex-row">
      <main className="flex-1 p-6 bg-gray-100 min-h-screen">
        <header className="flex flex-col md:flex-row justify-between items-center mb-8">
          <div>
            <h1 className="text-3xl font-bold text-gray-800">Welcome, Jane Doe!</h1>
            <p className="text-gray-600">Here's an overview of your current academic status.</p>
          </div>
          <img src="/avatar.jpg" alt="Profile" className="w-16 h-16 rounded-full mt-4 md:mt-0" />
        </header>

        <section className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          <div className="bg-white rounded-lg shadow-md p-6 text-center">
            <h3 className="text-lg font-bold">Current GPA</h3>
            <p className="text-2xl text-blue-600 font-bold">3.85</p>
          </div>
          <div className="bg-white rounded-lg shadow-md p-6 text-center">
            <h3 className="text-lg font-bold">Attendance</h3>
            <p className="text-2xl text-green-600 font-bold">95%</p>
          </div>
          <div className="bg-white rounded-lg shadow-md p-6 text-center">
            <h3 className="text-lg font-bold">Next Class</h3>
            <p className="text-xl">Math 101</p>
            <p className="text-gray-600">10:00 AM - 11:00 AM</p>
          </div>
        </section>

        <section className="mb-8">
          <h2 className="text-xl font-bold mb-4">Today's Classes</h2>
          <div className="bg-white rounded-lg shadow-md p-6 overflow-x-auto">
            {todaysClasses.length > 0 ? (
              <table className="w-full table-auto">
                <thead>
                  <tr>
                    <th className="text-left py-2 break-words">Time</th>
                    <th className="text-left py-2 break-words">Subject</th>
                  </tr>
                </thead>
                <tbody>
                  {todaysClasses.map((cls, index) => (
                    <tr key={index} className="border-b border-gray-200 hover:bg-gray-100">
                      <td className="py-2">{cls.time}</td>
                      <td className="py-2">{cls.subject}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            ) : (
              <p className="text-gray-600">No classes scheduled for today.</p>
            )}
          </div>
        </section>

        <section className="mb-8">
          <h2 className="text-xl font-bold mb-4">Recent Grades</h2>
          <div className="bg-white rounded-lg shadow-md p-6 overflow-x-auto">
            <table className="w-full table-auto">
              <thead>
                <tr>
                  <th className="text-left py-2 break-words">Course</th>
                  <th className="text-left py-2 break-words">Assignment</th>
                  <th className="text-left py-2 break-words">Grade</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td className="py-2">Math 101</td>
                  <td className="py-2">Homework 1</td>
                  <td className="py-2 text-green-600 font-bold">A</td>
                </tr>
                <tr>
                  <td className="py-2">Science 102</td>
                  <td className="py-2">Lab Report</td>
                  <td className="py-2 text-yellow-600 font-bold">B</td>
                </tr>
                <tr>
                  <td className="py-2">History 201</td>
                  <td className="py-2">Essay</td>
                  <td className="py-2 text-red-600 font-bold">C</td>
                </tr>
              </tbody>
            </table>
          </div>
        </section>

        <section className="mb-8">
          <h2 className="text-xl font-bold mb-4">Upcoming Events</h2>
          <div className="bg-white rounded-lg shadow-md p-6 overflow-x-auto">
            <ul>
              <li className="py-2 border-b">
                <h3 className="text-lg font-bold">Midterm Exam</h3>
                <p className="text-gray-600">Math 101 - March 15, 2024</p>
              </li>
              <li className="py-2 border-b">
                <h3 className="text-lg font-bold">Project Presentation</h3>
                <p className="text-gray-600">Science 102 - March 20, 2024</p>
              </li>
              <li className="py-2">
                <h3 className="text-lg font-bold">Field Trip</h3>
                <p className="text-gray-600">History 201 - March 25, 2024</p>
              </li>
            </ul>
          </div>
        </section>

        <section className="mb-8">
          <h2 className="text-xl font-bold mb-4">Attendance Calendar</h2>
          <div className="bg-white rounded-lg shadow-md p-6">
            <Calendar
              onChange={handleDateChange}
              value={selectedDate}
              tileClassName={({ date, view }) => {
                if (view === 'month') {
                  const dateString = date.toISOString().split('T')[0];
                  const attendanceStatus = attendance[dateString];
                  return {
                    'present': attendanceStatus === 'present',
                    'absent': attendanceStatus === 'absent',
                    'holiday': attendanceStatus === 'holiday',
                  };
                }
              }}
            />
          </div>
        </section>

        <section className="mb-8">
          <h2 className="text-xl font-bold mb-4">Class Attendance Summary</h2>
          <div className="bg-white rounded-lg shadow-md p-6 overflow-x-auto">
            <table className="w-full table-auto">
              <thead>
                <tr>
                  <th className="text-left py-2 break-words">Class</th>
                  <th className="text-left py-2 break-words">Total Classes</th>
                  <th className="text-left py-2 break-words">Present</th>
                  <th className="text-left py-2 break-words">Absent</th>
                  <th className="text-left py-2 break-words">Percentage</th>
                </tr>
              </thead>
              <tbody>
                {classes.map(c => (
                  <tr key={c.id} className="border-b border-gray-200 hover:bg-gray-100">
                    <td className="py-2">{c.name}</td>
                    <td className="py-2">{c.total}</td>
                    <td className="py-2 text-green-600">{c.present}</td>
                    <td className="py-2 text-red-600">{c.absent}</td>
                    <td className="py-2">{calculateAttendancePercentage(c.present, c.total).toFixed(2)}%</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </section>
      </main>
    </div>
  );
};

export default StudentDashboard;
