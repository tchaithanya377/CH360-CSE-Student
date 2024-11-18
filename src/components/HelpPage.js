import React, { useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEnvelope, faPhone, faCommentDots, faSearch } from '@fortawesome/free-solid-svg-icons';

const HelpPage = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const faqs = [
    { question: 'How do I reset my password?', answer: 'To reset your password, go to the login page and click on "Forgot Password". Follow the instructions sent to your email.' },
    { question: 'How can I contact support?', answer: 'You can contact support via email at support@campushub360.com, or call us at 1800 123 4567.' },
    { question: 'Where can I find the user guide?', answer: 'The user guide can be found in the Guides and Tutorials section below.' },
    // Add more FAQs here
  ];

  const guides = [
    { title: 'Getting Started with CampusHub360', link: '#' },
    { title: 'How to Enroll in Courses', link: '#' },
    { title: 'Understanding Your Dashboard', link: '#' },
    // Add more guides here
  ];

  const filteredFaqs = faqs.filter(faq => 
    faq.question.toLowerCase().includes(searchTerm.toLowerCase()) || 
    faq.answer.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="min-h-screen bg-gray-100 p-4 md:p-8">
      <h1 className="text-4xl font-bold text-gray-800 mb-6">Help Center</h1>
      <div className="mb-6">
        <div className="relative">
          <input 
            type="text" 
            placeholder="Search for help topics..." 
            value={searchTerm} 
            onChange={(e) => setSearchTerm(e.target.value)} 
            className="w-full py-2 px-4 rounded bg-white border border-gray-300"
          />
          <FontAwesomeIcon icon={faSearch} className="absolute right-2 top-3 text-gray-600" />
        </div>
      </div>
      
      <div className="bg-white rounded-lg shadow-md p-6 mb-6">
        <h2 className="text-2xl font-bold mb-4">Frequently Asked Questions</h2>
        <ul>
          {filteredFaqs.map((faq, index) => (
            <li key={index} className="border-b py-4">
              <h3 className="text-xl font-bold">{faq.question}</h3>
              <p className="text-gray-600">{faq.answer}</p>
            </li>
          ))}
        </ul>
      </div>

      <div className="bg-white rounded-lg shadow-md p-6 mb-6">
        <h2 className="text-2xl font-bold mb-4">Guides and Tutorials</h2>
        <ul>
          {guides.map((guide, index) => (
            <li key={index} className="py-4 border-b">
              <a href={guide.link} className="text-blue-600 hover:underline">{guide.title}</a>
            </li>
          ))}
        </ul>
      </div>

      <div className="bg-white rounded-lg shadow-md p-6 mb-6">
        <h2 className="text-2xl font-bold mb-4">Contact Support</h2>
        <p className="text-gray-600 mb-4">If you need further assistance, please contact our support team.</p>
        <div className="space-y-4">
          <div className="flex items-center space-x-2">
            <FontAwesomeIcon icon={faEnvelope} className="text-gray-600" />
            <span>support@campushub360.com</span>
          </div>
          <div className="flex items-center space-x-2">
            <FontAwesomeIcon icon={faPhone} className="text-gray-600" />
            <span>1800 123 4567</span>
          </div>
          <div className="flex items-center space-x-2">
            <FontAwesomeIcon icon={faCommentDots} className="text-gray-600" />
            <span>Live Chat (Available 24/7)</span>
          </div>
        </div>
      </div>

      <div className="bg-white rounded-lg shadow-md p-6 mb-6">
        <h2 className="text-2xl font-bold mb-4">Submit a Ticket</h2>
        <form>
          <div className="mb-4">
            <label className="block text-gray-700">Your Email</label>
            <input 
              type="email" 
              className="w-full p-2 rounded bg-gray-200 border border-gray-300" 
              required 
            />
          </div>
          <div className="mb-4">
            <label className="block text-gray-700">Issue</label>
            <input 
              type="text" 
              className="w-full p-2 rounded bg-gray-200 border border-gray-300" 
              required 
            />
          </div>
          <div className="mb-4">
            <label className="block text-gray-700">Description</label>
            <textarea 
              className="w-full p-2 rounded bg-gray-200 border border-gray-300" 
              rows="4" 
              required 
            ></textarea>
          </div>
          <button className="bg-blue-600 text-white py-2 px-4 rounded shadow-md hover:bg-blue-700">
            Submit
          </button>
        </form>
      </div>

      <div className="bg-white rounded-lg shadow-md p-6">
        <h2 className="text-2xl font-bold mb-4">Platform Status</h2>
        <p className="text-gray-600">All systems are operational. No issues reported at this time.</p>
      </div>
    </div>
  );
};

export default HelpPage;
