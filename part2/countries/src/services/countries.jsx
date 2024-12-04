import axios from 'axios';
const baseUrl = 'https://studies.cs.helsinki.fi/restcountries/api/'
const weatherApi ='https://api.openweathermap.org/data/2.5/weather'

const getAll = () => {
    const request = axios.get(`${baseUrl}all`);
    return request.then(
        response => response.data
    );
} 

const getCountry = (name) => {
    const request = axios.get(`${baseUrl}name/${name}`);
    return request.then(
        response => response.data
    );
} 

const getWeatherDetails=(country)=>{
    const api_key = import.meta.env.VITE_SOME_KEY;
    const latlng = country.capitalInfo.latlng;
    const lat = latlng[0];
    const lon = latlng[1];
    const request = axios.get(`${weatherApi}?lat=${lat}&lon=${lon}&units=metric&appid=${api_key}`);
    return request.then(
        response => response.data
    );
}


export default { getAll,getCountry,getWeatherDetails}