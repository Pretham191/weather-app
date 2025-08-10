# Weather App

A beautiful, modern weather application built with React that provides current weather conditions and 5-day forecasts for any city worldwide.

## Features

- **Current Weather**: Real-time weather data including temperature, humidity, wind speed, and atmospheric pressure
- **Hourly Forecast**: 8-hour weather outlook with temperatures and conditions
- **5-Day Forecast**: Extended weather predictions for planning ahead
- **Location Search**: Search for weather in any city globally
- **GPS Location**: Get weather for your current location with one click
- **Responsive Design**: Works perfectly on desktop, tablet, and mobile devices
- **Modern UI**: Beautiful glassmorphism design with smooth animations

## Screenshots

The app features a sleek sidebar navigation with two main views:
- **Today**: Current weather conditions and hourly forecast
- **Forecast**: 5-day weather predictions

## Technologies Used

- **React**: Frontend framework with hooks (useState, useEffect)
- **OpenWeatherMap API**: Weather data provider
- **CSS-in-JS**: Styled components for modern styling
- **Browser Geolocation API**: Location-based weather detection

## Prerequisites

Before running this application, make sure you have:
- Node.js (v14 or higher)
- npm or yarn package manager
- An OpenWeatherMap API key

## Installation

1. **Clone the repository**
   ```bash
   git clone https://github.com/yourusername/clima-weather-app.git
   cd clima-weather-app
   ```

2. **Install dependencies**
   ```bash
   npm install
   # or
   yarn install
   ```

3. **Get your API Key**
   - Visit [OpenWeatherMap](https://openweathermap.org/api)
   - Sign up for a free account
   - Generate your API key
   - Note: API keys may take up to 2 hours to activate

4. **Configure API Key**
   - Open `src/App.js` or your main component file
   - Replace the API_KEY constant with your actual API key:
   ```javascript
   const API_KEY = 'your_api_key_here';
   ```

5. **Start the development server**
   ```bash
   npm start
   # or
   yarn start
   ```

6. **Open your browser**
   - Navigate to `http://localhost:3000`
   - The app should load with weather data for Chennai (default city)

## Usage

### Searching for Cities
1. Type any city name in the search box
2. Press Enter or click the Search button
3. Weather data will update for the new location

### Using GPS Location
1. Click the 📍 location button
2. Allow location permissions when prompted
3. Weather data will update for your current location

### Navigation
- **Today**: View current weather and hourly forecast
- **Forecast**: View 5-day weather predictions

## API Reference

This app uses the OpenWeatherMap API 2.5:

### Endpoints Used
- **Current Weather**: `GET /weather?q={city}&appid={API_KEY}&units=metric`
- **5-Day Forecast**: `GET /forecast?q={city}&appid={API_KEY}&units=metric`
- **Coordinates**: `GET /weather?lat={lat}&lon={lon}&appid={API_KEY}&units=metric`

### Rate Limits
- **Free Tier**: 1,000 API calls per day, 60 calls per minute
- **Temperature Unit**: Celsius (metric system)

## Troubleshooting

### Common Issues

**1. API Key Errors**
```
Error: Weather API Error (401): Invalid API key
```
**Solution**: 
- Check your API key is correct
- Ensure the API key is activated (may take 2 hours)
- Verify your OpenWeatherMap account is active

**2. City Not Found**
```
Error: Weather API Error (404): city not found
```
**Solution**: 
- Check city name spelling
- Try using "City, Country" format (e.g., "London, UK")
- Some small cities may not be available

**3. Rate Limit Exceeded**
```
Error: Weather API Error (429): Your account is temporarily blocked
```
**Solution**: 
- Wait before making more requests
- Consider upgrading your OpenWeatherMap plan
- Check if you're making too many requests per minute

**4. Location Permission Denied**
```
Error: Unable to get your location
```
**Solution**: 
- Enable location services in your browser
- Grant location permission when prompted
- Use manual city search as alternative

### Debug Mode

The app includes console logging to help debug API issues:
1. Open browser Developer Tools (F12)
2. Check Console tab for detailed error messages
3. Look for API response status codes and error details

## File Structure

```
clima-weather-app/
├── public/
│   ├── index.html
│   └── favicon.ico
├── src/
│   ├── components/
│   │   └── WeatherApp.js
│   ├── App.js
│   ├── index.js
│   └── index.css
├── package.json
└── README.md
```

## Customization

### Changing Default City
```javascript
const [city, setCity] = useState('YourCityName');
```

### Modifying Colors
Update the gradient backgrounds in the styles object:
```javascript
background: 'linear-gradient(135deg, #your-color-1 0%, #your-color-2 100%)'
```

### Adding New Features
The app is built with a modular structure, making it easy to add:
- Weather maps
- Severe weather alerts  
- Additional forecast days
- Weather charts and graphs
- Multiple location favorites

## Performance

### Optimization Features
- **Automatic Fallback**: Uses mock data if API fails
- **Error Handling**: Graceful error messages for users
- **Responsive Design**: Optimized for all screen sizes
- **Efficient Rendering**: React hooks for optimal performance

## Browser Support

- **Chrome**: 60+
- **Firefox**: 60+
- **Safari**: 12+
- **Edge**: 79+

## Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add some amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## Acknowledgments

- **OpenWeatherMap** for providing free weather API
- **React Team** for the amazing framework
- **Design Inspiration** from modern weather apps and glassmorphism trends

## Contact

**Developer**: Your Name  
**Email**: your.email@example.com  
**GitHub**: [@yourusername](https://github.com/yourusername)  
**Project Link**: [https://github.com/yourusername/clima-weather-app](https://github.com/yourusername/clima-weather-app)

---

## Quick Start Commands

```bash
# Install dependencies
npm install

# Start development server
npm start

# Build for production
npm run build

# Run tests
npm test
```

**Made with ❤️ and React**
