import React from "react";
import "./../animations.css";

const Moon = ({ moonSize }) => {
    moonSize = moonSize || 1;
    const total = -104;
    const size = total * moonSize;
    return (
        <>
            <div class="stars"></div>
            <div class="twinkling"></div>
            <div
                style={{
                    boxShadow: size + "px 15px 0 5px white"
                }}
                className="moon s1"
            ></div>
        </>
    )
}

export default Moon;