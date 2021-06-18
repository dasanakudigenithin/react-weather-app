import React, { useState } from "react";
import dateformat from "dateformat";
import { getCurrentWeather, getWeatherFor5Days } from "../apis/getCurrentWeather";
import WeatherAnimation from "../components/WeatherAnimation";
import TemperatureChart from "../components/TemperatureChart";
import Loader from "../components/Loader";
import { makeStyles } from "@material-ui/core";
import Header from "../components/Header";
import TextInput from "../components/TextInput";
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
        padding: '.2em',
        display: 'flex',
        flexDirection: 'column',
        fontSize: 'calc(100% - 2px)',
        alignItems: 'center',
        height: '99vh',
    },
    errorMessage: {
        fontStyle: 'italic',
        fontWeight: 600,
        fontSize: '1.6em',
        padding: '1em',
        margin: '1em',
    }

});

const HomeContainer = () => {

    let isDay = Number(dateformat(new Date().toISOString(), 'HH')) < 19 ? true : false;
    document.body.style.backgroundColor = isDay ? "#76aeda" : "#000";

    const classes = useStyles();

    const [errMsg, setErrMsg] = useState("");
    const [searchValue, setSearchValue] = useState("");
    const [data, setData] = useState({});
    const [hourlyData, setHourlyData] = useState([]);
    const [fiveDaysData, setFiveDaysData] = useState({});
    const [loading, setLoading] = useState(true);

    const handleSearch = async (event) => {
        try {
            if (event.key === 'Enter') {
                setErrMsg("");
                setLoading(true);
                let data = await getCurrentWeather(searchValue);
                setData(data);
                let fiveDays_Data = await getWeatherFor5Days(searchValue, data.coord.lat, data.coord.lon);
                let hourlyData = fiveDays_Data.hourly.filter(y => {
                    if (new Date(y.dt * 1000).getDate() === new Date().getDate())
                        return y;
                });
                setHourlyData(hourlyData);
                setFiveDaysData(fiveDays_Data);
                setLoading(false);
            }
        } catch (e) {
            if (e.message.includes("404")) {
                setErrMsg(`City ${searchValue} not found.`)
            }
            else {
                setErrMsg("Something went wrong. Please try again.");
            }
            setLoading(false);
        }
    }

    const handleInput = (event) => {
        setSearchValue(event.target.value);
    }

    const Home = (
        <div className={classes.container} style={{ color: isDay ? 'black' : 'white' }}>
            <Header />
            <TextInput
                isDay={isDay}
                searchValue={searchValue}
                handleSearch={handleSearch}
                handleInput={handleInput}
            />
            {loading ?
                <Loader />
                :
                errMsg ?
                    <>
                        <Loader />
                        <div
                            className={classes.errorMessage}
                            style={{ color: isDay ? "#d40000" : "#ff2222" }}
                        >
                            {errMsg}
                        </div>
                    </>
                    :
                    <>
                        {!loading && data && data.weather &&
                            <WeatherSumarryContainer data={data} />}

                        {!loading && hourlyData &&
                            
                            <>
                                <TemperatureChart hourlyData={hourlyData} />
                                <HourlyWeatherContainer hourlyData={hourlyData} isDay={isDay} />
                            </>}

                        {!loading && fiveDaysData && fiveDaysData.daily && fiveDaysData.daily.length > 0 &&
                            <DailyWeatherContainer fiveDaysData={fiveDaysData} isDay={isDay} />}
                    </>
            }
        </div >
    )

    return (
        <>
            {!loading &&
                <WeatherAnimation
                    isDay={isDay}
                    weather={hourlyData && hourlyData.length > 0
                        && hourlyData[0].weather && hourlyData[0].weather[0].main}
                    moonSize={fiveDaysData && fiveDaysData.daily
                        && fiveDaysData.daily.length > 0 && fiveDaysData.daily[0].moon_phase}
                />
            }
            {Home}
        </>

    )
}

export default HomeContainer;