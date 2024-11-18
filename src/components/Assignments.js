import React from 'react';

const Assignments = () => {
  const assignments = [
    { id: 1, title: 'Homework 1', dueDate: '2024-03-10', status: 'Submitted' },
    { id: 2, title: 'Project 1', dueDate: '2024-03-15', status: 'Pending' },
  ];

  return (
    <div className="p-6 bg-white rounded-lg shadow-md">
      <h2 className="text-2xl font-bold mb-4">Assignments</h2>
      <ul>
        {assignments.map(assignment => (
          <li key={assignment.id} className="mb-4">
            <h3 className="text-xl font-bold">{assignment.title}</h3>
            <p>Due Date: {assignment.dueDate}</p>
            <p>Status: {assignment.status}</p>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Assignments;
