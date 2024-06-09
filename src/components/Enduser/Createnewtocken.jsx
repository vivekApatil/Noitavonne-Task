import React, { useState } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import { FiArrowLeft } from 'react-icons/fi';

function Createnewtocken() {
    const [formData, setFormData] = useState({
        tokenName: '',
        description: '',
        screenshot: null,
    });
    

    const [error, setError] = useState(null);
    const [success, setSuccess] = useState(null);

    const handleChange = (e) => {
        if (e.target.name === 'screenshot') {
            setFormData({
                ...formData,
                screenshot: e.target.files[0], 
            });
        } else {
            setFormData({
                ...formData,
                [e.target.name]: e.target.value
            });
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError(null); 
        setSuccess(null); 

        try {
            const response = await axios.post('http://localhost:3002/tocken', {
                tokenName: formData.tokenName,
                description: formData.description,
                screenshot: formData.screenshot,
                status: "working",
                createdDate: new Date().toISOString()
            });
            if (response.status === 201 || response.status === 200) {
                console.log('Registration successful!');
                setFormData({
                    tokenName: '',
                    description: '',
                    screenshot: null,
                });
            } else {
                console.error('Registration failed!');
            }
        } catch (error) {
            console.error('Error:', error);
        }
    };

    return (
        <div className="container mx-auto p-4">
            <div className="max-w-3xl mx-auto bg-white rounded-lg shadow-md p-6">
                <div className="flex items-center justify-between mb-4">
                    <div>
                        <h2 className="text-2xl font-bold">Create New Token</h2>
                    </div>
                    <div>
                        <Link to="/enduserhome" className="flex items-center text-blue-600 hover:text-blue-700">
                            <FiArrowLeft className="mr-1" /> Back
                        </Link>
                    </div>
                </div>
                {error && (
                    <div className="mb-4 text-red-500 bg-red-100 border border-red-400 px-4 py-3 rounded relative" role="alert">
                        <span className="block sm:inline">{error}</span>
                    </div>
                )}
                {success && (
                    <div className="mb-4 text-green-500 bg-green-100 border border-green-400 px-4 py-3 rounded relative" role="alert">
                        <span className="block sm:inline">{success}</span>
                    </div>
                )}
                <form onSubmit={handleSubmit}>
                    <div className="mb-4">
                        <label htmlFor="tokenName" className="block text-sm font-medium text-gray-600">Token Name</label>
                        <input
                            type="text"
                            id="tokenName"
                            name="tokenName"
                            value={formData.tokenName}
                            onChange={handleChange}
                            className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-600"
                            required
                        />
                    </div>
                    <div className="mb-4">
                        <label htmlFor="description" className="block text-sm font-medium text-gray-600">Description</label>
                        <textarea
                            id="description"
                            name="description"
                            value={formData.description}
                            onChange={handleChange}
                            className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-600"
                            rows={4}
                            required
                        />
                    </div>
                    <div className="mb-4">
                        <label htmlFor="screenshot" className="block text-sm font-medium text-gray-600">Screenshot</label>
                        <input
                            type="file"
                            id="screenshot"
                            name="screenshot"
                            onChange={handleChange}
                            accept="image/*" 
                            className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-600"
                            required
                        />
                    </div>
                    <div className="mt-6">
                        <button
                            type="submit"
                            className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-600"
                        >
                            Create Token
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
}

export default Createnewtocken;
