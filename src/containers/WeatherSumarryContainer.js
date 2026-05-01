import { makeStyles } from "@material-ui/core";
import React from "react";
import { WiHumidity, WiStrongWind, WiHorizon, WiBarometer } from "weather-icons-react";
import WeatherIcon from "../components/WeatherIcon";
import { getFormatedDate, getFormatedTime } from "../utils/commonUtils";
import { weatherTitle } from "../utils/weatherUtils";

const useStyles = makeStyles({
    container: {
        margin: '1.2em 0',
        padding: '1.5em 2em',
        borderRadius: '20px',
        backdropFilter: 'blur(10px)',
        WebkitBackdropFilter: 'blur(10px)',
        maxWidth: '420px',
        width: '90vw',
    },
    location: {
        fontSize: '0.85rem',
        fontWeight: 600,
        opacity: 0.8,
        marginBottom: '0.3em',
        letterSpacing: '0.03em',
    },
    temp: {
        fontSize: '3.2rem',
        fontWeight: 800,
        lineHeight: 1.1,
        margin: '0.1em 0',
    },
    tempRange: {
        fontSize: '0.8rem',
        opacity: 0.7,
        marginBottom: '0.2em',
    },
    description: {
        fontSize: '1rem',
        fontWeight: 500,
        opacity: 0.9,
        marginBottom: '0.8em',
    },
    sunTimes: {
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        gap: '1.2em',
        fontSize: '0.8rem',
        opacity: 0.7,
        marginTop: '0.6em',
    },
    sunItem: {
        display: 'flex',
        alignItems: 'center',
        gap: '4px',
    },
    detailsGrid: {
        display: 'grid',
        gridTemplateColumns: '1fr 1fr',
        gap: '0.6em',
        marginTop: '1em',
        paddingTop: '0.8em',
        borderTop: '1px solid rgba(128,128,128,0.2)',
    },
    detailItem: {
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        padding: '0.4em',
    },
    detailLabel: {
        fontSize: '0.65rem',
        fontWeight: 600,
        opacity: 0.6,
        textTransform: 'uppercase',
        letterSpacing: '0.05em',
    },
    detailValue: {
        fontSize: '0.9rem',
        fontWeight: 700,
        marginTop: '0.15em',
    },
});

const WeatherSumarryContainer = ({ data, isDay, timezoneOffset }) => {
    const classes = useStyles();
    return (
        <div
            className={classes.container}
            style={{
                background: isDay ? 'rgba(255,255,255,0.65)' : 'rgba(20,30,50,0.75)',
                border: `1px solid ${isDay ? 'rgba(255,255,255,0.6)' : 'rgba(255,255,255,0.15)'}`,
                boxShadow: isDay ? '0 4px 20px rgba(0,0,0,0.08)' : '0 4px 20px rgba(0,0,0,0.3)',
                backdropFilter: 'blur(16px)',
                WebkitBackdropFilter: 'blur(16px)',
            }}
        >
            <div className={classes.location}>
                {getFormatedDate(data.dt, timezoneOffset)} — {data.name}, {data.sys.country}
            </div>
            <div className={classes.temp}>
                {Math.round(data.main.temp)}&deg;
            </div>
            <div className={classes.tempRange}>
                H: {Math.round(data.main.temp_max)}&deg; &nbsp; L: {Math.round(data.main.temp_min)}&deg;
            </div>
            <div className={classes.description}>
                {weatherTitle(data.weather[0].main)} · Feels like {Math.round(data.main.feels_like)}&deg;
            </div>
            <div className={classes.sunTimes}>
                <span className={classes.sunItem}>
                    <WeatherIcon smallIcon={true} weather="Sunrise" isDay={isDay} />
                    {getFormatedTime(data.sys.sunrise, timezoneOffset)}
                </span>
                <span className={classes.sunItem}>
                    <WeatherIcon smallIcon={true} weather="Sunset" isDay={isDay} />
                    {getFormatedTime(data.sys.sunset, timezoneOffset)}
                </span>
            </div>
            <div className={classes.detailsGrid}>
                <div className={classes.detailItem}>
                    <WiHumidity size={24} color={isDay ? '#2c3e50' : '#f0f0f0'} />
                    <span className={classes.detailLabel}>Humidity</span>
                    <span className={classes.detailValue}>{data.main.humidity}%</span>
                </div>
                <div className={classes.detailItem}>
                    <WiStrongWind size={24} color={isDay ? '#2c3e50' : '#f0f0f0'} />
                    <span className={classes.detailLabel}>Wind</span>
                    <span className={classes.detailValue}>{data.wind.speed} m/s</span>
                </div>
                <div className={classes.detailItem}>
                    <WiHorizon size={24} color={isDay ? '#2c3e50' : '#f0f0f0'} />
                    <span className={classes.detailLabel}>Visibility</span>
                    <span className={classes.detailValue}>{(data.visibility / 1000).toFixed(1)} km</span>
                </div>
                <div className={classes.detailItem}>
                    <WiBarometer size={24} color={isDay ? '#2c3e50' : '#f0f0f0'} />
                    <span className={classes.detailLabel}>Pressure</span>
                    <span className={classes.detailValue}>{data.main.pressure} hPa</span>
                </div>
            </div>
        </div>
    );
};

export default WeatherSumarryContainer;
