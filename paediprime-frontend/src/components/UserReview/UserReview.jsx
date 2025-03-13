import React, { useState } from 'react';

export default function UserReview({ onClose }) {
    const [userName, setUserName] = useState('');
    const [contactNumber, setContactNumber] = useState('');
    const [message, setMessage] = useState('');

    const handleSubmit = (e) => {
        e.preventDefault();
        const mailtoLink = `mailto:amitmandhana1@gmail.com,sekekamapal@gmail.com?subject=User Review&body=User Name: ${userName}%0AContact Number: ${contactNumber}%0AMessage: ${message}`;
        window.location.href = mailtoLink;
        onClose();
    };
    

    return (
        <div className="fixed inset-0 bg-gray-600 bg-opacity-50 flex justify-center items-center">
            <div className="bg-white p-6 rounded shadow-lg">
                <h2 className="text-xl mb-4">Submit a Review or Complaint</h2>
                <form onSubmit={handleSubmit}>
                    <div className="mb-4">
                        <label className="block text-gray-700">User Name</label>
                        <input 
                            type="text" 
                            value={userName} 
                            onChange={(e) => setUserName(e.target.value)} 
                            className="w-full px-3 py-2 border rounded" 
                            required 
                        />
                    </div>
                    <div className="mb-4">
                        <label className="block text-gray-700">Contact Number</label>
                        <input 
                            type="tel" 
                            value={contactNumber} 
                            onChange={(e) => setContactNumber(e.target.value)} 
                            className="w-full px-3 py-2 border rounded" 
                            required 
                        />
                    </div>
                    <div className="mb-4">
                        <label className="block text-gray-700">Message</label>
                        <textarea
                            value={message}
                            onChange={(e) => setMessage(e.target.value)}
                            className="w-full px-3 py-2 border rounded"
                            rows="5"
                            required
                        ></textarea>
                    </div>
                    <div className="flex justify-end">
                        <button 
                            type="button" 
                            onClick={onClose} 
                            className="bg-gray-500 hover:bg-gray-700 text-white font-bold py-2 px-4 rounded mr-2"
                        >
                            Cancel
                        </button>
                        <button 
                            type="submit" 
                            className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
                        >
                            Submit
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
}
