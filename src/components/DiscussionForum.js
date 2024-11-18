import React from 'react';

const DiscussionForum = () => {
  const discussions = [
    { id: 1, topic: 'Algebra Homework Discussion', author: 'John Doe', date: '2024-03-01', comments: 5 },
  ];

  return (
    <div className="p-6 bg-white rounded-lg shadow-md">
      <h2 className="text-2xl font-bold mb-4">Discussion Forum</h2>
      <ul>
        {discussions.map(discussion => (
          <li key={discussion.id} className="mb-4">
            <h3 className="text-xl font-bold">{discussion.topic}</h3>
            <p>Started by: {discussion.author}</p>
            <p>Date: {discussion.date}</p>
            <p>Comments: {discussion.comments}</p>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default DiscussionForum;
