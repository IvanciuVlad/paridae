import axios from 'axios';

// Axios object for weather api call

export default axios.create ({
    baseURL: 'https://api.openweathermap.org/data/2.5/'
});