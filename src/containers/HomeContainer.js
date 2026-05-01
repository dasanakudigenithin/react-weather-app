import React, { useEffect, useState } from "react";
import { getCurrentWeatherByCoords, getWeatherFor5Days } from "../apis/getCurrentWeather";
import WeatherAnimation from "../components/WeatherAnimation";
import Loader from "../components/Loader";
import { makeStyles } from "@material-ui/core";
import Header from "../components/Header";
import Footer from "../components/Footer";
import LocationSearch from "../components/LocationSearch";
import WeatherSumarryContainer from "./WeatherSumarryContainer";
import DailyWeatherContainer from "./DailyWeatherContainer";
import HourlyWeatherContainer from "./HourlyWeatherContainer";

const useStyles = makeStyles({
    container: {
        position: 'absolute',
        margin: 0,
        left: 0,
        right: 0,
        textAlign: 'center',
        padding: '0.5em 1em',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        minHeight: '100vh',
        color: '#fff',
    },
    errorMessage: {
        fontWeight: 500,
        fontSize: '1.1rem',
        padding: '1.5em',
        margin: '1em',
        borderRadius: '12px',
        background: 'rgba(255,60,60,0.15)',
        backdropFilter: 'blur(8px)',
    },
    tabContainer: {
        display: 'flex',
        gap: '0',
        marginTop: '1em',
        borderRadius: '12px',
        overflow: 'hidden',
    },
    tab: {
        padding: '0.6em 1.5em',
        fontSize: '0.8rem',
        fontWeight: 600,
        cursor: 'pointer',
        border: 'none',
        outline: 'none',
        transition: 'background 0.2s ease, opacity 0.2s ease',
        letterSpacing: '0.03em',
    },
});

const HomeContainer = () => {
    const classes = useStyles();

    const [isDay, setIsDay] = useState(true);
    const [errMsg, setErrMsg] = useState("");
    const [data, setData] = useState({});
    const [hourlyData, setHourlyData] = useState([]);
    const [fiveDaysData, setFiveDaysData] = useState({});
    const [loading, setLoading] = useState(true);
    const [activeTab, setActiveTab] = useState('hourly');

    useEffect(() => {
        document.body.className = isDay ? 'day-mode' : 'night-mode';
    }, [isDay]);

    useEffect(() => {
        if (navigator.geolocation) {
            navigator.geolocation.getCurrentPosition(
                (position) => {
                    handleLocationSelect({
                        lat: position.coords.latitude,
                        lon: position.coords.longitude,
                    });
                },
                () => { setLoading(false); }
            );
        } else {
            setLoading(false);
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    const handleLocationSelect = async (location) => {
        try {
            setErrMsg("");
            setLoading(true);
            setActiveTab('hourly');
            const { lat, lon } = location;
            let data = await getCurrentWeatherByCoords(lat, lon);
            const now = Math.floor(Date.now() / 1000);
            const cityNow = now + data.timezone + new Date().getTimezoneOffset() * 60;
            const sunrise = data.sys.sunrise + data.timezone + new Date().getTimezoneOffset() * 60;
            const sunset = data.sys.sunset + data.timezone + new Date().getTimezoneOffset() * 60;
            setIsDay(cityNow >= sunrise && cityNow <= sunset);
            setData(data);
            let result = await getWeatherFor5Days(null, lat, lon);
            // Next 24 hours (up to 8 entries at 3-hour intervals)
            let hourly = result.list.slice(0, 8);
            // Unique days excluding today
            const list = [];
            result.list.forEach(y => {
                if (new Date(y.dt * 1000).getDate() !== new Date().getDate()) {
                    if (!list.some(a => new Date(a.dt * 1000).getDate() === new Date(y.dt * 1000).getDate()))
                        list.push(y);
                }
            });
            result.newList = list;
            setHourlyData(hourly);
            setFiveDaysData(result);
            setLoading(false);
        } catch (e) {
            setErrMsg(e.message.includes("404") ? `Location not found.` : "Something went wrong. Please try again.");
            setLoading(false);
        }
    }

    return (
        <>
            {!loading &&
                <WeatherAnimation
                    isDay={isDay}
                    weather={data && data.weather && data.weather[0] && data.weather[0].main}
                    moonSize={fiveDaysData && fiveDaysData.daily
                        && fiveDaysData.daily.length > 0 && fiveDaysData.daily[0].moon_phase}
                />
            }
            <div className={classes.container} style={{ color: isDay ? '#1a1a2e' : '#f0f0f0' }}>
                <Header isDay={isDay} />
                <LocationSearch isDay={isDay} onSelect={handleLocationSelect} />
                {loading ?
                    <Loader />
                    :
                    errMsg ?
                        <>
                            <Loader />
                            <div className={classes.errorMessage} style={{ color: isDay ? '#c0392b' : '#ff6b6b' }}>
                                {errMsg}
                            </div>
                        </>
                        :
                        <>
                            {data && data.weather &&
                                <WeatherSumarryContainer data={data} isDay={isDay} timezoneOffset={data.timezone} />}
                            <div className={classes.tabContainer}>
                                <button
                                    className={classes.tab}
                                    onClick={() => setActiveTab('hourly')}
                                    style={{
                                        background: activeTab === 'hourly'
                                            ? (isDay ? 'rgba(255,255,255,0.65)' : 'rgba(255,255,255,0.15)')
                                            : (isDay ? 'rgba(255,255,255,0.25)' : 'rgba(255,255,255,0.05)'),
                                        color: isDay ? '#1a1a2e' : '#f0f0f0',
                                        opacity: activeTab === 'hourly' ? 1 : 0.6,
                                    }}
                                >
                                    Next Hours
                                </button>
                                <button
                                    className={classes.tab}
                                    onClick={() => setActiveTab('daily')}
                                    style={{
                                        background: activeTab === 'daily'
                                            ? (isDay ? 'rgba(255,255,255,0.65)' : 'rgba(255,255,255,0.15)')
                                            : (isDay ? 'rgba(255,255,255,0.25)' : 'rgba(255,255,255,0.05)'),
                                        color: isDay ? '#1a1a2e' : '#f0f0f0',
                                        opacity: activeTab === 'daily' ? 1 : 0.6,
                                    }}
                                >
                                    5-Day
                                </button>
                            </div>
                            {activeTab === 'hourly' && hourlyData &&
                                <HourlyWeatherContainer hourlyData={hourlyData} isDay={isDay} timezoneOffset={data.timezone} />}
                            {activeTab === 'daily' && fiveDaysData && fiveDaysData.list && fiveDaysData.list.length > 0 &&
                                <DailyWeatherContainer fiveDaysData={fiveDaysData} isDay={isDay} timezoneOffset={data.timezone} />}
                        </>
                }
                <Footer isDay={isDay} />
            </div>
        </>
    );
};

export default HomeContainer;
