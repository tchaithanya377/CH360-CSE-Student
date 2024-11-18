import React, { useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPlusCircle, faCheckCircle, faTimesCircle, faSpinner, faFilter, faSearch } from '@fortawesome/free-solid-svg-icons';

const RequestPage = () => {
  const [requests, setRequests] = useState([
    { id: 1, type: 'Transcript Request', status: 'Pending', details: 'Requesting academic transcript for job application.', priority: 'High', documents: [] },
    { id: 2, type: 'Class Material', status: 'Approved', details: 'Need lecture notes for missed classes.', priority: 'Medium', documents: [] },
  ]);
  const [newRequest, setNewRequest] = useState({ type: '', details: '', priority: 'Medium', documents: [] });
  const [isAdding, setIsAdding] = useState(false);
  const [filterStatus, setFilterStatus] = useState('All');
  const [searchTerm, setSearchTerm] = useState('');

  const requestTypes = [
    'Transcript Request',
      'No Dues',
    'Class Material Request',
    'Schedule Adjustment Request',
    'Exam Re-evaluation Request',
    'Leave of Absence Request',
    'Scholarship Application Request',
    'Internship/Placement Request',
    'Extra-curricular Activity Request',
    'Library Access Request',
    'Change of Major/Minor Request',
    'Financial Aid Request',
    'Complaint/Grievance Request',
    'Health and Wellness Support Request',
    'IT Support Request',
  ];

  const handleAddRequest = () => {
    setRequests([...requests, { id: requests.length + 1, ...newRequest, status: 'Pending' }]);
    setNewRequest({ type: '', details: '', priority: 'Medium', documents: [] });
    setIsAdding(false);
  };

  const handleFileUpload = (e) => {
    setNewRequest({ ...newRequest, documents: [...newRequest.documents, ...e.target.files] });
  };

  const filteredRequests = requests.filter(request => {
    return (filterStatus === 'All' || request.status === filterStatus) && 
           (request.type.toLowerCase().includes(searchTerm.toLowerCase()) || request.details.toLowerCase().includes(searchTerm.toLowerCase()));
  });

  return (
    <div className="min-h-screen bg-gray-100 p-4 md:p-8">
      <h1 className="text-4xl font-bold text-gray-800 mb-6">Student Requests</h1>

      <div className="bg-white rounded-lg shadow-md p-6 mb-6">
        <h2 className="text-2xl font-bold mb-4">Submit a New Request</h2>
        {isAdding ? (
          <div className="space-y-4">
            <select 
              value={newRequest.type} 
              onChange={(e) => setNewRequest({ ...newRequest, type: e.target.value })} 
              className="w-full py-2 px-4 rounded bg-gray-200"
            >
              <option value="">Select Request Type</option>
              {requestTypes.map((type, index) => (
                <option key={index} value={type}>{type}</option>
              ))}
            </select>
            <textarea 
              value={newRequest.details} 
              onChange={(e) => setNewRequest({ ...newRequest, details: e.target.value })} 
              placeholder="Request Details" 
              className="w-full py-2 px-4 rounded bg-gray-200"
            />
            <div>
              <label className="block text-gray-700">Priority:</label>
              <select 
                value={newRequest.priority} 
                onChange={(e) => setNewRequest({ ...newRequest, priority: e.target.value })} 
                className="w-full py-2 px-4 rounded bg-gray-200"
              >
                <option value="High">High</option>
                <option value="Medium">Medium</option>
                <option value="Low">Low</option>
              </select>
            </div>
            <div>
              <label className="block text-gray-700">Upload Documents:</label>
              <input 
                type="file" 
                multiple 
                onChange={handleFileUpload} 
                className="w-full py-2 px-4 rounded bg-gray-200"
              />
            </div>
            <div className="flex space-x-4">
              <button 
                onClick={handleAddRequest} 
                className="bg-green-600 text-white py-2 px-4 rounded shadow-md hover:bg-green-700"
              >
                Add Request
              </button>
              <button 
                onClick={() => setIsAdding(false)} 
                className="bg-red-600 text-white py-2 px-4 rounded shadow-md hover:bg-red-700"
              >
                Cancel
              </button>
            </div>
          </div>
        ) : (
          <button 
            onClick={() => setIsAdding(true)} 
            className="bg-blue-600 text-white py-2 px-4 rounded shadow-md hover:bg-blue-700 flex items-center"
          >
            <FontAwesomeIcon icon={faPlusCircle} className="mr-2" />
            New Request
          </button>
        )}
      </div>

      <div className="bg-white rounded-lg shadow-md p-6 mb-6">
        <h2 className="text-2xl font-bold mb-4">Filter and Search Requests</h2>
        <div className="flex space-x-4 mb-4">
          <div className="relative">
            <select 
              value={filterStatus} 
              onChange={(e) => setFilterStatus(e.target.value)} 
              className="w-full py-2 px-4 rounded bg-gray-200"
            >
              <option value="All">All</option>
              <option value="Pending">Pending</option>
              <option value="Approved">Approved</option>
              <option value="Rejected">Rejected</option>
            </select>
            <FontAwesomeIcon icon={faFilter} className="absolute right-2 top-3 text-gray-600" />
          </div>
          <div className="relative">
            <input 
              type="text" 
              placeholder="Search requests..." 
              value={searchTerm} 
              onChange={(e) => setSearchTerm(e.target.value)} 
              className="w-full py-2 px-4 rounded bg-gray-200"
            />
            <FontAwesomeIcon icon={faSearch} className="absolute right-2 top-3 text-gray-600" />
          </div>
        </div>
      </div>

      <div className="bg-white rounded-lg shadow-md p-6 mb-6">
        <h2 className="text-2xl font-bold mb-4">Pending Requests</h2>
        <ul>
          {filteredRequests.filter(request => request.status === 'Pending').map(request => (
            <li key={request.id} className="border-b py-4">
              <h3 className="text-xl font-bold">{request.type}</h3>
              <p className="text-gray-600">{request.details}</p>
              <div className="mt-2 flex items-center space-x-2">
                <FontAwesomeIcon icon={faSpinner} className="text-yellow-500" />
                <span className="text-yellow-500">Pending</span>
              </div>
            </li>
          ))}
        </ul>
      </div>

      <div className="bg-white rounded-lg shadow-md p-6 mb-6">
        <h2 className="text-2xl font-bold mb-4">Approved Requests</h2>
        <ul>
          {filteredRequests.filter(request => request.status === 'Approved').map(request => (
            <li key={request.id} className="border-b py-4">
              <h3 className="text-xl font-bold">{request.type}</h3>
              <p className="text-gray-600">{request.details}</p>
              <div className="mt-2 flex items-center space-x-2">
                <FontAwesomeIcon icon={faCheckCircle} className="text-green-500" />
                <span className="text-green-500">Approved</span>
              </div>
            </li>
          ))}
        </ul>
      </div>

      <div className="bg-white rounded-lg shadow-md p-6">
        <h2 className="text-2xl font-bold mb-4">Rejected Requests</h2>
        <ul>
          {filteredRequests.filter(request => request.status === 'Rejected').map(request => (
                       <li key={request.id} className="border-b py-4">
                       <h3 className="text-xl font-bold">{request.type}</h3>
                       <p className="text-gray-600">{request.details}</p>
                       <div className="mt-2 flex items-center space-x-2">
                         <FontAwesomeIcon icon={faTimesCircle} className="text-red-500" />
                         <span className="text-red-500">Rejected</span>
                       </div>
                     </li>
                   ))}
                 </ul>
               </div>
             </div>
           );
         };
         
         export default RequestPage;
         