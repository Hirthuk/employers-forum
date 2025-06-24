import React, { useState } from 'react'
import NavBar from '../components/NavBar'
import { toast } from 'react-toastify';

const Appreciate = () => {
  const [sapid, setSapId] = useState('');
  const [message, setMessage] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    // You can add your submit logic here
    setSapId('');
    setMessage('');
    toast.success("Appreciation sent successfully")
  };

  return (
    <div className='flex flex-col gap-10 mt-10 min-h-screen bg-gradient-to-br to-blue-100'>
      <NavBar />
      <div className="w-full max-w-lg mx-auto bg-gradient-to-l via-violet-100 rounded-2xl shadow-lg p-8 flex flex-col gap-6 ">
        <h2 className="text-2xl font-bold text-center text-purple-700 mb-2">Send Appreciation</h2>
        <form onSubmit={handleSubmit} className="flex flex-col gap-5">
          <div>
            <label htmlFor="sapid" className="block text-gray-700 font-medium mb-1">
              SAP ID
            </label>
            <input
              id="sapid"
              type="text"
              value={sapid}
              onChange={e => setSapId(e.target.value)}
              className="w-full px-4 py-2 border border-purple-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-400 transition"
              placeholder="Enter SAP ID"
              required
            />
          </div>
          <div>
            <label htmlFor="message" className="block text-gray-700 font-medium mb-1">
              Appreciation Message
            </label>
            <textarea
              id="message"
              value={message}
              onChange={e => setMessage(e.target.value)}
              className="w-full px-4 py-2 border border-purple-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-400 transition resize-none"
              placeholder="Write your appreciation message..."
              rows={4}
              required
            />
          </div>
          <button
            type="submit"
            className="w-full bg-gradient-to-r from-purple-500 to-blue-500 text-white font-semibold py-2 rounded-lg shadow-md hover:from-purple-600 hover:to-blue-600 transition"
          >
            Send
          </button>
        </form>
      </div>
    </div>
  )
}

export default Appreciate
