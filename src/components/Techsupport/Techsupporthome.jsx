import React, { useState, useEffect, useContext } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';


function Techsupporthome() {
  const [tickets, setTickets] = useState([]);
  const navigate = useNavigate();
  

    useEffect(() => {
      const storedUser = JSON.parse(sessionStorage.getItem('user'));

    if(storedUser){
    
      fetchTickets(storedUser.email);
    }
  }, []);

  const fetchTickets = async (email) => {
  
    try {
      const response = await axios.get('http://localhost:3002/TechSupport-Task');
      const filteredTickets = response.data.filter(ticket => ticket.techSupport === email);
      setTickets(filteredTickets);
    } catch (error) {
      console.error('Error fetching tickets:', error);
    }
  };

  const handleAction = async(ticket, action) => {
    

    if (action === 'reply') {
      navigate(`/ticketreply/${ticket.id}`);
    } else {
      try {
        const updatedTicket = { ...ticket, status: 'Resolved' }; 
        const response = await axios.put(`http://localhost:3002/TechSupport-Task/${ticket.id}`, updatedTicket);
        fetchTickets();
        
      } catch (error) {
        console.error('Error updating ticket status:', error);
      }
    }
  };

  return (
    <div className="container mx-auto p-4">
      <h2 className="text-2xl font-bold mb-4">Assigned Tickets</h2>
      <div className="overflow-x-auto">
        <table className="min-w-full bg-white border border-gray-200">
          <thead className="bg-gray-100">
            <tr>
              <th className="px-6 py-3 border-b border-gray-200 text-left text-sm font-semibold text-gray-600 uppercase tracking-wider">ID</th>
              <th className="px-6 py-3 border-b border-gray-200 text-left text-sm font-semibold text-gray-600 uppercase tracking-wider">Title</th>
              <th className="px-6 py-3 border-b border-gray-200 text-left text-sm font-semibold text-gray-600 uppercase tracking-wider">Description</th>
              <th className="px-6 py-3 border-b border-gray-200 text-left text-sm font-semibold text-gray-600 uppercase tracking-wider">Created Date</th>
              <th className="px-6 py-3 border-b border-gray-200 text-left text-sm font-semibold text-gray-600 uppercase tracking-wider">Status</th>
              <th className="px-6 py-3 border-b border-gray-200 text-left text-sm font-semibold text-gray-600 uppercase tracking-wider">Action</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-200">
            {tickets.map((ticket) => (
              <tr key={ticket.id}>
                <td className="px-6 py-4 whitespace-nowrap">{ticket.id}</td>
                <td className="px-6 py-4 whitespace-nowrap">{ticket.tokenName}</td>
                <td className="px-6 py-4 whitespace-nowrap">{ticket.description}</td>
                <td className="px-6 py-4 whitespace-nowrap">{ticket.createdDate}</td>
                <td className="px-6 py-4 whitespace-nowrap">{ticket.status}</td>
                <td className="px-6 py-4 whitespace-nowrap space-x-2">
                  <button
                    onClick={() => handleAction(ticket, 'reply')}
                    className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded-md"
                  >
                    Reply
                  </button>
                  <button
                    onClick={() => handleAction(ticket, 'resolve')}
                    className="bg-green-500 hover:bg-green-600 text-white px-4 py-2 rounded-md"
                  >
                    Resolve
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default Techsupporthome;
