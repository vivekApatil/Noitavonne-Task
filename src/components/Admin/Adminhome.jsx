import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

const TABLE_HEAD = [
  { id: '_id', label: 'Ticket Id', alignRight: false },
  { id: 'ticket_title', label: 'Ticket Title', alignRight: false },
  { id: 'ticket_description', label: 'Ticket Description', alignRight: false },
  { id: 'created_at', label: 'Created At', alignRight: false },
  { id: 'status', label: 'Status', alignRight: false },
  { id: 'action', label: 'Action', alignRight: false },
];

const Adminhome = () => {

  const [tickets, setTickets] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    fetchTokens();
  }, []);

  const fetchTokens = async () => {
    try {
      const response = await axios.get('http://localhost:3002/tocken');
      setTickets(response.data);
    } catch (error) {
      console.error('Error fetching tokens:', error);
    }
  };

  const handleAction = async(item, action) => {
  
    console.log(`Action: ${action} on ticket ID: ${item.id}`);
    if (action === 'assign') {
      sessionStorage.setItem('tickets', JSON.stringify(item));
      navigate(`/techsupportallocation/${item.id}`);
    } else {
      try {
        const updatedTicket = { ...item, status: 'Resolved' }; 
        const response = await axios.put(`http://localhost:3002/tocken/${item.id}`, updatedTicket);
        fetchTokens();
        
      } catch (error) {
        console.error('Error updating ticket status:', error);
      }
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 py-6 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        <div className="overflow-hidden">
          <div className="flex flex-col">
            <div className="-my-2 overflow-x-auto sm:-mx-6 lg:-mx-8">
              <div className="py-2 align-middle inline-block min-w-full sm:px-6 lg:px-8">
                <div className="shadow overflow-hidden border-b border-gray-200 sm:rounded-lg">
                  <table className="min-w-full divide-y divide-gray-200">
                    <thead className="bg-gray-50">
                      <tr>
                        {TABLE_HEAD.map((headCell) => (
                          <th
                            key={headCell.id}
                            scope="col"
                            className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                          >
                            {headCell.label}
                          </th>
                        ))}
                      </tr>
                    </thead>
                    <tbody className="bg-white divide-y divide-gray-200">
                      {tickets.map((item, index) => (
                        <tr key={index}>
                          <td className="px-6 py-4 whitespace-nowrap">{item.id}</td>
                          <td className="px-6 py-4 whitespace-nowrap">{item.tokenName}</td>
                          <td className="px-6 py-4 whitespace-nowrap">{item.description}</td>
                          <td className="px-6 py-4 whitespace-nowrap">{item.createdDate}</td>
                          <td className="px-6 py-4 whitespace-nowrap">{item.status}</td>
                          <td className="px-6 py-4 whitespace-nowrap space-x-2">
                            <button
                              onClick={() => handleAction(item, 'assign')}
                              className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded-md"
                            >
                              Assign
                            </button>
                            <button
                              onClick={() => handleAction(item, 'resolve')}
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
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Adminhome;
