import axios from "axios";

export const API_KEY = process.env.REACT_APP_OPEN_WEATHER_API_KEY;

export const axiosInstance = axios.create({
    baseURL: "http://api.openweathermap.org/data/2.5"
});