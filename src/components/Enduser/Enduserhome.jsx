import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';

function Enduserhome() {
  const [tokens, setTokens] = useState([]);

  useEffect(() => {
    fetchTokens();
  }, []);

  const fetchTokens = async () => {
    try {
      const response = await axios.get('http://localhost:3002/tocken');
      setTokens(response.data);
    } catch (error) {
      console.error('Error fetching tokens:', error);
    }
  };

  
  const handleResolveToken = async (token) => {
    const newStatus = token.status === 'working' ? 'resolved' : 'working';
    try {
      await axios.put(`http://localhost:3002/tokens/${token.id}/status`, { status: newStatus });
      fetchTokens(); 
    } catch (error) {
      console.error('Error updating token status:', error);
    }
  };

  return (
    <div className="container mx-auto p-4">
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-2xl font-bold">Created Tokens</h2>
        <Link
          to="/create-token"
          className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded-md"
        >
          Create New Token
        </Link>
      </div>
      <div className="overflow-x-auto">
        <table className="min-w-full bg-white border border-gray-200">
          <thead className="bg-gray-100">
            <tr>
              <th className="px-6 py-3 border-b border-gray-200 text-left text-sm font-semibold text-gray-600 uppercase tracking-wider">
                Token ID
              </th>
              <th className="px-6 py-3 border-b border-gray-200 text-left text-sm font-semibold text-gray-600 uppercase tracking-wider">
                Token Name
              </th>
              <th className="px-6 py-3 border-b border-gray-200 text-left text-sm font-semibold text-gray-600 uppercase tracking-wider">
                Description
              </th>
              <th className="px-6 py-3 border-b border-gray-200 text-left text-sm font-semibold text-gray-600 uppercase tracking-wider">
                Created At
              </th>
              <th className="px-6 py-3 border-b border-gray-200 text-left text-sm font-semibold text-gray-600 uppercase tracking-wider">
                Status
              </th>
              <th className="px-6 py-3 border-b border-gray-200 text-left text-sm font-semibold text-gray-600 uppercase tracking-wider">
                Action
              </th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-200">
            {tokens.map((token) => (
              <tr key={token.id}>
                <td className="px-6 py-4 whitespace-nowrap">{token.id}</td>
                <td className="px-6 py-4 whitespace-nowrap">{token.tokenName}</td>
                <td className="px-6 py-4 whitespace-nowrap">{token.description}</td>
                <td className="px-6 py-4 whitespace-nowrap">{token.createdDate}</td>
                <td className="px-6 py-4 whitespace-nowrap">{token.status}</td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <button
                    onClick={() => handleResolveToken(token)}
                    className={`text-${token.status === 'working' ? 'blue' : 'green'}-600 hover:text-${token.status === 'working' ? 'blue' : 'green'}-700`}
                  >
                    {token.status === 'working' ? 'Close' : 'Reopen'}
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

export default Enduserhome;
