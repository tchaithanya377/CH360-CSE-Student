import React, { useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUser, faBook, faCalendarAlt, faClipboardList, faFileAlt, faBell, faCommentDots } from '@fortawesome/free-solid-svg-icons';
import { useParams } from 'react-router-dom';

const coursesData = [
  {
    id: 1,
    name: 'Introduction to Computer Science',
    description: 'Learn the basics of computer science and programming.',
    instructor: 'Dr. John Doe',
    credits: 3,
    schedule: 'Mon-Wed-Fri 10:00 AM - 11:00 AM',
    syllabus: 'Introduction to programming, basic algorithms, and data structures...',
    materials: ['Algebra Textbook', 'Online Resources'],
    assignments: [
      { title: 'Assignment 1', dueDate: '2023-09-15', description: 'Introduction to Algorithms' },
      { title: 'Assignment 2', dueDate: '2023-10-01', description: 'Data Structures' },
    ],
    exams: [
      { title: 'Midterm Exam', date: '2023-10-15', description: 'Covering chapters 1-5' },
      { title: 'Final Exam', date: '2023-12-15', description: 'Comprehensive exam' },
    ],
  },
  {
    id: 2,
    name: 'Advanced Mathematics',
    description: 'Explore advanced topics in mathematics.',
    instructor: 'Prof. Jane Smith',
    credits: 4,
    schedule: 'Tue-Thu 1:00 PM - 3:00 PM',
    syllabus: 'Advanced calculus, differential equations...',
    materials: ['Calculus Textbook', 'Online Lectures'],
    assignments: [
      { title: 'Assignment 1', dueDate: '2023-09-20', description: 'Differential Equations' },
      { title: 'Assignment 2', dueDate: '2023-10-10', description: 'Integral Calculus' },
    ],
    exams: [
      { title: 'Midterm Exam', date: '2023-10-20', description: 'Covering chapters 1-6' },
      { title: 'Final Exam', date: '2023-12-20', description: 'Comprehensive exam' },
    ],
  },
  // Add more course objects here
];

const CourseDetails = () => {
  const { id } = useParams();
  const course = coursesData.find(course => course.id === parseInt(id));
  const [chatOpen, setChatOpen] = useState(false);
  const [messages, setMessages] = useState([]);
  const [newMessage, setNewMessage] = useState('');

  if (!course) {
    return <div className="p-6 bg-white rounded-lg shadow-md">Course not found.</div>;
  }

  const handleSendMessage = () => {
    if (newMessage.trim()) {
      setMessages([...messages, { text: newMessage, sender: 'You' }]);
      setNewMessage('');
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 p-8">
      <div className="bg-white p-6 rounded-lg shadow-lg mb-8">
        <h2 className="text-4xl font-bold mb-4 text-gray-800">{course.name}</h2>
        <p className="text-lg text-gray-700 mb-4">{course.description}</p>
        <div className="mb-4">
          <h3 className="text-xl font-bold text-gray-800">
            <FontAwesomeIcon icon={faUser} className="mr-2" /> Instructor
          </h3>
          <p className="text-gray-600">{course.instructor}</p>
        </div>
        <div className="mb-4">
          <h3 className="text-xl font-bold text-gray-800">
            <FontAwesomeIcon icon={faBook} className="mr-2" /> Credits
          </h3>
          <p className="text-gray-600">{course.credits}</p>
        </div>
        <div className="mb-4">
          <h3 className="text-xl font-bold text-gray-800">
            <FontAwesomeIcon icon={faCalendarAlt} className="mr-2" /> Schedule
          </h3>
          <p className="text-gray-600">{course.schedule}</p>
        </div>
        <div className="mb-4">
          <h3 className="text-xl font-bold text-gray-800">
            <FontAwesomeIcon icon={faClipboardList} className="mr-2" /> Syllabus
          </h3>
          <p className="text-gray-600">{course.syllabus}</p>
        </div>
        <div className="mb-4">
          <h3 className="text-xl font-bold text-gray-800">
            <FontAwesomeIcon icon={faBook} className="mr-2" /> Materials
          </h3>
          <ul className="list-disc pl-5 text-gray-600">
            {course.materials.map((material, index) => (
              <li key={index}>{material}</li>
            ))}
          </ul>
        </div>
        <div className="mb-4">
          <h3 className="text-xl font-bold text-gray-800">
            <FontAwesomeIcon icon={faFileAlt} className="mr-2" /> Assignments
          </h3>
          <ul className="list-disc pl-5 text-gray-600">
            {course.assignments.map((assignment, index) => (
              <li key={index}>
                <strong>{assignment.title}</strong>: {assignment.description} (Due: {assignment.dueDate})
              </li>
            ))}
          </ul>
        </div>
        <div className="mb-4">
          <h3 className="text-xl font-bold text-gray-800">
            <FontAwesomeIcon icon={faFileAlt} className="mr-2" /> Exams
          </h3>
          <ul className="list-disc pl-5 text-gray-600">
            {course.exams.map((exam, index) => (
              <li key={index}>
                <strong>{exam.title}</strong>: {exam.description} (Date: {exam.date})
              </li>
            ))}
          </ul>
        </div>
        <div className="mb-4">
          <h3 className="text-xl font-bold text-gray-800">
            <FontAwesomeIcon icon={faBell} className="mr-2" /> Reminders
          </h3>
          <p className="text-gray-600">You will receive reminders for upcoming assignments and exams.</p>
        </div>
        <div className="mb-4">
          <h3 className="text-xl font-bold text-gray-800">
            <FontAwesomeIcon icon={faClipboardList} className="mr-2" /> Progress Tracker
          </h3>
          <p className="text-gray-600">Track your progress on assignments and exams.</p>
        </div>
      </div>

      <div className="fixed bottom-4 right-4">
        <button
          className="bg-blue-600 text-white p-4 rounded-full shadow-lg focus:outline-none"
          onClick={() => setChatOpen(!chatOpen)}
        >
          <FontAwesomeIcon icon={faCommentDots} size="lg" />
        </button>
        {chatOpen && (
          <div className="bg-white rounded-lg shadow-lg p-4 mt-2">
            <h3 className="text-lg font-bold mb-2">Send a Message to Instructor</h3>
            <div className="h-48 overflow-y-auto mb-4">
              {messages.map((msg, index) => (
                <div key={index} className={`flex ${msg.sender === 'You' ? 'justify-end' : 'justify-start'} mb-2`}>
                  <div className={`bg-${msg.sender === 'You' ? 'blue' : 'gray'}-200 p-2 rounded-lg`}>
                    <span className="font-bold">{msg.sender}</span>: {msg.text}
                  </div>
                </div>
              ))}
            </div>
            <div className="flex items-center border-t border-gray-300 pt-2">
              <input
                type="text"
                className="w-full p-2 rounded-lg border border-gray-300 focus:outline-none"
                placeholder="Type your message here..."
                value={newMessage}
                onChange={(e) => setNewMessage(e.target.value)}
              />
              <button className="bg-blue-600 text-white p-2 rounded-full ml-2" onClick={handleSendMessage}>
                Send
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default CourseDetails;
