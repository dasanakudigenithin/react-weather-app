import React from "react";
import { WiDaySunny, WiCloudy, WiRainMix, WiSunrise, WiSunset } from "weather-icons-react";

const iconSize = 60;
const iconSmallSize = 30;
const color = '#FFA500';

const WeatherIcon = ({ weather, smallIcon, style }) => {
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