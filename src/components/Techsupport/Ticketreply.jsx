import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { FiArrowLeft } from 'react-icons/fi';

function TicketReply() {
  const [formData, setFormData] = useState({
    ticketId: '',
    reply: '',
  });

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log(formData);
    
  };

  return (
    <div className="container mx-auto p-4">
      <div className="max-w-2xl mx-auto bg-white rounded-lg shadow-md p-6">
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-2xl font-bold">Ticket Reply</h2>
          <Link to="/techsupporthome" className="flex items-center text-blue-600 hover:text-blue-700">
            <FiArrowLeft className="mr-1" /> Back
          </Link>
        </div>
        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label htmlFor="ticketId" className="block text-sm font-medium text-gray-700">Ticket ID</label>
            <input
              type="text"
              id="ticketId"
              name="ticketId"
              value={formData.ticketId}
              onChange={handleChange}
              className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
              required
            />
          </div>
          <div className="mb-4">
            <label htmlFor="reply" className="block text-sm font-medium text-gray-700">Reply</label>
            <textarea
              id="reply"
              name="reply"
              value={formData.reply}
              onChange={handleChange}
              rows={4}
              className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
              required
            />
          </div>
          <div className="mt-6">
            <button
              type="submit"
              className="w-full px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              Submit Reply
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default TicketReply;
