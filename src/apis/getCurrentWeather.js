import { axiosInstance, API_KEY } from "./axios";

export async function getCurrentWeather(city) {
    let response = await axiosInstance.get('/weather', {
        params: {
            q: city,
            appid: API_KEY,
            units: 'metric'
        }
    });
    let data = response.data;
    return data;
}

export async function getWeatherFor5Days(city, lat, lon) {
    let response = await axiosInstance.get('/onecall', {
        params: {
            lat,
            lon,
            exclude: "current,minutely,alerts",
            appid: API_KEY,
            units: 'metric'
        }
    });
    let data = response.data;
    return data;
}