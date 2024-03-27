const express = require('express');
const app = express();
const port = 3000; // You can use any port you prefer

// Middleware to parse JSON bodies
app.use(express.json());

// Dummy Database for Weather Details (replace with actual database usage)
let weatherDetails = [];

// Middleware for Authentication
const authMiddleware = (req, res, next) => {
  const { role, password } = req.query;
  if (role === 'admin' && password === 'masai') {
    next(); // Proceed to the next middleware/route handler
  } else {
    res.status(401).json({ error: 'Unauthorized' });
  }
};

// API to Add Weather Details for a City
app.post('/api/weather', (req, res) => {
  const { city, temperature, weather } = req.body;
  const newWeather = {
    id: weatherDetails.length + 1,
    city,
    temperature,
    weather
  };
  weatherDetails.push(newWeather);
  res.status(201).json({ message: 'Weather details added successfully', newWeather });
});

// API to Get All Cities' Weather Details (Admin Only)
app.get('/api/weather', authMiddleware, (req, res) => {
  res.json(weatherDetails);
});

// API to Get Weather Details of a Specific City
app.get('/api/weather/:cityName', (req, res) => {
  const cityName = req.params.cityName;
  const cityWeather = weatherDetails.find(city => city.city === cityName);
  if (cityWeather) {
    res.json(cityWeather);
  } else {
    res.status(404).json({ error: 'City not found' });
  }
});

// API to Update Weather Details of a Specific City (Admin Only)
app.put('/api/weather/:cityId', authMiddleware, (req, res) => {
  const cityId = req.params.cityId;
  const { city, temperature, weather } = req.body;
  const cityIndex = weatherDetails.findIndex(city => city.id == cityId);
  if (cityIndex !== -1) {
    weatherDetails[cityIndex] = { id: cityId, city, temperature, weather };
    res.json({ message: 'Weather details updated successfully', updatedWeather: weatherDetails[cityIndex] });
  } else {
    res.status(404).json({ error: 'City not found' });
  }
});

// API to Delete Weather Details of a Specific City (Admin Only)
app.delete('/api/weather/:cityId', authMiddleware, (req, res) => {
  const cityId = req.params.cityId;
  const cityIndex = weatherDetails.findIndex(city => city.id == cityId);
  if (cityIndex !== -1) {
    const deletedCity = weatherDetails.splice(cityIndex, 1);
    res.json({ message: 'Weather details deleted successfully', deletedCity });
  } else {
    res.status(404).json({ error: 'City not found' });
  }
});

// Start the server
app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});
