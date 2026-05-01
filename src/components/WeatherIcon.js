import React from "react";
import { WiDaySunny, WiCloudy, WiRainMix, WiSunrise, WiSunset } from "weather-icons-react";

const iconSize = 60;
const iconSmallSize = 30;

const WeatherIcon = ({ weather, smallIcon, style, isDay }) => {
    const color = isDay === false ? '#f0f0f0' : '#2c3e50';

    switch (weather) {
        case "Clouds": return <WiCloudy style={style} size={smallIcon ? iconSmallSize : iconSize} color={color} />
        case "Rain": return <WiRainMix style={style} size={smallIcon ? iconSmallSize : iconSize} color={color} />
        case "Sunrise": return <WiSunrise style={style} size={smallIcon ? iconSmallSize : iconSize} color={color} />
        case "Sunset": return <WiSunset style={style} size={smallIcon ? iconSmallSize : iconSize} color={color} />
        default:
            return <WiDaySunny style={style} size={smallIcon ? iconSmallSize : iconSize} color={color} />
    }
}

export default WeatherIcon;
