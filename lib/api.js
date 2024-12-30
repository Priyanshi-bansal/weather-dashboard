import axios from 'axios';

const fetchWeatherData = async ({ latitude, longitude, startDate, endDate }) => {
  const url = 'https://api.open-meteo.com/v1/forecast';
  const params = {
    latitude,
    longitude,
    start_date: startDate,
    end_date: endDate,
    daily: [
      'temperature_2m_max',
      'temperature_2m_min',
      'temperature_2m_mean',
      'apparent_temperature_max',
      'apparent_temperature_min',
      'apparent_temperature_mean',
    ].join(','),
    timezone: 'auto',
  };

  const response = await axios.get(url, { params });
  return response.data.daily;
};

export default fetchWeatherData;
