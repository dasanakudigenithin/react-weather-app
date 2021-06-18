import { makeStyles } from "@material-ui/core";
import React from "react";
import Card from "../components/Card";
import WeatherIcon from "../components/WeatherIcon";
import { weatherTitle } from "../utils/weatherUtils"
import { getFormatedTime, getFormatedDate } from "./../utils/commonUtils";

const useStyles = makeStyles({
    nestedFlexContainer: {
        display: "flex",
        flexDirection: "row",
        justifyContent: 'center'
    },
    heading: {
        margin: '0',
        padding: '1em'
    },
    spacing: {
        padding: '.3em'
    },
    smallFlexContainer: {
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        padding: '.1em'
    }
})


const DailyWeatherContainer = ({ fiveDaysData, isDay }) => {
    const classes = useStyles();
    return (
        < div className={classes.nestedFlexContainer}>
            {fiveDaysData.daily.map((item, index) => {
                if (index !== 0) {
                    return (
                        <Card
                            backgroundColor={isDay ? "#e5e5e5" : "#454545"}
                            boxShadow={isDay ? ".07em .07em .07em .07em #d1d1d1" : ".07em .07em .07em .07em #787878"}
                            key={item.dt}>
                            <h4 className={classes.heading}>{getFormatedDate(item.dt)}</h4>
                            <div className={classes.spacing}>
                                <WeatherIcon weather={item.weather[0].main} />
                                <br />
                                {weatherTitle(item.weather[0].main)}
                            </div>
                            <div className={classes.spacing}>
                                {item.temp.day}&deg;C
                            </div>
                            <div className={classes.spacing}>
                                Feels {item.feels_like.day}&deg;C
                            </div>
                            <div className={classes.smallFlexContainer}>
                                <WeatherIcon smallIcon={true} weather='Sunrise' />
                                &nbsp;
                                {getFormatedTime(item.sunrise)}
                            </div>
                            <div className={classes.smallFlexContainer}>
                                <WeatherIcon smallIcon={true} weather='Sunset' />
                                &nbsp;
                                {getFormatedTime(item.sunset)}
                            </div>
                        </Card>
                    );
                }
            }
            )}
        </div>
    )

}

export default DailyWeatherContainer;