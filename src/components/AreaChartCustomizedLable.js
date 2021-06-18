import { color } from "d3";
import React from "react";

const AreaChartCustomizedLabel = ({ x, y, fill, value }) => {
    return (
        <text
            color="white"
            x={x}
            y={y}
            dx={12}
            dy={12}
            fontSize='10'
            fontFamily='sans-serif'
            fill={fill}
            textAnchor="middle">{Math.floor(value)}&deg;C
        </text>
    );
}

export default AreaChartCustomizedLabel;