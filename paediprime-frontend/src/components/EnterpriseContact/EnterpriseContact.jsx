import React, { useState } from 'react';

export default function EnterpriseContact({ onClose }) {
    const [enterpriseName, setEnterpriseName] = useState('');
    const [contactNumber, setContactNumber] = useState('');
    const [details, setDetails] = useState('');

    const handleSubmit = (e) => {
        e.preventDefault();
        // Construct email body
        const emailBody = `Enterprise Name: ${enterpriseName}\nContact Number: ${contactNumber}\nDetails: ${details}`;

        // Construct mailto link
        const mailtoLink = `mailto:amitmandhana1@gmail.com,sekekamapal@gmail.com?subject=Enterprise Contact&body=${encodeURIComponent(emailBody)}`;

        // Open default email client with mailto link
        window.location.href = mailtoLink;

        onClose();
    };

    return (
        <div className="fixed inset-0 bg-gray-600 bg-opacity-50 flex justify-center items-center">
            <div className="bg-white p-6 rounded shadow-lg">
                <h2 className="text-xl mb-4">Contact Us (Enterprise)</h2>
                <form onSubmit={handleSubmit}>
                    <div className="mb-4">
                        <label className="block text-gray-700">Enterprise Name</label>
                        <input 
                            type="text" 
                            value={enterpriseName} 
                            onChange={(e) => setEnterpriseName(e.target.value)} 
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
                        <label className="block text-gray-700">Details</label>
                        <textarea
                            value={details}
                            onChange={(e) => setDetails(e.target.value)}
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
