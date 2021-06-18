import React from "react";
import { AreaChart, Area } from 'recharts';
import AreaChartCustomizedLable from "./AreaChartCustomizedLable";

const TemperatureChart = ({ hourlyData }) => {
    return (
        <AreaChart
            width={800}
            height={70}
            data={hourlyData}
            margin={{
                top: 5,
                right: 30,
                left: 20,
                bottom: 5,
            }}
        >
            <Area
                label={<AreaChartCustomizedLable />}
                type="monotone"
                dataKey="temp"
                name="Temperature"
                stroke="#f5d621"
                fill="#ffe44a" />
        </AreaChart>
    )
}

export default TemperatureChart;