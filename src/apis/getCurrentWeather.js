import axios from "axios";
import { axiosInstance, API_KEY } from "./axios";

const appid = API_KEY || 'a5fdf339b9fe1882d4f2396261a814fc';

export async function searchLocations(query) {
    let response = await axios.get('https://api.openweathermap.org/geo/1.0/direct', {
        params: { q: query, limit: 5, appid }
    });
    return response.data;
}

export async function getCurrentWeather(city) {
    let response = await axiosInstance.get('/weather', {
        params: { q: city, appid, units: 'metric' }
    });
    return response.data;
}

export async function getCurrentWeatherByCoords(lat, lon) {
    let response = await axiosInstance.get('/weather', {
        params: { lat, lon, appid, units: 'metric' }
    });
    return response.data;
}

export async function getWeatherFor5Days(city, lat, lon) {
    let response = await axiosInstance.get('/forecast', {
        params: { lat, lon, exclude: "current,minutely,alerts", appid, units: 'metric' }
    });
    return response.data;
}