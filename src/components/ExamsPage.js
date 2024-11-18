import React, { useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBell, faCalendarAlt, faClock, faCheckCircle, faExclamationCircle } from '@fortawesome/free-solid-svg-icons';

const examsData = [
  {
    id: 1,
    course: 'Math 101',
    date: '2024-03-15',
    time: '10:00 AM - 12:00 PM',
    status: 'Upcoming',
    result: null,
  },
  {
    id: 2,
    course: 'Science 102',
    date: '2024-03-20',
    time: '2:00 PM - 4:00 PM',
    status: 'Upcoming',
    result: null,
  },
  {
    id: 3,
    course: 'History 201',
    date: '2023-12-15',
    time: '9:00 AM - 11:00 AM',
    status: 'Completed',
    result: 'A',
  },
  {
    id: 4,
    course: 'Art 101',
    date: '2023-12-20',
    time: '1:00 PM - 3:00 PM',
    status: 'Completed',
    result: 'B',
  },
];

const ExamsPage = () => {
  const [selectedTab, setSelectedTab] = useState('upcoming');

  const upcomingExams = examsData.filter((exam) => exam.status === 'Upcoming');
  const pastExams = examsData.filter((exam) => exam.status === 'Completed');

  return (
    <div className="min-h-screen bg-gray-100 p-4 md:p-8">
      <h1 className="text-4xl font-bold text-gray-800 mb-6">Exams Overview</h1>
      <div className="flex space-x-4 mb-6">
        <button
          className={`py-2 px-4 rounded ${selectedTab === 'upcoming' ? 'bg-blue-600 text-white' : 'bg-white text-gray-800'}`}
          onClick={() => setSelectedTab('upcoming')}
        >
          Upcoming Exams
        </button>
        <button
          className={`py-2 px-4 rounded ${selectedTab === 'past' ? 'bg-blue-600 text-white' : 'bg-white text-gray-800'}`}
          onClick={() => setSelectedTab('past')}
        >
          Past Exams
        </button>
      </div>

      {selectedTab === 'upcoming' && (
        <div className="bg-white rounded-lg shadow-md p-6 mb-6">
          <h2 className="text-2xl font-bold mb-4">Upcoming Exams</h2>
          <ul>
            {upcomingExams.map((exam) => (
              <li key={exam.id} className="py-4 border-b last:border-0 flex justify-between items-center">
                <div>
                  <h3 className="text-lg font-bold">{exam.course}</h3>
                  <p className="text-gray-600">
                    <FontAwesomeIcon icon={faCalendarAlt} className="mr-2" />
                    {exam.date}
                  </p>
                  <p className="text-gray-600">
                    <FontAwesomeIcon icon={faClock} className="mr-2" />
                    {exam.time}
                  </p>
                </div>
                <div>
                  <FontAwesomeIcon icon={faBell} className="text-yellow-500" />
                </div>
              </li>
            ))}
          </ul>
        </div>
      )}

      {selectedTab === 'past' && (
        <div className="bg-white rounded-lg shadow-md p-6 mb-6">
          <h2 className="text-2xl font-bold mb-4">Past Exams</h2>
          <ul>
            {pastExams.map((exam) => (
              <li key={exam.id} className="py-4 border-b last:border-0 flex justify-between items-center">
                <div>
                  <h3 className="text-lg font-bold">{exam.course}</h3>
                  <p className="text-gray-600">
                    <FontAwesomeIcon icon={faCalendarAlt} className="mr-2" />
                    {exam.date}
                  </p>
                  <p className="text-gray-600">
                    <FontAwesomeIcon icon={faClock} className="mr-2" />
                    {exam.time}
                  </p>
                </div>
                <div className={`text-${exam.result === 'A' ? 'green' : 'red'}-500`}>
                  <FontAwesomeIcon icon={exam.result === 'A' ? faCheckCircle : faExclamationCircle} />
                  <span className="ml-2">{exam.result}</span>
                </div>
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
};

export default ExamsPage;
