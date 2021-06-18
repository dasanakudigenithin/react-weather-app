import React, { useEffect, useState } from "react";
import "./../animations.css"
import { feature } from "topojson";
import countries from "./../utils/countries-110m.json";
import * as d3 from 'd3';

const Globe = ({ size }) => {
    const [rotation, setRotation] = useState(0);
    const [pathString, setPathString] = useState({});

    const projectWroldGlobe = () => {
        let geoJson = feature(countries, countries.objects.countries);

        let projection = d3.geoOrthographic()
            .fitSize([size, size], geoJson)
            .rotate([rotation])

        let geoGenerator = d3.geoPath()
            .projection(projection)

        let pathString = geoGenerator(geoJson);

        setPathString(pathString);
    }

    useEffect(() => {
        projectWroldGlobe();
    }, []);


    useEffect(() => {
        const intervalId = setInterval(() => {
            setRotation(rotation + .5);
        }, 0)
        projectWroldGlobe();
        return () => {
            clearInterval(intervalId); //This is important
        }
    }, [rotation]);

    return (<svg width={size} height={size} >
        <path className="a" d={pathString} />
    </svg>)

}

export default Globe;