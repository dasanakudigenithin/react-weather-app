import React from "react";
import Rainy from "./Rainy";
import Sunny from "./Sunny";
import Cloudy from "./Cloudy";
import Moon from "./Moon";
import "./../animations.css";

const WeatherAnimation = ({ weather, isDay, moonSize }) => {
    return (
        <div id="animationContainer">
            {weather && weather.toLowerCase().includes("rain") &&
                <Rainy />
            }
            {weather && weather.toLowerCase().includes("cloud") &&
                (isDay ? <Cloudy /> : <><Moon moonSize={0.6} /><Cloudy /></>)
            }
            {weather && (weather.toLowerCase().includes("clear") || weather.toLowerCase().includes("snow")) &&
                (isDay ? <Sunny /> : <Moon moonSize={0.6} />)
            }
        </div>
    )
}

export default WeatherAnimation;