import React, { useState, useEffect } from 'react';
import Calendar from 'react-calendar';
import 'react-calendar/dist/Calendar.css';
import classNames from 'classnames';
import { motion } from 'framer-motion';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCheckCircle, faTimesCircle, faPercentage, faCalendarAlt } from '@fortawesome/free-solid-svg-icons';
import './AttendancePage.css';

const AttendancePage = () => {
  const [attendance, setAttendance] = useState({
    '2024-06-01': 'present',
    '2024-06-02': 'absent',
    '2024-06-03': 'holiday',
    // Add more records here
  });
  const [selectedDate, setSelectedDate] = useState(new Date());

  const classes = [
    { id: 1, name: 'Introduction to Computer Science', date: '2024-06-01', total: 20, present: 18, absent: 2 },
    { id: 2, name: 'Advanced Mathematics', date: '2024-06-02', total: 22, present: 20, absent: 2 },
    // Add more classes here
  ];

  const calculateAttendancePercentage = (present, total) => {
    return (present / total) * 100;
  };

  const getTileClassName = ({ date, view }) => {
    if (view === 'month') {
      const dateString = date.toISOString().split('T')[0];
      return classNames({
        'present': attendance[dateString] === 'present',
        'absent': attendance[dateString] === 'absent',
        'holiday': attendance[dateString] === 'holiday',
      });
    }
  };

  const handleDateChange = (date) => {
    setSelectedDate(date);
  };

  const filteredClasses = classes.filter(
    (c) => new Date(c.date).toDateString() === selectedDate.toDateString()
  );

  return (
    <div className="min-h-screen bg-gray-100 p-4 md:p-8">
      <h1 className="text-2xl md:text-4xl font-bold text-gray-800 mb-4 md:mb-6">Attendance</h1>
      <div className="flex flex-col gap-4 md:gap-6">
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1 }}
          className="bg-white shadow-lg rounded-lg p-4 md:p-6 mb-4 md:mb-6"
        >
          <h2 className="text-xl md:text-2xl font-bold text-gray-800 mb-2 md:mb-4">Recent Attendance</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-2 md:gap-4">
            <div className="bg-green-100 p-4 rounded-lg flex items-center">
              <FontAwesomeIcon icon={faCheckCircle} className="text-green-500 text-2xl md:text-3xl mr-2 md:mr-4" />
              <div>
                <h3 className="text-lg md:text-xl font-bold text-gray-800">Classes Attended</h3>
                <ul>
                  {classes.filter(c => attendance[c.date] === 'present').map(c => (
                    <li key={c.id} className="text-gray-700">{c.name} - {c.date}</li>
                  ))}
                </ul>
              </div>
            </div>
            <div className="bg-red-100 p-4 rounded-lg flex items-center">
              <FontAwesomeIcon icon={faTimesCircle} className="text-red-500 text-2xl md:text-3xl mr-2 md:mr-4" />
              <div>
                <h3 className="text-lg md:text-xl font-bold text-gray-800">Classes Absent</h3>
                <ul>
                  {classes.filter(c => attendance[c.date] === 'absent').map(c => (
                    <li key={c.id} className="text-gray-700">{c.name} - {c.date}</li>
                  ))}
                </ul>
              </div>
            </div>
            <div className="bg-blue-100 p-4 rounded-lg flex items-center">
              <FontAwesomeIcon icon={faPercentage} className="text-blue-500 text-2xl md:text-3xl mr-2 md:mr-4" />
              <div>
                <h3 className="text-lg md:text-xl font-bold text-gray-800">Attendance Percentage</h3>
                <p className="text-gray-700">{calculateAttendancePercentage(38, 42).toFixed(2)}%</p>
              </div>
            </div>
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1 }}
          className="bg-white shadow-lg rounded-lg p-4 md:p-6 mb-4 md:mb-6"
        >
          <h2 className="text-xl md:text-2xl font-bold text-gray-800 mb-2 md:mb-4">Calendar</h2>
          <Calendar
            onChange={handleDateChange}
            value={selectedDate}
            tileClassName={getTileClassName}
            className="bg-white shadow-lg rounded-lg p-4"
          />
        </motion.div>

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1 }}
          className="bg-white shadow-lg rounded-lg p-4 md:p-6 mb-4 md:mb-6"
        >
          <h2 className="text-xl md:text-2xl font-bold text-gray-800 mb-2 md:mb-4">Classes on {selectedDate.toDateString()}</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-2 md:gap-4">
            {filteredClasses.map(c => (
              <div key={c.id} className="bg-gray-100 p-4 rounded-lg">
                <h3 className="text-lg md:text-xl font-bold">{c.name}</h3>
                <p className="text-gray-700">Total Classes: {c.total}</p>
                <p className="text-gray-700">Present: {c.present}</p>
                <p className="text-gray-700">Absent: {c.absent}</p>
              </div>
            ))}
            {filteredClasses.length === 0 && (
              <p className="text-gray-700">No classes found for this date.</p>
            )}
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1 }}
          className="bg-white shadow-lg rounded-lg p-4 md:p-6"
        >
          <h2 className="text-xl md:text-2xl font-bold text-gray-800 mb-2 md:mb-4">Class Attendance Summary</h2>
          <div className="overflow-x-auto">
            <table className="min-w-full bg-white">
              <thead className="bg-gray-200 text-gray-600 uppercase text-sm leading-normal">
                <tr>
                  <th className="py-3 px-6 text-left">Class</th>
                  <th className="py-3 px-6 text-left">Total Classes</th>
                  <th className="py-3 px-6 text-left">Present</th>
                  <th className="py-3 px-6 text-left">Absent</th>
                  <th className="py-3 px-6 text-left">Percentage</th>
                </tr>
              </thead>
              <tbody className="text-gray-600 text-sm font-light">
                {classes.map(c => (
                  <tr key={c.id} className="border-b border-gray-200 hover:bg-gray-100">
                    <td className="py-3 px-6 text-left">{c.name}</td>
                    <td className="py-3 px-6 text-left">{c.total}</td>
                    <td className="py-3 px-6 text-left">{c.present}</td>
                    <td className="py-3 px-6 text-left">{c.absent}</td>
                    <td className="py-3 px-6 text-left">{calculateAttendancePercentage(c.present, c.total).toFixed(2)}%</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default AttendancePage;
