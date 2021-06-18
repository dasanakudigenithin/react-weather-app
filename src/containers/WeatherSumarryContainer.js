import { makeStyles } from "@material-ui/core";
import dateformat from "dateformat";
import React from "react";
import WeatherIcon from "../components/WeatherIcon";
import { getFormatedDate } from "../utils/commonUtils";
import { weatherTitle } from "../utils/weatherUtils"

const useStyles = makeStyles({
    subContainer: {
        alignSelf: 'center',
        margin: '.1em',
        width: "30vw",
        padding: '.1em'
    },
    heading: {
        margin: '0',
        padding: '1em'
    }
})

const WeatherSumarryContainer = ({ data }) => {
    const classes = useStyles();
    return (
        <div className={classes.subContainer}>
            <h4 className={classes.heading}>{getFormatedDate(data.dt)} - {data.name}, {data.sys.country}</h4>
            <div>
                {weatherTitle(data.weather[0].main)}.
                &nbsp;&nbsp;{data.main.temp}&deg;C, Feels {data.main.feels_like}&deg;C.</div>
            <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', padding: '.3em' }}>
                <WeatherIcon smallIcon={true} weather="Sunrise" style={{ alignSelf: 'center' }} />
                &nbsp;
                {dateformat(data.sys.sunrise * 1000, 'hh:MM TT')}
                &nbsp;&nbsp;
                <WeatherIcon smallIcon={true} weather="Sunset" style={{ alignSelf: 'center' }} />
                &nbsp;
                {dateformat(data.sys.sunset * 1000, 'hh:MM TT')}
            </div>
        </div>
    )

}

export default WeatherSumarryContainer;