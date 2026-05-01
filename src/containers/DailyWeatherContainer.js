import { makeStyles } from "@material-ui/core";
import React from "react";
import Card from "../components/Card";
import WeatherIcon from "../components/WeatherIcon";
import { weatherTitle } from "../utils/weatherUtils";
import { getFormatedDate } from "./../utils/commonUtils";

const useStyles = makeStyles({
    container: {
        display: "flex",
        flexDirection: "row",
        justifyContent: 'center',
        flexWrap: 'wrap',
        gap: '0.6em',
        padding: '0.5em 0 2em',
        maxWidth: '90vw',
    },
    date: {
        fontSize: '0.75rem',
        fontWeight: 700,
        opacity: 0.85,
        marginBottom: '0.5em',
    },
    weather: {
        fontSize: '0.7rem',
        opacity: 0.9,
        fontWeight: 500,
        margin: '0.4em 0',
    },
    temp: {
        fontSize: '1.1rem',
        fontWeight: 800,
        margin: '0.3em 0',
    },
    feels: {
        fontSize: '0.65rem',
        opacity: 0.7,
        fontWeight: 500,
    },
});

const DailyWeatherContainer = ({ fiveDaysData, isDay, timezoneOffset }) => {
    const classes = useStyles();
    return (
        <div className={classes.container}>
            {fiveDaysData.newList.map((item) => {
                return (
                    <Card isDay={isDay} height="10em" width="6.5em" key={item.dt}>
                        <div className={classes.date}>{getFormatedDate(item.dt, timezoneOffset)}</div>
                        <WeatherIcon weather={item.weather[0].main} isDay={isDay} />
                        <div className={classes.weather}>{weatherTitle(item.weather[0].main)}</div>
                        <div className={classes.temp}>{Math.round(item.main.temp)}&deg;</div>
                        <div className={classes.feels}>Feels {Math.round(item.main.feels_like)}&deg;</div>
                    </Card>
                );
            })}
        </div>
    );
};

export default DailyWeatherContainer;
