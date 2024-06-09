import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

function TechSupportAllocation() {
  const [techSupports, setTechSupports] = useState([]);
  const [tickets, setTickets] = useState([JSON.parse(sessionStorage.getItem('tickets'))]);
  const [selectedTicket, setSelectedTicket] = useState(null);
  const navigate = useNavigate();
  


  useEffect(() => {
    fetchTechSupports();
  }, [tickets]);


  const fetchTechSupports = async () => {
    try {
      const response = await axios.get('http://localhost:3002/user');
      const techSupportUsers = response.data.filter(user => user.userType === 'techSupport');
      setTechSupports(techSupportUsers);
    } catch (error) {
      console.error('Error fetching tech supports:', error);
    }
  };

  const handleAssign = async (techSupport) => {

    try {
      await axios.post(`http://localhost:3002/TechSupport-Task`, {
        id: tickets[0].id,
      tokenName: tickets[0].tokenName,
      description: tickets[0].description,
      status: tickets[0].status,
      createdDate: tickets[0].createdDate,
      techSupport:techSupport.email
      });
      navigate('/adminhome');
    } catch (error) {
      console.error('Error assigning tech support:', error);
    }
  };

  return (
    <div className="container mx-auto p-4">
      <button
        onClick={() => navigate(-1)}
        className="mb-4 px-4 py-2  bg-gray-300 text-gray-800 rounded-md hover:bg-gray-400"
      >
        Back
      </button>
      <h2 className="text-2xl font-bold mb-4">Tech Support Allocation</h2>

      <div className="mb-6">
        <h3 className="text-xl font-semibold mb-2">Tickets</h3>
        <table className="w-full table-auto border-collapse bg-white shadow-md rounded-md">
          <thead>
            <tr className="bg-gray-200">
              <th className="border px-4 py-2">ID</th>
              <th className="border px-4 py-2">Title</th>
              <th className="border px-4 py-2">Description</th>
              <th className="border px-4 py-2">Status</th>
            </tr>
          </thead>
          <tbody>
            {tickets.length > 0  ? (
              tickets.map((ticket,index) => (
                <tr
                  key={index}>
                  <td className="border px-4 py-2 text-center">{ticket.id}</td>
                  <td className="border px-4 py-2 text-center">{ticket.tokenName}</td>
                  <td className="border px-4 py-2 text-center">{ticket.description}</td>
                  <td className="border px-4 py-2 text-center">{ticket.status}</td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="4" className="border px-4 py-2 text-center">
                  No tickets available
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

      {selectedTicket && (
        <div className="mb-6 p-4 bg-white shadow-md rounded-md">
          <h3 className="text-xl font-semibold mb-2">Selected Ticket</h3>
          <p><strong>ID:</strong> {selectedTicket.id}</p>
          <p><strong>Title:</strong> {selectedTicket.tokenName}</p>
          <p><strong>Description:</strong> {selectedTicket.description}</p>
          <p><strong>Status:</strong> {selectedTicket.status}</p>
        </div>
      )}

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {techSupports.map((techSupport) => (
          <div key={techSupport.id} className="p-4 bg-white shadow-md rounded-md">
            <h3 className="text-lg font-semibold mb-2">{techSupport.username}</h3>
            <p><strong>Id:</strong> {techSupport.id}</p>
            <button
              onClick={() => handleAssign(techSupport)}
              className="mt-2 px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700"
            >
              Allocate
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}

export default TechSupportAllocation;
