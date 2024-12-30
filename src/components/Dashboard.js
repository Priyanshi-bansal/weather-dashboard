'use client';
import React, { useState } from 'react';
import WeatherForm from './WeatherForm';
import fetchWeatherData from '../lib/api';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
} from 'chart.js';
import { Line } from 'react-chartjs-2';
import { useTable, usePagination } from 'react-table';

// Register chart components
ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
);

const Dashboard = () => {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const handleFormSubmit = async (formData) => {
    setLoading(true);
    setError('');
    setData(null); // Reset data before fetching
    try {
      const result = await fetchWeatherData(formData);
      if (!result.time || result.time.length === 0) {
        throw new Error('No data available for the selected inputs.');
      }
      setData(result);
    } catch (err) {
      setError(err.message || 'Failed to fetch data. Please check your inputs.');
    } finally {
      setLoading(false);
    }
  };

 const chartData = {
  labels: data?.time || [], 
  datasets: [
    {
      label: 'Max Temperature (°C)',
      data: data?.temperature_2m_max || [],
      borderColor: 'rgba(255, 69, 58, 1)', 
      backgroundColor: 'rgba(255, 69, 58, 0.2)', 
      fill: false,
      tension: 0.4,
    },
    {
      label: 'Min Temperature (°C)',
      data: data?.temperature_2m_min || [],
      borderColor: 'rgba(52, 199, 89, 1)', 
      backgroundColor: 'rgba(52, 199, 89, 0.2)', 
      fill: false,
      tension: 0.4,
    },
    {
      label: 'Mean Temperature (°C)',
      data: data?.temperature_2m_mean || [],
      borderColor: 'rgba(255, 159, 10, 1)', 
      backgroundColor: 'rgba(255, 159, 10, 0.2)',
      fill: false,
      tension: 0.4,
    },
    {
      label: 'Max Apparent Temperature (°C)',
      data: data?.apparent_temperature_max || [],
      borderColor: 'rgba(175, 82, 222, 1)', 
      backgroundColor: 'rgba(175, 82, 222, 0.2)', 
      fill: false,
      tension: 0.4,
    },
    {
      label: 'Min Apparent Temperature (°C)',
      data: data?.apparent_temperature_min || [],
      borderColor: 'rgba(255, 214, 10, 1)', 
      backgroundColor: 'rgba(255, 214, 10, 0.2)', 
      fill: false,
      tension: 0.4,
    },
    {
      label: 'Mean Apparent Temperature (°C)',
      data: data?.apparent_temperature_mean || [],
      borderColor: 'rgba(90, 200, 250, 1)', 
      backgroundColor: 'rgba(90, 200, 250, 0.2)', 
      fill: false,
      tension: 0.4,
    },
  ],
};


const chartOptions = {
  responsive: true,
  maintainAspectRatio: false,
  plugins: {
    legend: {
      display: true,
      position: 'top',
      labels: {
        color: 'rgba(255, 255, 255, 0.9)', 
      },
    },
    tooltip: {
      enabled: true,
      callbacks: {
        label: (context) => `${context.dataset.label}: ${context.raw}°C`,
      },
    },
  },
  scales: {
    x: {
      title: {
        display: true,
        text: 'Date',
        color: 'rgba(255, 255, 255, 0.9)', 
      },
      ticks: {
        color: 'rgba(255, 255, 255, 0.9)', 
      },
      grid: {
        color: 'rgba(255, 255, 255, 0.2)', 
      },
    },
    y: {
      title: {
        display: true,
        text: 'Temperature (°C)',
        color: 'rgba(255, 255, 255, 0.9)', 
      },
      ticks: {
        color: 'rgba(255, 255, 255, 0.9)', 
      },
      grid: {
        color: 'rgba(255, 255, 255, 0.2)', 
      },
    },
  },
};


  // Table Columns and Data
  const columns = React.useMemo(
    () => [
      { Header: 'Date', accessor: 'time' },
      { Header: 'Max Temp (°C)', accessor: 'temperature_2m_max' },
      { Header: 'Min Temp (°C)', accessor: 'temperature_2m_min' },
      { Header: 'Mean Temp (°C)', accessor: 'temperature_2m_mean' },
      { Header: 'Max Apparent Temp (°C)', accessor: 'apparent_temperature_max' },
      { Header: 'Min Apparent Temp (°C)', accessor: 'apparent_temperature_min' },
      { Header: 'Mean Apparent Temp (°C)', accessor: 'apparent_temperature_mean' },
    ],
    []
  );

  const tableData = React.useMemo(
    () =>
      data?.time?.map((_, i) => ({
        id: i,
        time: data.time[i],
        temperature_2m_max: data.temperature_2m_max[i],
        temperature_2m_min: data.temperature_2m_min[i],
        temperature_2m_mean: data.temperature_2m_mean[i],
        apparent_temperature_max: data.apparent_temperature_max[i],
        apparent_temperature_min: data.apparent_temperature_min[i],
        apparent_temperature_mean: data.apparent_temperature_mean[i],
      })) || [],
    [data]
  );

  const {
    getTableProps,
    getTableBodyProps,
    headerGroups,
    rows,
    prepareRow,
    page,
    canPreviousPage,
    canNextPage,
    pageOptions,
    gotoPage,
    nextPage,
    previousPage,
    setPageSize,
    state: { pageIndex, pageSize },
  } = useTable(
    { columns, data: tableData, initialState: { pageIndex: 0 } },
    usePagination
  );

  return (
    <div className="p-8">
      <WeatherForm onSubmit={handleFormSubmit} />
      {loading && <p>Loading...</p>}
      {error && <p className="text-red-500">{error}</p>}
      {data && (
        <>
          {/* Chart */}
          <div className="chart-container m-6" style={{ width: '100%', height: '100vh' }}>
  <Line data={chartData} options={chartOptions} />
</div>


          {/* Table */}
          <div className="bg-transparent overflow-x-auto">
            <table
              {...getTableProps()}
              className="table-auto border-collapse border border-gray-300 w-full text-sm"
            >
              <thead>
                {headerGroups.map((headerGroup, index) => (
                  <tr
                    {...headerGroup.getHeaderGroupProps()}
                    key={headerGroup.id || index} 
                  >
                    {headerGroup.headers.map((column, colIndex) => (
                      <th
                        {...column.getHeaderProps()}
                        key={column.id || colIndex} 
                        className="border border-gray-300 p-2 bg-gray-200"
                      >
                        {column.render('Header')}
                      </th>
                    ))}
                  </tr>
                ))}
              </thead>
              <tbody {...getTableBodyProps()}>
                {page.map((row) => {
                  prepareRow(row);
                  return (
                    <tr
                      {...row.getRowProps()}
                      key={row.original.id}
                      className="hover:bg-gray-100"
                    >
                      {row.cells.map((cell) => (
                        <td
                          {...cell.getCellProps()}
                          key={cell.column.id || cell.value}
                          className="border border-gray-300 p-2 text-center"
                        >
                          {cell.render('Cell')}
                        </td>
                      ))}
                    </tr>
                  );
                })}
              </tbody>
            </table>
            {/* Pagination */}
            <div className="flex items-center justify-between mt-4">
              <div>
                <button
                  onClick={() => gotoPage(0)}
                  disabled={!canPreviousPage}
                  className="px-3 py-1 border rounded"
                >
                  {'<<'}
                </button>
                <button
                  onClick={() => previousPage()}
                  disabled={!canPreviousPage}
                  className="px-3 py-1 border rounded mx-2"
                >
                  {'<'}
                </button>
                <button
                  onClick={() => nextPage()}
                  disabled={!canNextPage}
                  className="px-3 py-1 border rounded mx-2"
                >
                  {'>'}
                </button>
                <button
                  onClick={() => gotoPage(pageOptions.length - 1)}
                  disabled={!canNextPage}
                  className="px-3 py-1 border rounded"
                >
                  {'>>'}
                </button>
              </div>
              <span>
                Page{' '}
                <strong>
                  {pageIndex + 1} of {pageOptions.length}
                </strong>
              </span>
              <select
                value={pageSize}
                onChange={(e) => setPageSize(Number(e.target.value))}
                className="border px-2 py-1"
              >
                {[10, 20, 50].map((size) => (
                  <option key={size} value={size}>
                    Show {size}
                  </option>
                ))}
              </select>
            </div>
          </div>
        </>
      )}
    </div>
  );
};

export default Dashboard;
