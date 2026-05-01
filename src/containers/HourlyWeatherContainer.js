import { makeStyles } from "@material-ui/core";
import React from "react";
import WeatherIcon from "../components/WeatherIcon";
import { weatherTitle } from "../utils/weatherUtils";
import { getFormatedTimeHour } from "./../utils/commonUtils";
import Card from "../components/Card";

const useStyles = makeStyles({
    container: {
        display: "flex",
        flexDirection: "row",
        justifyContent: 'center',
        flexWrap: 'wrap',
        gap: '0.6em',
        padding: '0.5em 0',
        maxWidth: '90vw',
    },
    time: {
        fontSize: '0.75rem',
        fontWeight: 700,
        opacity: 0.85,
        marginBottom: '0.4em',
    },
    weather: {
        fontSize: '0.7rem',
        opacity: 0.9,
        fontWeight: 500,
        marginTop: '0.4em',
    },
});

const HourlyWeatherContainer = ({ hourlyData, isDay, timezoneOffset }) => {
    const classes = useStyles();
    const items = hourlyData;

    return (
        <div className={classes.container}>
            {items.map((item) => (
                <Card isDay={isDay} height="10em" width="6.5em" key={item.dt}>
                    <div className={classes.time}>{getFormatedTimeHour(item.dt, timezoneOffset)}</div>
                    <WeatherIcon weather={item.weather[0].main} isDay={isDay} />
                    <div className={classes.weather}>{weatherTitle(item.weather[0].main)}</div>
                </Card>
            ))}
        </div>
    );
};

export default HourlyWeatherContainer;
