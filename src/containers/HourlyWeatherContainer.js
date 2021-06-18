import { makeStyles } from "@material-ui/core";
import React from "react";
import WeatherIcon from "../components/WeatherIcon";
import { weatherTitle } from "../utils/weatherUtils"
import { getFormatedTimeHour } from "./../utils/commonUtils";
import Card from "../components/Card";

const useStyles = makeStyles({
    nestedFlexContainer: {
        display: "flex",
        flexDirection: "row",
        justifyContent: 'center'
    },
    heading: {
        margin: '0',
    },
    spacing: {
        padding: '.1em'
    }
})


const HourlyWeatherContainer = ({ hourlyData, isDay }) => {
    const classes = useStyles();
    if(hourlyData.length > 14){
        hourlyData = hourlyData.slice(0, 13);
    }
    return (
        < div className={classes.nestedFlexContainer}>
            {hourlyData.map((item, index) => {
                return (
                    <Card
                        backgroundColor={isDay ? "#e5e5e5" : "#454545"}
                        boxShadow={isDay ? ".07em .07em .07em .07em #d1d1d1" : ".07em .07em .07em .07em #787878"}
                        height="7em"
                        width="4vw"
                        key={item.dt}>
                        <h4 className={classes.heading}>{getFormatedTimeHour(item.dt)}</h4>
                        <div className={classes.spacing}>
                            <WeatherIcon weather={item.weather[0].main} />
                            <br />
                            {weatherTitle(item.weather[0].main)}
                        </div>
                    </Card>
                );
            }
            )}
        </div>
    )

}

export default HourlyWeatherContainer;