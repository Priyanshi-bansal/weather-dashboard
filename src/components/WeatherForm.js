import React, { useState } from 'react';
const WeatherForm = ({ onSubmit }) => {
  const [latitude, setLatitude] = useState('');
  const [longitude, setLongitude] = useState('');
  const [startDate, setStartDate] = useState('');
  const [endDate, setEndDate] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit({ latitude, longitude, startDate, endDate });
  };

  return (
    <form onSubmit={handleSubmit} className="max-md:flex max-md:flex-col max-md:gap-4 md:flex md:m-auto md:gap-4 md:justify-evenly md:px-10 md:py-2 bg-transparent shadow-md rounded-lg"> 
      <div className='flex flex-col gap-2'>
        <label className="flex justify-center text-gray-700 text-xl font-semibold">Latitude</label>
        <input
          type="number"
          value={latitude}
          onChange={(e) => setLatitude(e.target.value)}
          className="w-full bg-transparent p-3 border rounded shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
          placeholder="Enter latitude (e.g., 40.7128)"
          required
        />
      </div>
      <div className='flex flex-col gap-2'>
        <label className="flex justify-center w-full text-gray-700 text-xl font-semibold">Longitude</label>
        <input
          type="number"
          value={longitude}
          onChange={(e) => setLongitude(e.target.value)}
          className="w-full bg-transparent p-3 border rounded shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
          placeholder="Enter longitude (e.g., -74.0060)"
          required
        />
      </div>
      <div className='flex flex-col gap-2'>
        <label className="flex justify-center text-gray-700 text-xl font-semibold">Start Date</label>
        <input
          type="date"
          value={startDate}
          onChange={(e) => setStartDate(e.target.value)}
          className="w-full bg-transparent p-3 border rounded shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
          required
        />
      </div>
      <div className='flex flex-col gap-2'>
        <label className="flex justify-center text-gray-700 text-xl font-semibold">End Date</label>
        <input
          type="date"
          value={endDate}
          onChange={(e) => setEndDate(e.target.value)}
          className="w-full bg-transparent p-3 border rounded shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
          required
        />
      </div>
      <div className='max-md:w-full  flex justify-center items-center'>
      <button
        type="submit"
        className="max-md:w-full p-2 h-fit  items-end bg-blue-600 text-white font-semibold rounded shadow-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
        >
        Fetch Weather Data
      </button>
        </div>
    </form>
  );
};

export default WeatherForm;
